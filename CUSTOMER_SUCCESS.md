# CUSTOMER_SUCCESS.md — Lead.AI Customer-First Operating Principles

## Why customer success matters for this business

Every Lead.AI product is a promise. When someone pays $10, $49, $99, or $79 for a bundle, they are trusting that the product will help them with a real problem. This document defines what "success" means for a Lead.AI buyer and how every part of the business — products, descriptions, onboarding, support, and updates — must serve that definition.

A satisfied buyer is the only sustainable marketing strategy. Referrals, repeat purchases, and honest reviews come from buyers who got real value. No amount of marketing fixes a product that does not deliver.

---

## The Lead.AI buyer success promise

1. **The buyer knows exactly what they are getting before they buy.**
   Every product page answers: What is in this? Who is it for? How do I use it? What result will I get?

2. **The buyer can start using the product within 10 minutes of purchase.**
   Every product includes a "first 10-minute action" in its onboarding guide.

3. **The buyer is never stranded.**
   Every product includes a support path, a FAQ, and a way to ask for help.

4. **The buyer is rewarded for staying.**
   Every product receives updates. Existing buyers are notified. Updates do not cost extra.

5. **The buyer is never deceived.**
   No fake testimonials. No fake sales counts. No fake income claims. No manufactured urgency.

---

## Buyer journey map

```
Awareness
  ↓
  - Finds Lead.AI on LinkedIn / Reddit / YouTube / email
  - Sees a post that solves a real problem
  - Clicks a link to a Gumroad product

Consideration
  ↓
  - Reads the product description
  - Sees clear value in the first 5 seconds
  - Checks the FAQ and the "who it's for" section
  - Decides this is worth the price

Purchase
  ↓
  - Buys on Gumroad
  - Receives receipt message (friendly, specific, action-oriented)
  - Gets immediate access to the product

Onboarding (first day)
  ↓
  - Reads customer-onboarding.md (in the product files)
  - Takes the first 10-minute action
  - Gets a quick win
  - Feels confident they made the right purchase

Activation (first week)
  ↓
  - Completes the first 1-day action
  - Uses the product for their specific goal
  - Optionally contacts support for a question

Retention (ongoing)
  ↓
  - Receives update notifications
  - Sees new versions and improvements
  - Trusts the brand enough to buy again

Advocacy
  ↓
  - Shares the product with others
  - Leaves an honest review on Gumroad
  - Joins the email list for Lead.AI updates

Upsell
  ↓
  Free → $10 Playbook → $19 Prompts → $49 Firebase Kit → $99 Fraud Kit → $79 Bundle → Custom service
```

---

## Support quality standards

- Every support email is answered within 48 hours (see SUPPORT_POLICY.md for full SLA).
- Every response is specific to the buyer's question, not a generic copy-paste.
- If a product has a bug, it is fixed and the buyer is notified.
- If a buyer requests a refund within the policy window, it is honored without argument.

---

## Update communication standards

When a product is updated:
1. Add an entry to `products/{product}/update-log.md`
2. Add an entry to `CHANGELOG.md`
3. Send a buyer update email (use `marketing/weekly-update-prompts.md` as a guide)
4. Update the version number in `product-control.yaml`
5. If the Gumroad description changes significantly, update `gumroad-description.md`

---

## Things Lead.AI will never do

- Sell a product that does not match its description.
- Promise a feature that is not ready.
- Ignore support requests.
- Remove buyer access to a product they paid for.
- Inflate sales numbers or use fake reviews.
- Create artificial scarcity ("Only 3 left!") for a digital product.

---

## Measuring customer success

Track these signals over time:
- Gumroad ratings and reviews (honest, organic only)
- Email reply rate to update notifications
- Repeat purchase rate (how many buyers buy a second product)
- Refund rate (high refund rate = product-description mismatch)
- Support question themes (repeated questions = missing documentation)

---

*Last updated: 2026-05-25 — Arun Kumar Gharami, Lead.AI*
