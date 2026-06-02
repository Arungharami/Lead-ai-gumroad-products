# Buyer Instructions — Lead.AI Indie AI SaaS Starter Kit

Thank you for purchasing the **Lead.AI Indie AI SaaS Starter Kit**. This document outlines your immediate technical steps to unpack the files, configure your local environment, test all auth/billing integrations, and deploy your new SaaS application live.

---

## 🛠️ Step 1: Unpack and Verify Workspace

1. **Extract ZIP**: Unzip the downloaded product bundle into your local development workspace directory.
2. **Review Folder Structure**: Ensure the following core folders exist:
   - `templates/` (landing page, pricing table, dashboards, and AI wrapper code templates).
   - `guides/` (individual setup manuals for Auth, Firebase, Stripe, Gumroad, and API security).
3. **Verify Files**: Ensure [START-HERE.md](file:///Users/arun/Desktop/Lead-ai-gumroad-products/products/firebase-saas-starter-kit/START-HERE.md) and [README.md](file:///Users/arun/Desktop/Lead-ai-gumroad-products/products/firebase-saas-starter-kit/README.md) exist in your root.

---

## 📦 Step 2: Install Node Packages

Open your terminal, navigate to the extracted codebase folder, and run:
```bash
npm install
```
This loads the required dev dependencies and server tools. Ensure no error signals or severe dependency flags are output.

---

## 🔑 Step 3: Setup Local Environment Config

1. Create your local browser variables file by copying the template:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` inside your editor and populate the Firebase and Stripe parameters:
   - **Firebase Credentials**: Navigate to [Firebase Console](https://console.firebase.google.com) -> Project Settings -> general Web App. Copy the `firebaseConfig` object values.
   - **Stripe Public Keys**: Locate test parameters under Stripe Developer Dashboard -> API Keys.
   - **Stripe Price ID**: Initialize a recurring subscription product inside your Stripe catalog, configure a price, and copy the `price_...` ID.

---

## 🚀 Step 4: Run the Development Server

Start your local application instance:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** inside your browser. The responsive landing page boilerplate and auth portal should load seamlessly.

---

## 🛡️ Step 5: Secure and Deploy Live

When you are ready to publish your application live:
1. **Firestore Rules**: Copy the rules from `firestore.rules` (inside the Firebase guide folder) and deploy them to protect your user collections from public read/write exposure.
2. **Build Compilation**: Run the compile script:
   ```bash
   npm run build
   ```
3. **Firebase Hosting Deploy**: Trigger the live push command:
   ```bash
   firebase deploy
   ```
   Your application will be live at `your-project-id.web.app`.
4. **Link Custom Domain**: Follow the Firebase Hosting dashboard prompts to add your custom domain and let the SSL certificate provision automatically.

---

## 🔒 Strict Security Warning

> [!WARNING]
> Never commit your live secret keys (`sk_live_...` or model API keys) inside your client-side front-end code. If you make API calls to OpenAI, Claude, or Gemini directly from client-side JavaScript, buyers can steal your keys and consume your billing balance. Always route model completions securely through your serverless backend proxy configurations as detailed in [ai-tool-template-guide.md](file:///Users/arun/Desktop/Lead-ai-gumroad-products/products/firebase-saas-starter-kit/ai-tool-template-guide.md).
