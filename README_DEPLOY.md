# README_DEPLOY.md

## 1) Prepare your asset root
Host the following folders at a public, indexable URL (CDN, GitHub Pages, or S3/CloudFront):
```
ASSET_ROOT_URL/
  branding/   (logo.svg, favicon.svg, favicon.png, optional index.json)
  press/      (hero_*.png|jpg, presskit.zip, optional index.json)
  screenshots/(*.png|jpg, optional index.json)
  gifs/       (*.gif, optional index.json)
  downloads/  (latest.zip, CHANGELOG.md, optional index.json)
```
> Tip: a simple `index.json` with `{ "files": ["file1.png","file2.png"] }` in each folder guarantees discovery even if HTML directory listing is blocked.

## 2) Configure the site
Open `script.js` and set:
```js
const CONFIG = {
  ASSET_ROOT_URL: "https://your.cdn/oia",
  LIVE_DEMO_URL: "https://your-vercel-app.vercel.app", // optional
  REPO_URL: "https://github.com/your/repo"             // optional
};
```
If your host blocks directory listings, paste a manual JSON into `OIA_ASSETS` as described in `script.js`.

## 3) Build & deploy
- **GitHub**: Create a repo (or new branch). Add these files at repo root:
  - `index.html`, `game.html`, `style.css`, `script.js`, `site.webmanifest`, `robots.txt`, `sitemap.xml`
- Commit & push.

### Deploy to Vercel
1. Import the repo in Vercel.
2. Framework preset: **Other** (static).
3. Build command: **none**. Output: **/**.
4. Set a production domain (optional). Redeploy after every change.

### Deploy to GitHub Pages
1. In repo settings → Pages → Build from branch: `main` / `/ (root)`.
2. Visit your Pages URL once the build finishes.

## 4) Verifying
- Open `/index.html` and `/game.html`.
- The hero image should auto-populate from `press/hero_*`. If not found, it falls back to screenshots, then gifs, then the logo.
- The **Download Latest Alpha** button points to `downloads/latest.zip`.
- The **Changelog** panel renders the first 20 lines of `downloads/CHANGELOG.md`.
- The Gallery lists images from `screenshots/` and `gifs/`, with lazy-loading and a built-in lightbox.

## 5) Press kit
Place a zip at `press/presskit.zip`. The homepage links to it directly.

## 6) Accessibility & performance
- High-contrast palette, visible focus states, semantic structure.
- No external JS/CSS frameworks; minimal JS; deferred loading; hero uses reserved aspect ratio to avoid layout shift.

## 7) Optional instrumentation hooks
Add your scripts later where needed:
```html
<!-- LogRocket / Plausible / Umami placeholder -->
```
