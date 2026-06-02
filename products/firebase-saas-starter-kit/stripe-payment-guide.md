# Stripe Payment and Subscription Integration Guide

This guide details the integration of Stripe's billing system into your Firebase SaaS application. It covers product configuration in the Stripe Dashboard, local webhook setup using the Stripe CLI, implementing a checkout session function, and securely syncing subscription updates to your Cloud Firestore database.

---

## 1. Important Security Warning: Key Management

> [!CAUTION]
> Exposing your private live secret key (`sk_live_...`) to your frontend application or committing it to a version control system will allow unauthorized access to your Stripe account, resulting in catastrophic financial loss.

### Rules for Secure Stripe Key Management:
- **Publishable Key (`pk_test_...` / `pk_live_...`):** Browser-facing key. Safe to expose in frontend initialization scripts. This key only authorizes Stripe to collect payment card details and tokenize billing inputs.
- **Secret Key (`sk_test_...` / `sk_live_...`):** Server-side ONLY. Must be stored exclusively in server environment variables (e.g., `.env.local` on server-side runtimes or Firebase Cloud Functions Config). Never expose it in code folders accessed by client browsers.
- **Webhook Signing Secret (`whsec_...`):** Used to verify that events received at your webhook endpoint actually originated from Stripe. Treat this with the same level of confidentiality as your Secret Key.

---

## 2. Product and Price Setup in Stripe

Before writing code, create your pricing plans inside the Stripe Dashboard:
1. Navigate to the [Stripe Dashboard](https://dashboard.stripe.com/).
2. Toggle the **Test Mode** switch at the top right if you are developing locally.
3. Click on **Product catalog** -> **Products** -> **Add product**.
4. Configure your plans based on the subscription tier values:
   - **Starter Plan:** Set Name to `Starter`, select **Recurring**, set price to `$49.00 USD`, and set Billing period to **Monthly**.
   - **Scale Plan:** Set Name to `Scale`, select **Recurring**, set price to `$79.00 USD`, and set Billing period to **Monthly**.
   - **Pro Annual:** Set Name to `Pro Annual`, select **Recurring**, set price to `$149.00 USD`, set Billing period to **Yearly**.
5. Save each product.
6. Note the unique **Price ID** (e.g., `price_1P23456789...`) generated for each pricing tier. You will use these IDs in your checkout creation scripts.

---

## 3. Stripe Checkout Node.js Implementation

Implement the server-side Checkout Session creation function. This script generates a secure checkout URL and redirects the user to Stripe's hosted billing interface.

Create a serverless endpoint file (e.g., `api/checkout.js`):

```javascript
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * Creates a Stripe Checkout Session for a subscription plan.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 */
async function createCheckoutSession(req, res) {
  const { priceId, userId, userEmail } = req.body;

  if (!priceId || !userId || !userEmail) {
    return res.status(400).json({ error: "Missing required parameters: priceId, userId, or userEmail." });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: userEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/pricing`,
      metadata: {
        userId: userId, // CRITICAL: Link the payment to the unique Firebase User ID
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Session Creation Error:", error.message);
    return res.status(500).json({ error: "Failed to initialize secure checkout session." });
  }
}

module.exports = { createCheckoutSession };
```

---

## 4. Stripe Webhook Handler for Firestore Sync

To keep user subscription statuses in sync with Stripe billing events, implement a serverless webhook receiver. 

Create a webhook endpoint (e.g., `api/webhooks/stripe.js`):

```javascript
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const admin = require("firebase-admin");

// Initialize Firebase Admin if not initialized elsewhere
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
}

const db = admin.firestore();

/**
 * Process Stripe Webhook events and sync state to Firestore.
 */
async function stripeWebhookHandler(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verify the signature to prevent malicious spoofing attempts
    event = stripe.webhooks.constructEvent(
      req.rawBody, 
      sig, 
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle specific Stripe billing events
  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const stripeCustomerId = subscription.customer;
      const stripeSubscriptionId = subscription.id;
      const status = subscription.status;
      
      // Retrieve the custom metadata parameter mapped during checkout
      const userId = subscription.metadata.userId;

      if (userId) {
        await db.collection("users").doc(userId).set({
          stripeCustomerId: stripeCustomerId,
          stripeSubscriptionId: stripeSubscriptionId,
          subscriptionStatus: status,
          // Grant token balance allocations based on active billing status
          tokenBalance: status === "active" ? 500000 : 0
        }, { merge: true });
        
        console.log(`Successfully synced subscription status: ${status} for user: ${userId}`);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const userId = subscription.metadata.userId;

      if (userId) {
        await db.collection("users").doc(userId).set({
          subscriptionStatus: "cancelled",
          tokenBalance: 0 // Revoke premium balance upon cancellation
        }, { merge: true });
        
        console.log(`Deactivated subscription access for user: ${userId}`);
      }
      break;
    }

    default:
      console.log(`Unhandled webhook event type: ${event.type}`);
  }

  return res.status(200).json({ received: true });
}

module.exports = { stripeWebhookHandler };
```

---

## 5. Local Webhook Testing via Stripe CLI

To test the integration locally without deploying your backend function to live cloud servers, use the Stripe CLI.

### Step 5.1: Authenticate Stripe CLI
Open your terminal and log in to your Stripe developer profile:
```bash
stripe login
```

### Step 5.2: Forward Webhook Events
Forward Stripe webhook events directly to your local development server API endpoint:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
This command establishes a local proxy tunnel and outputs a temporary **Webhook Signing Secret** (starts with `whsec_`).

### Step 5.3: Set Environment Variables
Copy the generated webhook secret and set it as an environment variable in your local `.env` configuration file:
```bash
STRIPE_WEBHOOK_SIGNING_SECRET=whsec_your_local_listen_secret
```

### Step 5.4: Trigger Test Events
In a separate terminal window, simulate subscription transactions to verify database synchronization:
```bash
stripe trigger customer.subscription.created
```
Confirm inside your Firestore viewer that the user document updates with the generated Stripe customer credentials.
