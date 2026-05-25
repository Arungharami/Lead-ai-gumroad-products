# Customer Onboarding — Firebase SaaS Starter Kit

---

## Welcome

You now have everything you need to launch a Firebase SaaS product — authentication, a dashboard, Stripe payments, and a deployment guide.

The average developer spends 2–3 weeks building this infrastructure from scratch. You are going to do it in an afternoon. Let's get you there.

---

## Your first 10 minutes

**Goal: Get the app running locally.**

1. Unzip the downloaded file
2. Open your terminal, navigate to the folder
3. Run `npm install`
4. Copy `.env.example` to `.env`
5. Add your Firebase API keys to `.env` (find them in Firebase Console → Project Settings)
6. Run `npm run dev`
7. Open http://localhost:3000

**Your 10-minute milestone:** You see the login page in your browser.

If you see an error instead, copy the error message and email a.gharami.325@westcliff.edu.

---

## Your first 1 hour

**Goal: Test all auth flows and connect Stripe.**

1. Create a test account via the sign-up page
2. Verify the dashboard loads after sign-in
3. Test Google OAuth sign-in
4. Test the password reset flow
5. Add your Stripe test keys to `.env`
6. Create a test product and price in your Stripe dashboard
7. Add the price ID to `.env`
8. Test the checkout flow with Stripe test card `4242 4242 4242 4242`

**Your 1-hour milestone:** A user can sign up, see the dashboard, and click through the checkout flow with a Stripe test payment.

---

## Your first day

**Goal: Deploy to Firebase Hosting and show it to someone.**

1. Open `deployment-checklist.md` and work through it
2. Update Firestore security rules (copy from the included template)
3. Run `npm run build`
4. Run `firebase deploy`
5. Share the `.web.app` URL with one person

**Your day-one milestone:** Your SaaS app is live on the internet at `your-project.web.app`.

That is a real deployed product. Now you customize it and add your own features.

---

## How to ask for help

Email: **a.gharami.325@westcliff.edu**  
Subject: "Firebase Kit question — [topic]"

Include:
- Your Node.js version (`node --version`)
- Firebase CLI version (`firebase --version`)
- The exact error message (copy and paste)
- Which step you are on

Response within 48 hours on business days.

---

## How to get product updates

When a new version is released, Gumroad will notify you by email. All updates (including the planned React version) are free for existing buyers.

Watch the GitHub repository for release announcements:
https://github.com/Arungharami/Lead-ai-gumroad-products

---

## What to do after getting the kit running

**Step 1:** Replace the placeholder sections in the dashboard with your actual product features.

**Step 2:** Customize the branding (colors, logo, product name) in the CSS and HTML.

**Step 3:** Add your AI model or tool. The kit provides the infrastructure — you add the value.

**Natural next steps:**

**Add AI to your SaaS:**  
The Fraud Detection XAI Project Kit gives you a complete ML model to add to your dashboard.  
→ [Fraud Detection XAI Project Kit ($99)](https://arunkg7.gumroad.com/l/ihsob)

**Automate your marketing and customer workflows:**  
→ [50 AI Automation Prompts ($19)](https://arunkg7.gumroad.com/l/tqnpq)

**Get everything together:**  
→ Lead.AI Business Automation & XAI Builder Bundle — $79

---

*Thank you for building with Lead.AI. — Arun Kumar Gharami*
