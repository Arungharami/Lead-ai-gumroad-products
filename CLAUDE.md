# CLAUDE.md — Rules for Claude AI Sessions in this Repository

## Repository purpose

This is the Lead.AI product management system for Gumroad digital products. All AI sessions in this repo must follow the rules below to maintain product quality, buyer trust, and brand consistency.

---

## Identity and brand rules

- Brand name: **Lead.AI**
- Founder: **Arun Kumar Gharami**
- Voice: Professional, direct, practical, encouraging. Not academic. Not salesy.
- Audience: AI students, beginner developers, freelancers, small business owners, startup founders.
- Always write as if the buyer is asking: "What do I get? How does it help me? How fast can I use it?"

---

## Content rules

### Never do these
- Do not invent fake testimonials, fake user counts, fake income claims, or fake social proof.
- Do not remove Gumroad product links. They are canonical.
- Do not use Gumroad's brand, logo, or trademarked terms as Lead.AI's own.
- Do not write purely academic language. Lead.AI products are for builders, not researchers.
- Do not create files that are placeholder-only. Every file must contain useful content.
- Do not write vague value propositions. Every benefit statement must name a specific outcome.

### Always do these
- Every product description must show clear value within the first 5 seconds of reading.
- Every product must include buyer instructions, onboarding, and a support path.
- Every product must include an upgrade plan and update log.
- All prices must match `product-control.yaml`. If in doubt, check the YAML first.
- When updating a product, add an entry to that product's `update-log.md`.
- When a major change happens, update `CHANGELOG.md`.

---

## File structure rules

- Do not create files outside the defined folder structure without a strong reason.
- Do not rename product folders without updating `product-control.yaml` and `README.md`.
- `gumroad-description.md` files must always be copy-paste ready — no placeholders, no TODO comments.
- `receipt-message.md` files must be under 300 words and friendly in tone.
- `customer-onboarding.md` files must include: welcome, 10-minute action, 1-hour action, 1-day action, support path, update path, and next step.

---

## Pricing rules

| Product | Price |
|---------|-------|
| Trustworthy AI Business Playbook | $10 |
| Fraud Detection XAI Project Kit | $99 |
| Firebase SaaS Starter Kit | $49 |
| 50 AI Automation Prompts | $19+ |
| Lead.AI Bundle | $79 (reg. $149) |
| Free Checklist | $0 |

Do not suggest price changes without noting them in `product-control.yaml` under `pricing_strategy`.

---

## Writing style rules

- Paragraphs: 2–4 sentences maximum.
- Sentences: active voice. Subject does the action.
- Headlines: short, outcome-focused. Example: "Build an XAI fraud detector in Python — with SHAP, datasets, and deployment."
- Bullet lists: each bullet is a concrete deliverable or action, not a vague concept.
- CTA buttons: "Get it now →" or "Download free →" — not "Click here" or "Buy now."

---

## Commit message convention

```
create: {description}     — new file or product
update: {description}     — changes to existing content
fix: {description}        — correcting errors
remove: {description}     — deletion with reason
version: {product} v{X.X} — product version bump
```

---

## When in doubt

1. Check `product-control.yaml` for product facts.
2. Check `CUSTOMER_SUCCESS.md` for customer-first principles.
3. Check `SUPPORT_POLICY.md` for support response guidelines.
4. Ask the founder (Arun Kumar Gharami) before making structural changes.
