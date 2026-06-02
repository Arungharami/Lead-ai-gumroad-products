# Lead.AI — Final Launch & Upload Guide
**Founder:** Arun Kumar Gharami | **Brand:** Lead.AI | **Last updated:** 2026-06-01

This guide details the exact sequential steps required to upload your newly compiled ZIP bundles to Gumroad, update pricing, deploy your storefront website, post on LinkedIn, and launch your first outbound prospecting campaign.

---

## 1. List of 7 ZIP Files to Upload
All release files have been compiled under the `/dist` directory on your machine. Upload these exact files as the primary downloads for their respective Gumroad pages:

1. **`dist/trustworthy-ai-business-playbook-v1.0.0.zip`** (9KB)
2. **`dist/fraud-detection-xai-project-kit-v1.0.0.zip`** (11KB)
3. **`dist/firebase-saas-starter-kit-v1.0.0.zip`** (80KB)
4. **`dist/ai-automation-prompt-vault-v1.0.0.zip`** (12KB)
5. **`dist/ai-client-acquisition-command-center-v1.0.0.zip`** (32KB)
6. **`dist/lead-ai-business-automation-xai-builder-bundle-v1.0.0.zip`** (8KB)
7. **`dist/free-ai-product-launch-checklist-v1.0.0.zip`** (7KB)

---

## 2. Gumroad Products to Update
Open your Gumroad Edit dashboard and perform these updates for your 4 existing listings:

### A. Trustworthy AI Business Playbook
- **URL**: https://arunkg7.gumroad.com/l/fhqklp
- **Action**: Delete any old download file, upload `dist/trustworthy-ai-business-playbook-v1.0.0.zip`, copy description from `products/trustworthy-ai-business-playbook/gumroad-description.md`, and save.
- **Price**: $10

### B. Fraud Detection XAI Project Kit
- **URL**: https://arunkg7.gumroad.com/l/ihsob
- **Action**: Delete any old download file, upload `dist/fraud-detection-xai-project-kit-v1.0.0.zip`, copy description from `products/fraud-detection-xai-project-kit/gumroad-description.md`, and save.
- **Price**: $99

### C. Lead.AI Indie AI SaaS Starter Kit
- **URL**: https://arunkg7.gumroad.com/l/efqpmz
- **Action**: Delete old file, upload `dist/firebase-saas-starter-kit-v1.0.0.zip`. Copy description and receipt message from `gumroad-ready-copy/firebase-saas-starter-kit-copy.md`.
- **Price**: $49 (Launch) / $79 (Regular)

### D. 50 AI Automation Prompts
- **URL**: https://arunkg7.gumroad.com/l/tqnpq
- **Action**: Delete old file, upload `dist/ai-automation-prompt-vault-v1.0.0.zip`. Copy description from `products/ai-automation-prompt-vault/gumroad-description.md`.
- **Price**: $19 (pay-what-you-want enabled, minimum $19)

---

## 3. New Gumroad Products to Create
Create these 3 new listings on your Gumroad dashboard:

