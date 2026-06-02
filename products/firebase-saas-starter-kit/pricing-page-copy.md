# Pricing Page Structure and Subscription Positioning

This guide outlines the optimal positioning, copywriting structures, and functional tiers for your SaaS subscription pricing. It presents three standardized plans tailored for different usage levels, token allocations, and support requirements.

---

## 1. Subscription Tier Structure

Present your pricing in three distinct columns to guide the buyer toward the tier that best matches their scale.

### Tier 1: Starter Plan (Monthly)
- **Positioning:** Ideal for individual developers, hobbyists, or early-stage startups validation phase.
- **Price:** $49 per month
- **Billing Interval:** Billed monthly, cancel anytime.
- **Feature Copy:**
  - **100,000 Monthly Tokens:** Adequate for basic testing and low-volume operations.
  - **Standard Email Support:** 48-hour response guarantee.
  - **Shared Serverless API Infrastructure:** Default rate limits apply.
  - **1 Active Project Database Sync:** Includes core Firestore and Stripe integration capabilities.
- **CTA Copy:** `Start with Starter`

### Tier 2: Scale Plan (Monthly) — *Recommended Tier*
- **Positioning:** Designed for growing businesses, indie hackers, and SaaS operators scaling production traffic.
- **Price:** $79 per month
- **Billing Interval:** Billed monthly, cancel anytime.
- **Feature Copy:**
  - **500,000 Monthly Tokens:** Suitable for high-volume text and data processing.
  - **Priority Support:** 12-hour response guarantee.
  - **Dedicated Backend Rate Limits:** Higher concurrent API payload limits.
  - **5 Active Project Database Syncs:** Scale multiple applications on a single account.
  - **Automated Caching Layer:** Minimizes duplicate API costs by skipping redundant runs.
- **CTA Copy:** `Upgrade to Scale`

### Tier 3: Pro Annual Plan
- **Positioning:** Optimized for teams and long-term builders seeking cost-efficiency and maximum resource limits.
- **Price:** $149 per month (Billed annually at $1,788)
- **Billing Interval:** Billed annually, saving over 35% compared to monthly scaling costs.
- **Feature Copy:**
  - **2,000,000 Annual Tokens:** High-throughput access.
  - **Dedicated Slack Channel Support:** Direct access to technical support engineers.
  - **Unlimited Database Syncs:** Build, prototype, and host unlimited custom applications.
  - **Custom Model Integration:** Securely connect fine-tuned external LLM checkpoints.
  - **Unlimited API Key Security Audits:** Free source code credentials scan.
- **CTA Copy:** `Get Pro Annual`

---

## 2. Feature Comparison Matrix

Use a detailed table to provide full technical transparency to buyers. This demonstrates high value and builds immediate trust.

| Feature / Limit | Starter ($49/mo) | Scale ($79/mo) | Pro Annual ($149/mo equivalent) |
| :--- | :--- | :--- | :--- |
| **Monthly Token Allocation** | 100,000 | 500,000 | 2,000,000 |
| **Authentication Profiles** | Unlimited | Unlimited | Unlimited |
| **Database Sync Projects** | 1 | 5 | Unlimited |
| **Response Latency Optimization** | Standard | Priority Caching | Enterprise Caching |
| **Stripe Webhook Sync** | Enabled | Enabled | Enabled |
| **Support SLA** | 48-Hour Email | 12-Hour Email | Slack Direct |
| **Source Code Auditing** | Manual | Standard Automated | Continuous |

---

## 3. High-Conversion Pricing FAQs

Address common objections directly on your pricing page to reduce conversion barriers.

### Q: What happens if I consume all my monthly tokens?
**A:** Once you reach your token limit, you can either upgrade to a higher tier immediately or connect your personal OpenAI/Anthropic/Gemini API key in your account settings. If you use your personal API key, we will only charge you our flat software platform fee with zero token markup.

### Q: Can I cancel my subscription mid-cycle?
**A:** Yes. You can cancel your subscription at any time through your dashboard. Your access will remain active until the final day of your current paid billing period, and no further billing will occur. We do not offer prorated refunds for mid-cycle cancellations.

### Q: Do you charge a markup on database hosting?
**A:** No. You connect your own Firebase project for database hosting. Google Cloud offers a generous free tier for Firestore and Firebase Auth, meaning your hosting costs will remain near zero until your app attracts substantial production traffic.
