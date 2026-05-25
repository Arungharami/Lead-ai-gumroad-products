# Lead.AI — Product Website

This folder contains the static website for the **Lead.AI** brand, built by Arun Kumar Gharami.

The site is a single-page product showcase: no build step, no JavaScript framework, no external CDN dependencies. It is plain HTML and CSS that works in any modern browser and deploys to GitHub Pages in under two minutes.

---

## Files

| File | Purpose |
|---|---|
| `index.html` | All page content — nav, hero, product cards, bundle section, free checklist, footer |
| `style.css` | All styling — mobile-first responsive layout, color tokens, component styles |
| `README.md` | This file |

---

## How to update product information

### Update a product title, description, or price

Open `index.html` and find the `<article>` element with the matching `aria-label`. Each product card looks like:

```html
<article class="card" role="listitem" aria-label="Product Name Here">
  <span class="card__tag card__tag--guide">Guide</span>
  <h3 class="card__title">Title goes here</h3>
  <p class="card__desc">One-line description goes here.</p>
  <div class="card__footer">
    <p class="card__price">$10</p>
    <a href="https://arunkg7.gumroad.com/l/XXXXX" ...>Get it &rarr;</a>
  </div>
</article>
```

Edit the text directly. The layout will reflow automatically.

---

## How to update Gumroad links

Each product's buy button has an `href` attribute pointing to a Gumroad URL:

```html
<a href="https://arunkg7.gumroad.com/l/fhqklp" ...>Get it &rarr;</a>
```

To update a link:
1. Open `index.html` in any text editor.
2. Find the `<a>` tag inside the matching product card.
3. Replace the `href` value with the new Gumroad URL.
4. Save the file.

### Links that are currently placeholders (`href="#"`)

Two items use `href="#"` because their pages are not yet live:

| Item | Where in the file | What to do |
|---|---|---|
| Lead.AI Business Automation & XAI Builder Bundle | `#bundle` section — inside `.bundle__coming` | When the Gumroad bundle page is live, add a `<a>` button pointing to the URL and remove the `.bundle__coming` notice, or replace the notice text. |
| Free AI Product Launch Checklist | `#checklist` section — the "Download Free" button | Replace `href="#"` with the real Gumroad or direct download URL. Update the note text below the button if needed. |

---

## How to deploy on GitHub Pages

### Step 1 — Push the website folder to your repository

Make sure `index.html` and `style.css` are committed and pushed to the `main` branch of:

```
https://github.com/Arungharami/Lead-ai-gumroad-products
```

The files can live either at the repository root or inside a subfolder (e.g. `/website/`).

### Step 2 — Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages** (left sidebar).
3. Under **Source**, select **Deploy from a branch**.
4. Choose the **main** branch.
5. If your files are in a subfolder, select that folder from the dropdown (e.g. `/website`). If they are at the root, leave it as `/ (root)`.
6. Click **Save**.

### Step 3 — Wait for the build

GitHub will display a banner with your live URL, usually within 60–90 seconds. It will look like:

```
https://arungharami.github.io/Lead-ai-gumroad-products/
```

or, if publishing from the `/website` subfolder:

```
https://arungharami.github.io/Lead-ai-gumroad-products/website/
```

### Step 4 — Subsequent updates

Every `git push` to `main` will automatically rebuild and redeploy the site. No additional steps are required.

---

## Custom domain (optional)

If you want the site to live at a domain like `leadai.io`:

1. In the repository **Settings → Pages**, enter your custom domain.
2. Add a `CNAME` file at the root of the website folder containing only your domain name (e.g. `leadai.io`).
3. Update your DNS provider to point an `A` record (or `CNAME`) to GitHub Pages' IPs as described in the [GitHub Pages custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

---

## Local preview

No build step needed. Open `index.html` directly in a browser, or use any static file server:

```bash
# Python 3
python3 -m http.server 8080 --directory website/

# Then open: http://localhost:8080
```

---

## Contact

- **Founder:** Arun Kumar Gharami
- **Email:** a.gharami.325@westcliff.edu
- **GitHub:** https://github.com/Arungharami/Lead-ai-gumroad-products
