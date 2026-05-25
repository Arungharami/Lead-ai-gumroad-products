# Product Update Template

**Instructions:** Use this template when releasing a new version of any product.

---

## Step 1: Update the product file

Make the changes to the product content. Test all changes.

---

## Step 2: Update the update-log

Add to `products/{product}/update-log.md`:

```markdown
## [vX.X.X] — YYYY-MM-DD

### Added
- [New thing 1]
- [New thing 2]

### Changed
- [What changed and why]

### Fixed
- [What was wrong and is now correct]
```

---

## Step 3: Update product-control.yaml

Change `version:` to the new version number.

---

## Step 4: Update CHANGELOG.md

Add an entry at the top of CHANGELOG.md:

```markdown
## [vX.X.X] — YYYY-MM-DD — [Product Name]

### [Product Name]
- [Summary of changes]
```

---

## Step 5: Re-upload to Gumroad

1. Go to Gumroad → your product
2. Click "Edit"
3. Replace the product file with the new version
4. Save and publish

---

## Step 6: Write the update email

Use the prompt from `marketing/weekly-update-prompts.md` → "Prompt 1: Product improvement update"

Send to all buyers of this product via Gumroad's email tool.

---

## Update email template

```
Subject: [PRODUCT NAME] updated — [WHAT CHANGED in 5 words]

Hi,

I just updated [PRODUCT NAME] to version [VERSION NUMBER].

What changed:
- [Change 1]
- [Change 2]

[One sentence on why you made the change — buyer feedback, discovered issue, 
new information, etc.]

To get the update: Go to your Gumroad library and re-download [PRODUCT NAME].
[Or: The file will re-download automatically if you use the original link.]

Questions? Reply to this email.

Arun
Lead.AI
```

---

**Commit message for this update:**
```
version: [product-slug] v[X.X.X] — [brief description of change]
```
