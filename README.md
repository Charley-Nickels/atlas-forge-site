# Atlasforge / AtlasStudio Prototype

This bundle contains a static front-end prototype for **Atlasforge Interactive** and the
**AtlasStudio** playground. It is meant as a portfolio piece and a conversation starter,
not a real SaaS product.

## Pages

- `index.html` — Atlasforge landing page (studio overview + project cards)
- `atlasstudio.html` — AtlasStudio product overview + gallery
- `atlasstudio-dashboard.html` — Fake but functional patch dashboard playground

## How to run locally

Open the folder in VS Code or your editor of choice, then either:

- Open `index.html` directly in a browser, or
- Serve the folder with a simple HTTP server, e.g.:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/index.html`.

## Deployment

This folder is designed to be pushed to GitHub and deployed on Vercel / Netlify
as a static site. No server-side code is required.

