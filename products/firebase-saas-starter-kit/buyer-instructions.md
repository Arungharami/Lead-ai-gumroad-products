# Buyer Instructions — Firebase SaaS Starter Kit

---

## Prerequisites

Before starting, make sure you have:

- **Node.js 18+** — Check: `node --version` / Install: https://nodejs.org
- **npm** — Comes with Node.js. Check: `npm --version`
- **Firebase CLI** — Install: `npm install -g firebase-tools`
- **A Firebase project** — Create free at https://console.firebase.google.com (takes 2 minutes)
- **A Stripe account** — Create free at https://dashboard.stripe.com/register
- Basic JavaScript and HTML knowledge

---

## Step 1: Download and install

Download the ZIP from your Gumroad receipt. Unzip it.

```bash
cd firebase-saas-starter-kit
npm install
```

---

## Step 2: Create your Firebase project (if you haven't)

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Name it (e.g., "my-saas-app")
4. Disable Google Analytics (not needed for this kit)
5. Click "Create project"

In your new project:
- Enable **Authentication** → Email/Password + Google
- Enable **Firestore Database** → Start in test mode (we'll add security rules later)
- Enable **Hosting** (optional for now)

---

## Step 3: Connect Firebase to the kit

```bash
firebase login
firebase use --add
# Select your project from the list
# Give it an alias like "default"
```

---

## Step 4: Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Open `.env` and fill in:

```
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id

STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Find your Firebase config in: Firebase Console → Project Settings → Your apps → SDK setup.  
Find your Stripe keys in: Stripe Dashboard → Developers → API keys.

---

## Step 5: Run locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser. You should see the login page.

Test the auth flow:
1. Click "Sign Up" and create a test account
2. Verify the dashboard loads after login
3. Check that protected routes redirect to login when not authenticated

---

## Step 6: Set up Stripe (for payments)

1. In your Stripe Dashboard, create a product and a price (monthly subscription)
2. Copy the Price ID (starts with `price_`)
3. Add it to your `.env` as `STRIPE_PRICE_ID=price_...`
4. To test webhooks locally: `stripe listen --forward-to localhost:3000/webhook`

---

## Step 7: Deploy

Follow the deployment checklist in `deployment-checklist.md`. The short version:

```bash
npm run build
firebase deploy
```

Your app will be live at `your-project.web.app`.

---

## Getting help

Email: **a.gharami.325@westcliff.edu**  
Subject: "Firebase Kit question — [brief description]"

Include: your Node.js version, Firebase CLI version, the exact error message.

Response within 48 hours on business days.

---

## Getting updates

Gumroad will notify you by email when a new version is uploaded. All updates are free.

---

## What's next?

After launching your SaaS:
- **Add your AI model:** Connect your fraud detector, recommendation engine, or automation workflow to the dashboard placeholders
- **Get the bundle:** Lead.AI Business Automation & XAI Builder Bundle — $79
