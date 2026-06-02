# Product FAQ — Lead.AI Indie AI SaaS Starter Kit

This document addresses the most common technical, licensing, and integration questions regarding the **Lead.AI Indie AI SaaS Starter Kit**.

---

### 1. What framework or libraries does this kit utilize?
The core v1.0.0 boilerplate files are built using **vanilla HTML5, CSS3, and standard ES6+ client-side JavaScript**. It communicates directly with the Firebase Web SDK.
- **Why?** It ensures zero complex Vite/React build compilation overhead, zero dependency bloat, and maximum flexibility. Developers can easily port these clean, structured templates into React, Next.js, Vue, or Svelte frameworks.
- **Upgrades**: Upgraded Next.js and Supabase templates are detailed in our upgrade roadmap and will be delivered free to all existing buyers.

---

### 2. Does this kit require a paid backend server?
No. The database, user session registers, and static assets run completely serverless on **Firebase Firestore, Authentication, and Hosting**. 
- **Stripe Webhooks**: Subscription state updates are handled by Firebase Cloud Functions.
- **Free Scale**: Firebase offers a very generous free tier (Spark Plan). Auth, Firestore read/writes (up to 50k/day), and Hosting bandwidth are completely free at low scale. Cloud Functions require switching your console to the pay-as-you-go **Blaze Plan**, but you only pay if you exceed 2 million invocations per month (which typically equals $0 at initial launch).

---

### 3. How secure are the pre-configured database setups?
We enforce a strict **zero-trust data architecture**.
- Inside our [firebase-setup-guide.md](file:///Users/arun/Desktop/Lead-ai-gumroad-products/products/firebase-saas-starter-kit/firebase-setup-guide.md), we provide custom, production-ready Firestore Security Rules.
- These rules explicitly block public access, ensuring that only validated, logged-in document owners can read or write their own user records or model query logs.

---

### 4. Can I use this kit to sell multiple distinct AI products?
Yes. The Stripe billing configuration demonstrates how to map multiple subscription plans (e.g. Monthly Starter, Monthly Scale, and Annual Pro) inside a single application database. You can easily duplicate these schemas to handle distinct product licenses or token-top-up credits.

---

### 5. What is the commercial usage license terms?
Your purchase grants you a **Commercial & Personal Developer License**:
- You can modify the code to create unlimited personal or client-facing SaaS tools.
- You can compile and deploy derived commercial, revenue-generating applications under custom domains.
- You **cannot** resell, repackage, or distribute the original source codebase, configurations, or templates as a competing boilerplate, UI library, or template theme package.

---

### 6. How are third-party AI model API keys handled safely?
Browser-facing client JavaScript is visible to public inspect networks. If you call OpenAI/Gemini APIs directly from client-side JS, users can easily extract your tokens and consume your budget.
- Inside [ai-tool-template-guide.md](file:///Users/arun/Desktop/Lead-ai-gumroad-products/products/firebase-saas-starter-kit/ai-tool-template-guide.md), we outline the secure **Serverless API Proxy Pattern**.
- We show you how to securely place API tokens in backend environments (like Firebase Cloud Functions or Node.js endpoints) and call them securely using auth-tokens.

---

*For support queries not covered here, email a.gharami.325@westcliff.edu.*
