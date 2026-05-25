# Deployment Checklist — Firebase SaaS Starter Kit

Work through this checklist in order before going live.

---

## Phase 1: Local environment

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Firebase CLI installed (`npm install -g firebase-tools`)
- [ ] Firebase CLI logged in (`firebase login`)
- [ ] `npm install` completed without errors
- [ ] `.env` file created from `.env.example`
- [ ] Firebase config keys added to `.env`
- [ ] Stripe test keys added to `.env`
- [ ] `npm run dev` starts without errors
- [ ] App loads at http://localhost:3000

---

## Phase 2: Firebase project setup

- [ ] Firebase project created at https://console.firebase.google.com
- [ ] Authentication enabled: Email/Password method turned on
- [ ] Authentication enabled: Google sign-in method turned on
- [ ] Authorized domain added (your custom domain, if applicable)
- [ ] Firestore database created (start in test mode)
- [ ] Firestore security rules updated (copy from `firestore.rules` in the kit)
- [ ] Firebase project connected: `firebase use --add`
- [ ] Firebase Hosting configured in `firebase.json`

---

## Phase 3: Stripe setup

- [ ] Stripe account created at https://stripe.com
- [ ] Product created in Stripe dashboard (your subscription product)
- [ ] Price created (monthly and/or yearly)
- [ ] Price ID copied to `.env` (`STRIPE_PRICE_ID`)
- [ ] Webhook endpoint created in Stripe (for local testing: use Stripe CLI)
- [ ] Webhook secret copied to `.env` (`STRIPE_WEBHOOK_SECRET`)
- [ ] Stripe test card `4242 4242 4242 4242` works in checkout flow

---

## Phase 4: Local testing

- [ ] Sign-up flow works (email/password)
- [ ] Google sign-in works
- [ ] Email verification sent after sign-up
- [ ] Password reset flow works
- [ ] Dashboard loads after sign-in
- [ ] Unauthenticated users redirected to login page
- [ ] Subscription checkout opens correctly
- [ ] Test payment completes and subscription status updates in Firestore
- [ ] Subscription cancellation webhook handled correctly

---

## Phase 5: Production configuration

- [ ] Switch `.env` from Stripe test keys to Stripe live keys
- [ ] Update Firestore security rules from test mode to production rules
- [ ] Verify all `console.log` debug statements are removed (or won't expose sensitive data)
- [ ] Verify `.env` is in `.gitignore` (never commit secrets)
- [ ] Error handling tested: invalid login, payment failure, network error

---

## Phase 6: Deploy

```bash
npm run build
firebase deploy
```

- [ ] `npm run build` completes without errors
- [ ] `firebase deploy` completes without errors
- [ ] App loads at `your-project.web.app`
- [ ] Sign-up and sign-in work in production
- [ ] Checkout flow works in production

---

## Phase 7: Custom domain (optional)

- [ ] Domain purchased (Namecheap, Google Domains, Cloudflare, etc.)
- [ ] DNS records configured as instructed in Firebase Hosting console
- [ ] SSL certificate provisioned (Firebase does this automatically — wait up to 24h)
- [ ] App loads at your custom domain

---

## Phase 8: Pre-launch final check

- [ ] Product page on Gumroad updated with live app URL
- [ ] All test accounts and test data cleared from Firestore
- [ ] Stripe webhook switched to live endpoint
- [ ] Error reporting configured (optional: Firebase Crashlytics or Sentry)
- [ ] You have tested the complete buyer journey: sign up → pay → access dashboard

---

**You are live. Go ship your product.**
