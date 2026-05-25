# Lead.AI — Gumroad Product Management System

**Founder:** Arun Kumar Gharami  
**Brand:** Lead.AI  
**Email:** a.gharami.325@westcliff.edu  
**Last updated:** 2026-05-25

---

## What this repository does

This repository is the complete control center for the Lead.AI digital product business on Gumroad. Every product description, buyer instruction, customer onboarding message, support policy, marketing prompt, and update log lives here.

You do not need a separate CMS, dashboard, or expensive tool. This GitHub repo is your product management system.

**One repo. All products. Full control.**

---

## Products in this system

| # | Product | Price | Gumroad Link |
|---|---------|-------|--------------|
| 1 | Trustworthy AI Business Playbook: XAI, Fraud Detection & Automation Systems | $10 | https://arunkg7.gumroad.com/l/fhqklp |
| 2 | Fraud Detection XAI Project Kit: Python, SHAP, Dataset & Deployment Guide | $99 | https://arunkg7.gumroad.com/l/ihsob |
| 3 | Firebase SaaS Starter Kit for AI Products: Auth, Dashboard, Payments & Deployment | $49 | https://arunkg7.gumroad.com/l/efqpmz |
| 4 | 50 AI Automation Prompts for Small Businesses, Chatbots, Leads & SaaS Builders | $19+ | https://arunkg7.gumroad.com/l/tqnpq |
| 5 | Lead.AI Business Automation & XAI Builder Bundle | $79 (reg. $149) | (create on Gumroad) |
| 6 | Free Lead.AI AI Product Launch Checklist | Free | (create on Gumroad) |

---

## Repository structure

```
README.md                    — You are here
CLAUDE.md                    — Rules for Claude AI sessions in this repo
AGENTS.md                    — Specialized AI agent definitions for product work
product-control.yaml         — Master product registry and pricing strategy
CHANGELOG.md                 — Version history of all products
CUSTOMER_SUCCESS.md          — Customer-first operating principles
LAUNCH_CHECKLIST.md          — Pre-launch verification checklist
SUPPORT_POLICY.md            — Support response policy and SLA
VERSIONING.md                — Versioning rules for all products

products/                    — One folder per product
  {product-slug}/
    product.md               — Internal product spec
    gumroad-description.md   — Copy-paste ready Gumroad page text
    buyer-instructions.md    — Step-by-step instructions for buyers
    receipt-message.md       — Gumroad post-purchase confirmation message
    customer-onboarding.md   — First 10-minute → 1-day onboarding guide
    cover-prompt.md          — AI image prompt for product cover
    thumbnail-prompt.md      — AI image prompt for product thumbnail
    faq.md                   — Frequently asked questions
    upgrade-plan.md          — Roadmap for future versions
    update-log.md            — What changed in each release

bundle/                      — Bundle product folder
freebies/                    — Free lead-magnet products
marketing/                   — Social media and email prompt files
templates/                   — Reusable templates for all product work
scripts/                     — Python automation scripts
website/                     — Simple product website (HTML/CSS)
dist/                        — ZIP files built by build_product_zip.py
```

---

## How to use this repo

### Update a Gumroad product description
1. Open `products/{product}/gumroad-description.md`
2. Edit the content
3. Commit with message: `update: {product} gumroad description`
4. Copy the text into your Gumroad product page

### Add a new product
1. Copy `templates/gumroad-product-page-template.md` into a new folder under `products/`
2. Fill in every section
3. Update `product-control.yaml` with the new product entry
4. Update this `README.md` product table

### Run the product audit
```bash
python scripts/product_audit.py
```
This tells you which files are missing across all product folders.

### Build product ZIP files
```bash
python scripts/build_product_zip.py
```
This creates distributable ZIP files in `/dist`.

### Update the website
Edit `website/index.html` and push. If you deploy to GitHub Pages, enable it in repo settings.

---

## Brand values

- **Honest:** No fake testimonials, fake sales numbers, or invented income claims.
- **Practical:** Every product delivers something the buyer can use today.
- **Explainable:** Buyers always know what they are getting before they buy.
- **Supportive:** Every product ships with an onboarding guide and a support path.
- **Evolving:** Products receive regular updates. Buyers are notified.

---

## Contact and support

- Founder: Arun Kumar Gharami
- Email: a.gharami.325@westcliff.edu
- Brand: Lead.AI
- GitHub: https://github.com/Arungharami/Lead-ai-gumroad-products

---

*This repository is maintained by Arun Kumar Gharami. All product content, descriptions, and materials are original work under the Lead.AI brand.*
