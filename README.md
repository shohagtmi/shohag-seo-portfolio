# Shohag | SEO Specialist — Portfolio Website

Static HTML/CSS/JS site. No build step, no framework, no backend — deploys directly to GitHub Pages for free.

## Before you deploy: replace the placeholder domain (ONE step)

Every canonical URL, Open Graph tag, and structured-data block in this project
uses `https://example.com` as a placeholder. It's the same string everywhere on
purpose, so swapping it is a single find-and-replace — not 38 manual edits.

Once you know your real GitHub Pages URL (e.g. `https://shohagtmi.github.io/portfolio`)
or a custom domain, run this from the project root:

```bash
# macOS
find . -type f \( -name "*.html" -o -name "*.xml" -o -name "*.txt" \) \
  -exec sed -i '' 's|https://example.com|https://YOUR-REAL-DOMAIN|g' {} +

# Linux
find . -type f \( -name "*.html" -o -name "*.xml" -o -name "*.txt" \) \
  -exec sed -i 's|https://example.com|https://YOUR-REAL-DOMAIN|g' {} +
```

Do **not** include a trailing slash in `YOUR-REAL-DOMAIN`.

After running it, double-check with:

```bash
grep -rn "example.com" .
```

That command should return nothing once every file is updated.

## Deploying to GitHub Pages

1. Push this project to a GitHub repository.
2. Repo → Settings → Pages → set source to your default branch, root folder.
3. If you're deploying to a **project page** (`username.github.io/repo-name`),
   double check every internal link still resolves — this project already uses
   relative paths (`about.html`, not `/about.html`), so it works correctly
   under a subpath without changes.
4. If you later add a **custom domain**, GitHub Pages will ask you to add a
   `CNAME` file — do that through GitHub's UI, and re-run the domain
   find-and-replace above with your custom domain instead.

## What still needs real assets from you

The code is production-ready, but these need real content before launch:

- **`assets/profile-placeholder.svg`** → replace with your actual photo
  (update the `<img src>` in `index.html` and `about.html`, keep `width`/`height`
  attributes accurate to avoid layout shift).
- **`assets/og-image.png`** → currently a clean generated placeholder card with
  your name and positioning. Swap for a real branded image once you have one —
  keep it at 1200×630 to avoid social platforms cropping it oddly.
- **Real screenshots** of the Agriculture project in `case-study-agriculture.html`
  (currently a labeled placeholder box, not a fake image).
- **Contact form backend** — currently opens the visitor's email client with the
  message prefilled (works with zero cost/backend). See the comment inside
  `contact.html` for the two-minute Formspree/Web3Forms upgrade path if you want
  submissions to land somewhere without opening email.
- **Social links** — Upwork, Fiverr, GitHub, X, etc. are intentionally omitted
  until they exist. Do not add placeholder links; add them to the footer and
  nav only once real.

## Project structure

```
index.html                     Home
about.html                     About
services.html                  Services
case-studies.html              Case studies index
case-study-agriculture.html    The one real project, in full detail
blog.html                      Blog index (articles marked "coming soon")
blog-post-template.html        Reusable template for a real future post — noindex'd, not linked in nav
contact.html                   Contact form + direct contact info
404.html                       GitHub Pages 404 page
css/styles.css                 Single stylesheet, one design system
js/main.js                     Nav, FAQ accordion, scroll reveal, contact form handling
assets/                        favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.png, profile-placeholder.svg
robots.txt
sitemap.xml
```

## Final pre-launch QA (completed)

This project has been through three audit passes: initial build QA, production
polish, and a final pre-launch check. The final pass found and fixed two real
bugs worth knowing about:

- **Favicon was a bulky inline data-URI repeated in every page's `<head>`**,
  while a real `favicon-32.png` asset sat unused. Now every page references
  the real files (`assets/favicon.svg` + `assets/favicon-32.png`).
- **A leftover `outline: none` rule on form fields was silently overriding
  the keyboard focus-ring fix** added in an earlier pass, due to CSS
  specificity (`.form-group input:focus` beat the global `:focus-visible`
  rule). Fixed — keyboard focus is now visible on every form field.

Everything else (internal links, JSON-LD validity, sitemap, robots.txt,
personal info consistency) was checked and confirmed clean.
