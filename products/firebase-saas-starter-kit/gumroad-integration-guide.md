# Gumroad Payment Integration Guide

This guide describes how to integrate Gumroad as an alternative or primary payment processing mechanism for your AI SaaS or downloadable software kits. It covers setting up the Gumroad Overlay (Modal Checkout), handling redirect queries, and validating license keys via Gumroad's license verification API.

---

## 1. Integrating the Gumroad Overlay (Modal checkout)

To keep users on your website during the checkout experience rather than redirecting them to an external window, you can embed the native Gumroad Overlay script.

### Step 1.1: Include the Gumroad JS Library
Add the official script inside your frontend HTML entry point or layout file (e.g., inside the `<head>` tag of your `index.html` or Next.js layout layout):

```html
<script src="https://gumroad.com/js/gumroad.js"></script>
```

### Step 1.2: Configure HTML Checkout Buttons
Create a link element that targets your specific Gumroad product page URL. To enable the modal overlay, ensure you append `class="gumroad-button"` or use JavaScript custom trigger configurations.

```html
<!-- Simple Button Trigger -->
<a 
  class="gumroad-button" 
  href="https://gumroad.com/l/your_product_permalink" 
  data-gumroad-single-product="true"
  target="_blank"
>
  Purchase Developer License
</a>
```

### Step 1.3: Enable the Overlay Manually via React/JavaScript
If you are using single-page frameworks, you can invoke the Gumroad initialization dynamically after your components mount:

```javascript
import { useEffect } from "react";

export function PurchaseButton() {
  useEffect(() => {
    // Check if the script loaded successfully and initialize the overlay hooks
    if (window.GumroadOverlay) {
      window.GumroadOverlay.init();
    }
  }, []);

  return (
    <a 
      className="gumroad-button bg-blue-600 text-white px-6 py-3 rounded-md" 
      href="https://gumroad.com/l/your_product_permalink?wanted=true" 
      data-gumroad-single-product="true"
      target="_blank"
      rel="noopener noreferrer"
    >
      Buy Now
    </a>
  );
}
```

---

## 2. Redirect Parameters and License Keys

When a user completes a purchase on Gumroad, you can configure a "Redirect URL" inside your Gumroad product dashboard. This forwards the user back to your SaaS dashboard with transaction details appended to the URL query string.

### Step 2.1: Configure Gumroad Redirect Settings
1. Log in to your Gumroad Dashboard.
2. Select your product and navigate to the **Checkout** settings.
3. In the **Redirect URL** field, enter your dashboard signup page (e.g., `https://your-saas-app.com/signup`).
4. Enable the option: **"Redirect the buyer to a 3rd party website after a purchase"**.

### Step 2.2: Extracting License Keys from URL Queries
When redirecting, Gumroad appends transaction parameters to your URL. For example:
`https://your-saas-app.com/signup?email=user%40example.com&license_key=XXXX-XXXX-XXXX-XXXX`

Implement a custom query hook in your dashboard to extract and store these credentials:

```javascript
import { useEffect, useState } from "react";

export function useGumroadRedirectQuery() {
  const [purchaseData, setPurchaseData] = useState({ email: null, licenseKey: null });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");
    const licenseKey = searchParams.get("license_key");

    if (email || licenseKey) {
      setPurchaseData({ email, licenseKey });
      
      // Clear URL parameters to protect user transaction credentials from exposure
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return purchaseData;
}
```

---

## 3. Validating License Keys via Gumroad API

To verify that a license key is valid, active, and has not been refunded or shared across too many accounts, implement a secure server-side validation check.

> [!WARNING]
> Never make license verification API requests directly from your browser-side client code. Doing so exposes your Gumroad product ID and allows users to intercept and spoof successful validation states. Run validation requests exclusively on serverless backends or secure proxy routes.

### Serverless Endpoint Implementation (e.g., `api/verify-license.js`):

```javascript
const axios = require("axios");

/**
 * Validates a Gumroad license key against the Gumroad Verification API.
 */
async function verifyLicenseHandler(req, res) {
  const { licenseKey } = req.body;
  const productId = process.env.GUMROAD_PRODUCT_ID; // Your Gumroad product ID

  if (!licenseKey) {
    return res.status(400).json({ error: "Missing required licenseKey parameter." });
  }

  try {
    const response = await axios.post("https://api.gumroad.com/v2/licenses/verify", {
      product_id: productId,
      license_key: licenseKey,
      increment_uses_count: "true" // Tracks active device or profile activations
    });

    const { success, uses, purchase } = response.data;

    // Check if the purchase is active and has not been refunded
    if (success && !purchase.refunded && !purchase.chargebacked) {
      return res.status(200).json({
        valid: true,
        email: purchase.email,
        licenseKey: licenseKey,
        purchaseId: purchase.id,
        activationsCount: uses
      });
    } else {
      return res.status(401).json({
        valid: false,
        error: "License key is inactive, refunded, or invalid."
      });
    }
  } catch (error) {
    console.error("Gumroad License Verification Server Error:", error.response?.data || error.message);
    return res.status(500).json({
      valid: false,
      error: "Failed to communicate with license verification server."
    });
  }
}

module.exports = { verifyLicenseHandler };
```

---

## 4. Syncing Gumroad Sales via Webhooks (Ping API)

Gumroad provides a system called **Gumroad Ping** to alert external servers of sales events.
- **Webhook Target:** Set your webhook endpoint URL (e.g., `https://your-saas-app.com/api/webhooks/gumroad`) inside the Gumroad Settings -> Advanced panel.
- **Processing Payload:** Gumroad sends an `application/x-www-form-urlencoded` POST request containing transaction details. Parse this secure payload to write purchase records directly to your Cloud Firestore database.
- **Security Check:** Validate the incoming payload signing parameter against your stored product signature token to prevent malicious API spoofing.
