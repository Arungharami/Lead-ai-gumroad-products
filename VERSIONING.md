# VERSIONING.md — Lead.AI Product Versioning Policy

## Why versioning matters

When you update a product, buyers need to know what changed and whether they should re-download. Clear versioning builds trust and makes it easy to communicate updates.

---

## Version format

All Lead.AI products use semantic versioning: **MAJOR.MINOR.PATCH**

| Change type | Version bump | Examples |
|-------------|-------------|---------|
| Fix typos, broken links, formatting | PATCH (1.0.X) | 1.0.0 → 1.0.1 |
| Add new content, sections, templates, prompts | MINOR (1.X.0) | 1.0.0 → 1.1.0 |
| Full rewrite, new structure, major new deliverables | MAJOR (X.0.0) | 1.0.0 → 2.0.0 |

---

## Version locations

Every product version is tracked in three places:
1. `product-control.yaml` — under `version:` for each product
2. `products/{product}/update-log.md` — the detailed changelog for that product
3. `CHANGELOG.md` — the system-wide changelog

All three must be updated together when a version bumps.

---

## How to release a new version

1. Make the changes to product files
2. Update `products/{product}/update-log.md` with an entry:
   ```
   ## [v1.1.0] — YYYY-MM-DD
   ### Added
   - New section on [topic]
   ### Changed
   - Updated [section] to be clearer
   ### Fixed
   - Corrected typo in step 4
   ```
3. Update `product-control.yaml` → `version:` field
4. Add entry to `CHANGELOG.md`
5. Re-upload the product file to Gumroad
6. Send buyer update notification email (use `marketing/weekly-update-prompts.md`)

---

## Current versions

| Product | Version | Date |
|---------|---------|------|
| Trustworthy AI Business Playbook | 1.0.0 | 2026-05-25 |
| Fraud Detection XAI Project Kit | 1.0.0 | 2026-05-25 |
| Firebase SaaS Starter Kit | 1.0.0 | 2026-05-25 |
| AI Automation Prompt Vault | 1.0.0 | 2026-05-25 |
| Lead.AI Bundle | 1.0.0 | 2026-05-25 |
| Free Launch Checklist | 1.0.0 | 2026-05-25 |

---

*Maintained by Arun Kumar Gharami — Lead.AI*
