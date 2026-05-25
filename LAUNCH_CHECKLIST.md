# LAUNCH_CHECKLIST.md — Lead.AI Product Launch Verification Checklist

Use this before publishing or updating any product on Gumroad.

---

## Product page checklist

- [ ] Product title is clear and outcome-focused (not just a name)
- [ ] Headline communicates the main benefit in under 10 words
- [ ] Subheadline clarifies who it is for and what they will get
- [ ] The problem section explains the pain the buyer has right now
- [ ] The "what you get" section lists all deliverables as a numbered or bulleted list
- [ ] The "who it's for" section matches the real target audience
- [ ] The "how to use it" section has clear steps (not vague descriptions)
- [ ] The "why now" section gives a compelling reason to buy today
- [ ] Bonus items are listed clearly
- [ ] FAQ covers the top 3–5 buyer objections
- [ ] Trust section explains who Arun is and why he built this (no fake reviews)
- [ ] Usage and refund note is present and matches SUPPORT_POLICY.md
- [ ] CTA is clear and ends with an action word ("Get it now →" / "Download free →")

---

## Product file checklist

- [ ] `product.md` — internal spec is complete
- [ ] `gumroad-description.md` — copy-paste ready, no TODOs
- [ ] `buyer-instructions.md` — step-by-step, prerequisites listed
- [ ] `receipt-message.md` — under 300 words, friendly, action-oriented
- [ ] `customer-onboarding.md` — all 7 sections present
- [ ] `cover-prompt.md` — specific AI image generation prompt
- [ ] `thumbnail-prompt.md` — specific AI image generation prompt
- [ ] `faq.md` — at least 5 questions answered
- [ ] `upgrade-plan.md` — at least 3 future improvements listed
- [ ] `update-log.md` — v1.0.0 entry present

---

## Gumroad settings checklist

- [ ] Product price matches `product-control.yaml`
- [ ] Product URL is correct and noted in `product-control.yaml`
- [ ] Cover image is uploaded (use cover-prompt.md to generate)
- [ ] Thumbnail image is uploaded (use thumbnail-prompt.md to generate)
- [ ] Post-purchase message matches `receipt-message.md`
- [ ] Product file (PDF/ZIP) is uploaded
- [ ] "Thank you" email is configured in Gumroad settings
- [ ] Product is set to Published (not Draft)

---

## Marketing readiness checklist

- [ ] LinkedIn announcement post is drafted (use marketing/linkedin-post-prompts.md)
- [ ] Reddit post is drafted for relevant subreddits
- [ ] Twitter/X announcement post is drafted
- [ ] Email sequence is configured (use marketing/email-sequence-prompts.md)
- [ ] Free checklist is live and linked to this product in the upsell path

---

## Technical checklist (for code products only)

- [ ] All code examples are tested and working
- [ ] Python version and package versions are specified
- [ ] Dataset or sample files are included
- [ ] Deployment steps are verified on a clean environment
- [ ] GitHub README template is included (for Fraud Detection Kit)
- [ ] Deployment checklist is complete (for Firebase SaaS Kit)

---

## Final sign-off

- [ ] Run `python scripts/product_audit.py` — all green
- [ ] Reviewed by founder (Arun Kumar Gharami)
- [ ] Version number set in `product-control.yaml`
- [ ] Entry added to `CHANGELOG.md`

---

*Complete all checkboxes before publishing. This is your quality gate.*
