# Launch Checklist — Lead.AI Indie AI SaaS Starter Kit

Complete this 25-step verification checklist before introducing your AI SaaS product to public users or uploading listings live on Gumroad.

---

## 🔑 Phase 1: Local Development & Configuration

- [ ] **1. Dependencies Installed**: Node.js and packages are loaded without error logs (`npm install`).
- [ ] **2. Environment Parameters Setup**: `.env` is initialized from `.env.example` and contains correct Firebase credentials.
- [ ] **3. Git Ignored Variables**: Verification that `.env` is listed inside `.gitignore` to avoid key leakage.
- [ ] **4. Local Dev Server Test**: The app launches and functions locally at `http://localhost:3000` via:
  ```bash
  npm run dev
  ```
- [ ] **5. Local Code Lint**: Static JS and CSS rules contain no parsing syntax errors.

---

## 🛡️ Phase 2: Firebase Security & Authentication

- [ ] **6. Authentication Setup**: Email/Password and Google OAuth methods are whitelisted in the Firebase Console.
- [ ] **7. Domain Whitelist**: Localhost (`127.0.0.1` and `localhost`) and your production domains are whitelisted for Google OAuth redirect keys.
- [ ] **8. Security Rules Deployed**: Custom Firestore security rules limiting dynamic resource queries to authenticated document owners are live.
- [ ] **9. Public Database Locked**: Test database read/write permissions are restricted (test mode expired).
- [ ] **10. Account Sign-Up Flow**: Verified that new account creation adds correct user records to Firestore user collections.

---

## 💳 Phase 3: Stripe Billing & Checkouts

- [ ] **11. Subscription Products Set**: Monthly and Annual subscription prices are initialized in the Stripe Developer Dashboard.
- [ ] **12. Stripe Local Webhook**: Local webhook processing server is running using the Stripe CLI:
  ```bash
  stripe listen --forward-to localhost:3000/api/webhook
  ```
- [ ] **13. Webhook Secrets Set**: Your webhook signing secret (`whsec_...`) is configured inside `.env`.
- [ ] **14. Test Checkout Flow**: The Stripe subscription portal launches and registers test card payments successfully.
- [ ] **15. Status Synchronization**: Test transactions trigger status field updates (e.g., `role: "pro"`) inside your Firestore user records.

---

## 🌎 Phase 4: Production Deployment

- [ ] **16. Production Build**: Compilation succeeds without warnings:
  ```bash
  npm run build
  ```
- [ ] **17. Firebase Hosting Live**: Assets are pushed to Hosting nodes:
  ```bash
  firebase deploy
  ```
- [ ] **18. Custom Domain Routing**: Custom DNS records are added at your domain registrar.
- [ ] **19. SSL Provision Complete**: HTTPS links load securely on your custom domain.
- [ ] **20. Live Environment Keys**: Stripe configuration variables inside Firebase Console settings are switched from `pk_test_...` to live keys (`pk_live_...`).

---

## 📝 Phase 5: Copy & Marketing Verification

- [ ] **21. Landing Page Copy Set**: Landing page text matches your unique AI value proposition framework.
- [ ] **22. Legal Policies Live**: Copy/paste Terms of Service and Privacy Policy pages are live and linkable.
- [ ] **23. Onboarding Emails Setup**: Welcome emails and transaction invoices are configured inside your email provider (e.g. Resend, Mailgun).
- [ ] **24. Gumroad Copy Ready**: Post-purchase receipt scripts and listing descriptions are loaded on your Gumroad editor.
- [ ] **25. Social Launch Posts**: Announcement tweets and LinkedIn updates are scheduled and contain active live URLs.

---

*Lead.AI | Arun Kumar Gharami | Go ship your product.*
