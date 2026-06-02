# Deployment Guide: Shipping Live via Firebase Hosting

This deployment guide provides complete developer instructions for compiling your application, deploying it to production using Firebase Hosting, linking custom domains, updating DNS records, and verifying automated SSL provisioning.

---

## 1. Application Compilation and Build Phase

Prior to uploading your files to production servers, you must build and optimize your client-side assets. The build command compiles all JavaScript, bundles CSS modules, and prepares index assets.

### Step 1.1: Configure Environment Variables
Make sure your production environment variables are properly set. Create a `.env.production` file at the root of your project:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyYourProductionFirebaseKey
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-saas-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-saas-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-saas-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
```

### Step 1.2: Execute local Compile and Build Scripts
Run your compiler tool depending on your package setup:

- **If using Next.js (Static Export):**
  Configure `next.config.js` to enable static export:
  ```javascript
  const nextConfig = {
    output: 'export',
  };
  module.exports = nextConfig;
  ```
  Run build command:
  ```bash
  npm run build
  ```
  This script outputs optimized static files to the `out` directory.

- **If using Create React App / Standard Webpack:**
  ```bash
  npm run build
  ```
  This outputs compilation results to the `build` folder.

- **If using Vite:**
  ```bash
  npm run build
  ```
  This compiles assets into the `dist` folder.

---

## 2. Deploying to Firebase Hosting via CLI

Once your assets are compiled, deploy them to Firebase servers.

### Step 2.1: Verify Firebase Configuration
Ensure your `firebase.json` target public folder matches your build output path:
```json
"hosting": {
  "public": "out", // Must match "out", "build", or "dist" based on compilation output
  "ignore": [
    "firebase.json",
    "**/.*",
    "node_modules/**"
  ]
}
```

### Step 2.2: Launch Deployment Command
Deploy all hosting resources using the Firebase CLI:
```bash
firebase deploy --only hosting
```

If you are updating database rules along with your frontend deployment, you can deploy the complete project stack simultaneously:
```bash
firebase deploy
```

Once completed, the CLI output will display your default hosting URLs:
- `Project Console: https://console.firebase.google.com/project/your-saas-app/overview`
- `Hosting URL: https://your-saas-app.web.app`

---

## 3. Custom Domain Configuration

To establish brand authority, link your personal domain name (e.g., `yourdomain.com`) to your Firebase hosting site.

### Step 3.1: Add Domain in Firebase Console
1. Navigate to the **Firebase Console** -> **Hosting** dashboard.
2. Under the **Domains** card, click on **Add custom domain**.
3. Enter your domain name (e.g., `yourdomain.com` or `app.yourdomain.com`).
4. Keep the option **"Redirect yourdomain.com to www.yourdomain.com"** checked or unchecked depending on your canonical setup preferences.
5. Click **Continue**.

### Step 3.2: Verify Domain Ownership
Firebase requires verification of domain ownership before provisioning SSL configurations. 
1. Copy the generated **TXT record** (containing host details and a validation value string beginning with `google-site-verification`).
2. Log in to your domain registrar dashboard (such as Cloudflare, Namecheap, GoDaddy, or Google Domains).
3. Access the **DNS Settings** or **DNS Zone File** panel for your domain.
4. Add a new record with the following parameters:
   - **Type:** `TXT`
   - **Host/Name:** `@` (or leave blank if linking root domain)
   - **Value:** [Paste the Google site verification TXT record value here]
   - **TTL:** `3600` or `Automatic`
5. Save the record.
6. Return to the Firebase Console and click **Verify**. Note that DNS propagation can take from 1 to 24 hours depending on your registrar TTL settings.

---

## 4. DNS Configurations and SSL Provisioning

Once ownership is verified, Firebase will provide final **A records** to route your domain traffic to Google Cloud CDN servers.

### Step 4.1: Update DNS A Records
1. Retrieve the two **IP Addresses** displayed in your Firebase Hosting panel.
2. In your domain registrar's DNS Settings, delete any existing A records targeting `@` or your specific host.
3. Add two new A records:
   - **Record 1:**
     - **Type:** `A`
     - **Host:** `@` (or subdomain like `app`)
     - **Points to / Value:** [First IP Address, e.g., `151.101.1.195`]
   - **Record 2:**
     - **Type:** `A`
     - **Host:** `@` (or subdomain like `app`)
     - **Points to / Value:** [Second IP Address, e.g., `151.101.65.195`]
4. Save both records.

### Step 4.2: Automated SSL Provisioning
Firebase Hosting automatically provisions a secure SSL Certificate (Let's Encrypt) for your custom domain once the DNS changes propagate:
- This process is fully managed and incurs no licensing fees.
- The certificate renews automatically.
- During initial propagation, navigating to your custom domain may display a "Privacy Warning" or certificate error. This is normal and will resolve automatically once the certificate is generated (typically within 1 to 4 hours of DNS updating).