### A. Client Acquisition Command Center (New Playbook)
- **Exact Product Title**: `Lead.AI Client Acquisition Command Center — Find & Pitch AI Automation Clients`
- **Gumroad Slug**: `client-acquisition-center` (https://arunkg7.gumroad.com/l/client-acquisition-center)
- **Launch Price**: $29 (Default setup)
- **Regular Price**: $49
- **CTA Button**: `Get the Playbook →`
- **Short Summary**: *Find local businesses, audit AI opportunities, write personalized outreach, and pitch simple AI automation projects with confidence.*
- **Full Description**: Copy the contents of `products/ai-client-acquisition-command-center/gumroad-description.md` -> ## FULL DESCRIPTION.
- **Receipt Message**: Copy the contents of `products/ai-client-acquisition-command-center/receipt-message.md` -> ## RECEIPT MESSAGE.
- **Attached File**: Upload `/dist/ai-client-acquisition-command-center-v1.0.0.zip` as the primary download.

### B. Lead.AI Business Automation & XAI Builder Bundle (New Bundle)
- **Exact Product Title**: `Lead.AI Business Automation & XAI Builder Bundle`
- **Gumroad Slug**: `lead-ai-bundle` (https://arunkg7.gumroad.com/l/lead-ai-bundle)
- **Bundle Price**: $79 (represents a $127 savings over individual total $206)
- **CTA Button**: `Get the Bundle →`
- **Attached File**: Upload `/dist/lead-ai-business-automation-xai-builder-bundle-v1.0.0.zip` (containing the bundle onboarding instructions).

### C. Free Lead.AI AI Product Launch Checklist (New Lead Magnet)
- **Exact Product Title**: `Free Lead.AI AI Product Launch Checklist`
- **Gumroad Slug**: `free-launch-checklist` (https://arunkg7.gumroad.com/l/free-launch-checklist)
- **Price**: $0
- **CTA Button**: `Download Free →`
- **Attached File**: Upload `/dist/free-ai-product-launch-checklist-v1.0.0.zip`.

---

## 4. Storefront Website Deployment Steps
The website storefront files (`index.html`, `style.css`) and backend dashboard (`app.js`, `index.html`) have been fully updated.

1. **Push verification**: Confirm that all commits are pushed to GitHub (`git status` shows completely clean).
2. **Activate Pages**: Go to your repository on GitHub -> **Settings** -> **Pages** (left navigation).
3. **Select Source**: Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
4. **Choose Branch**: Under **Branch**, select `main` and choose the `/website` folder from the directory dropdown. Click **Save**.
5. **Wait for deployment**: Within 60 seconds, GitHub Actions will compile and deploy your storefront. It will be live at:
   `https://arungharami.github.io/Lead-ai-gumroad-products/website/`

---

## 5. First LinkedIn Launch Post
Copy and publish this value-led LinkedIn post to drive checkouts and checklist downloads on Launch Day:

```text
Most AI tutorials stop before the part clients actually care about — explaining why a model made each decision, or capturing missed leads after 5 PM.

I spent months working on real applied fraud detection systems and business automation workflows. Building that value-first communication layer is what separates a local prototype from a paid consulting deliverable.

To help builders move from local coding to paid client contracts, I have packaged my entire sales, research, and audit playbook into a free release:

Introducing the Free Lead.AI AI Product Launch Checklist.

Here is what is inside:
✓ The 5-part AI Product Idea & ICP Worksheet
✓ Step-by-step Gumroad setup, pricing, and page layout audits
✓ Pre-written value-first LinkedIn cold outreach hook template
✓ Reusable 7-Day action checklist to systematically land your first client

Download the Launch Checklist completely free:
→ https://arunkg7.gumroad.com/l/free-launch-checklist

If you want the full developer codebase, auth integrations, and outreach CRM, the complete Lead.AI Builder Bundle is also live:
→ https://arunkg7.gumroad.com/l/lead-ai-bundle

Let's build, explain, and sell AI systems with confidence.

#artificialintelligence #freelancing #indiehackers #saas #sales
```

---

## 6. First 10-Customer Outreach Task
To kickstart your sales velocity, perform this outreach task today:

1. Open `products/ai-client-acquisition-command-center/04-lead-research-workflow.md`.
2. Research Google Maps in a city of your choice for **10 local businesses** matching one target niche (e.g. "Residential HVAC Contractors in Portland" or "Dental clinics in Sacramento").
3. Identify their direct emails and owner names.
4. Copy the Website Audit prompt from `products/ai-client-acquisition-command-center/03-ai-opportunity-audit-prompts.md` and run it in ChatGPT/Claude to pinpoint their specific support leaks.
5. Log them inside `products/ai-client-acquisition-command-center/09-simple-crm-tracker.csv`.
6. Customize and send the cold email template in `05-personalized-outreach-templates.md` highlighting their exact gaps.
7. Set a calendar reminder to send Follow-Up 1 in 3 business days if they haven't replied.
