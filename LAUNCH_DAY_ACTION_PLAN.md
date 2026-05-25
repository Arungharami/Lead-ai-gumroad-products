# LAUNCH_DAY_ACTION_PLAN.md
# Lead.AI — Exact Launch Day Execution Guide
# Last updated: 2026-05-25

---

## PRE-LAUNCH: Complete these before you post anything publicly

**Step 1: Gumroad updates (30–45 minutes)**

Do these in order. Do not post anywhere until all 4 existing products have updated descriptions.

```
Order:
1. Free Checklist         → create new product, $0
2. AI Prompt Vault        → update existing: https://arunkg7.gumroad.com/l/tqnpq
3. AI Playbook            → update existing: https://arunkg7.gumroad.com/l/fhqklp
4. Firebase Kit           → update existing: https://arunkg7.gumroad.com/l/efqpmz
5. Fraud Detection Kit    → update existing: https://arunkg7.gumroad.com/l/ihsob
6. Bundle                 → create new product, $79
```

For each product:
- Open the matching file in `gumroad-ready-copy/`
- Copy the FULL DESCRIPTION section → paste into Gumroad description editor
- Copy the RECEIPT MESSAGE section → paste into Gumroad "Thank you" field
- Upload the matching ZIP from `/dist`

**Step 2: Upload cover images**

Generate using the prompt in each product's `cover-prompt.md`. Use DALL-E 3, Adobe Firefly, or Midjourney. Upload to each product. This takes 20–30 minutes.

If you don't have time for covers today: launch anyway. Update covers within 48 hours. A product with no cover image still sells if the description is good.

**Step 3: Double-check all Gumroad links work**

- Click each product URL
- Confirm the page loads with the new description
- Confirm the price is correct
- Check that the download works on the free checklist

---

## LAUNCH DAY: The exact posting order

### Hour 1: Gumroad + GitHub

**Gumroad:**
- All products updated (see pre-launch above)
- Free checklist live and published
- Bundle live and published

**GitHub README (add to the top of README.md):**

```markdown
## Products

| Product | Price | Link |
|---------|-------|------|
| Trustworthy AI Business Playbook | $10 | [Get it](https://arunkg7.gumroad.com/l/fhqklp) |
| Fraud Detection XAI Project Kit | $99 | [Get it](https://arunkg7.gumroad.com/l/ihsob) |
| Firebase SaaS Starter Kit | $49 | [Get it](https://arunkg7.gumroad.com/l/efqpmz) |
| 50 AI Automation Prompts | $9+ | [Get it](https://arunkg7.gumroad.com/l/tqnpq) |
| Lead.AI Bundle | $79 | [Coming soon] |
| Free Launch Checklist | Free | [Get it free] |
```

Add your GitHub bio: "AI Engineer · Building practical AI tools for developers and founders · Lead.AI"

---

### Hour 2: LinkedIn (post this first)

Copy the post from `marketing/ready-to-post/linkedin-launch-post-1.md`.

Replace [FREE CHECKLIST LINK] with your Gumroad free checklist URL.

Post at peak time: **9–11am your local time, Monday or Tuesday.**

Do NOT include the paid product links in this first post. The goal is checklist downloads and profile views, not direct sales.

---

### Hour 3: Twitter/X

Post tweets 1 and 2 from `marketing/ready-to-post/twitter-x-launch-posts.md` (spaced 2–3 hours apart).

Replace the [LINKS] with your Gumroad URLs.

---

### Hour 4+: Reddit

Post the value post from `marketing/ready-to-post/reddit-value-post.md`:
- Post 1 in r/learnmachinelearning (SHAP technical post — no product link needed)
- Post 3 in r/datascience (free checklist — includes link)

Wait until you have 3–5 comments on the LinkedIn post before checking Gumroad analytics.

---

### Website

Update `website/index.html`:
- Replace `href="#"` for the free checklist with your actual Gumroad URL
- Replace `href="#"` for the bundle with your actual Gumroad URL
- Consider deploying to GitHub Pages: Settings → Pages → Deploy from main branch

---

## WHAT TO CHECK IN GUMROAD ANALYTICS

Check these 24 hours after launch:

| Metric | What it tells you |
|--------|------------------|
| Page views per product | Which products are getting traffic |
| Conversion rate | % of views → purchases |
| Traffic source | Where buyers are coming from |
| Free checklist downloads | How many email leads you've captured |

**Healthy early numbers:**
- 20–50 page views per product = normal for a new creator
- 1–5% conversion = acceptable
- 0% conversion on 20+ views = product page problem (see below)

---

## IF THERE ARE VIEWS BUT NO SALES

This means people are landing on the page but not buying. The product page is the problem.

**Diagnose in this order:**

1. **Read your headline** — does it say what the buyer gets in under 10 words? If not, rewrite it.

2. **Read your "What you get" section** — is it a specific numbered list of real files? Or vague descriptions like "comprehensive guide"? Make it specific.

3. **Read your trust section** — does it say who you are and why you built this? Without a trust section, technical buyers don't buy.

4. **Check your price** — for first sales, the Prompt Vault at $9 minimum has the lowest barrier. If nothing else is selling, start there.

5. **Check your cover image** — no cover image = significantly lower click-through rate. Get covers up within 48 hours.

---

## IF THERE ARE NO VIEWS AT ALL

This is a distribution problem, not a product problem.

**What to do:**

1. Post the LinkedIn post if you haven't (most impactful single action)
2. Post in one Reddit community with the free checklist link
3. Add Gumroad links to your Twitter/X and LinkedIn bio/profile
4. Send a direct message to 3 specific people who you know would benefit — not mass outreach, 3 specific people
5. Add the free checklist link to the bottom of your GitHub profile README

**What NOT to do:**
- Don't change your product descriptions yet (you don't have data)
- Don't lower your prices yet (you don't know if price is the issue)
- Don't buy ads (not until you've validated organic conversion first)

---

## END OF LAUNCH DAY CHECKLIST

- [ ] All Gumroad products updated with new descriptions
- [ ] All receipt messages updated
- [ ] Free checklist live
- [ ] Bundle created (or scheduled for Day 3)
- [ ] LinkedIn post published
- [ ] Twitter/X posts published
- [ ] GitHub README updated with product links
- [ ] Gumroad analytics noted (baseline page views)
- [ ] One Reddit post published

**If you completed all of the above: launch is successful. Sales will follow with consistency.**
