// script.js
// ================== CONFIG (EDIT ME) ==================
const CONFIG = {
  ASSET_ROOT_URL: "ASSET_ROOT_URL",       // e.g., https://examplecdn.com/oia/
  LIVE_DEMO_URL: "",                      // optional: https://oia.vercel.app
  REPO_URL: "",                           // optional: https://github.com/Charley-Nickels/octopus-in-action
};

// If directory listing is blocked, paste a manual index here and it will be used instead.
const OIA_ASSETS = /* optional override */ null;
/*
Example:
const OIA_ASSETS = {
  branding: ["ASSET_ROOT_URL/branding/logo.svg","ASSET_ROOT_URL/branding/favicon.svg","ASSET_ROOT_URL/branding/favicon.png"],
  press: ["ASSET_ROOT_URL/press/hero_01.jpg"],
  screenshots: ["ASSET_ROOT_URL/screenshots/screen_01.jpg","ASSET_ROOT_URL/screenshots/screen_02.jpg"],
  gifs: ["ASSET_ROOT_URL/gifs/loop_01.gif"],
  downloads: ["ASSET_ROOT_URL/downloads/latest.zip","ASSET_ROOT_URL/downloads/CHANGELOG.md"]
};
*/
// ======================================================

// Utility: replace ASSET_ROOT_URL placeholder inside strings
const withRoot = (url) => (url || "").replaceAll("ASSET_ROOT_URL", CONFIG.ASSET_ROOT_URL);

// Fetch helper with graceful failure
async function safeFetch(url, opts) {
  try {
    const res = await fetch(url, opts);
    if (!res.ok) throw new Error(`${res.status}`);
    return res;
  } catch (e) { return null; }
}

// Attempt to list a folder (assumes indexable OR JSON at /index.json)
async function listFolder(folder) {
  if (OIA_ASSETS && Array.isArray(OIA_ASSETS[folder])) {
    return OIA_ASSETS[folder].map(withRoot);
  }
  // Try a JSON index first
  const jsonIdx = await safeFetch(withRoot(`${CONFIG.ASSET_ROOT_URL}/${folder}/index.json`));
  if (jsonIdx) {
    try { return (await jsonIdx.json()).files.map(withRoot); } catch {}
  }

  // Try bare listing: naive scrape (works on some CDNs / static servers)
  const res = await safeFetch(withRoot(`${CONFIG.ASSET_ROOT_URL}/${folder}/`), { mode: "cors" });
  if (!res) return [];
  const html = await res.text();
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const urls = links
    .filter(h => !h.startsWith("?") && !h.startsWith("#"))
    .filter(h => !h.endsWith("/") && !h.includes("index"))
    .map(h => withRoot(`${CONFIG.ASSET_ROOT_URL}/${folder}/${decodeURI(h)}`));
  return urls;
}

function autoAltFromFilename(url) {
  const name = url.split("/").pop().split(".")[0];
  return name.replace(/[_-]+/g, " ").replace(/\w/g, c => c.toUpperCase());
}

function pickHero(press, screenshots, gifs) {
  // Prefer press/hero_*; else largest screenshot; else first gif
  const heroPress = press.filter(u => /hero_/i.test(u) && /\.(png|jpe?g)$/i.test(u));
  if (heroPress.length) return heroPress[0];
  const imgs = screenshots.slice().filter(u => /\.(png|jpe?g)$/i.test(u));
  const byDimHint = (a,b) => (b.length - a.length);
  if (imgs.length) return imgs.sort(byDimHint)[0];
  if (gifs.length) return gifs[0];
  return null;
}

function mountHero(imgEl, url) {
  if (!imgEl || !url) return;
  imgEl.src = url;
  imgEl.alt = autoAltFromFilename(url);
}

function setRepoLinks() {
  document.querySelectorAll("[data-repo]").forEach(a => {
    if (CONFIG.REPO_URL) {
      a.href = CONFIG.REPO_URL;
      a.hidden = false;
    } else {
      a.hidden = true;
    }
  });
}

function setDemoButton() {
  const demo = document.querySelector("[data-demo]");
  if (!demo) return;
  if (CONFIG.LIVE_DEMO_URL) {
    demo.href = CONFIG.LIVE_DEMO_URL;
    demo.hidden = false;
  } else {
    demo.hidden = true;
  }
}

function setDownloadButtons() {
  const links = document.querySelectorAll("[data-download]");
  links.forEach(a => a.href = withRoot("ASSET_ROOT_URL/downloads/latest.zip"));
}

async function mountChangelog() {
  const pre = document.querySelector("[data-changelog]");
  if (!pre) return;
  const res = await safeFetch(withRoot("ASSET_ROOT_URL/downloads/CHANGELOG.md"));
  if (!res) { pre.textContent = "No changelog found."; return; }
  const text = await res.text();
  pre.textContent = text.split("\n").slice(0, 20).join("\n");
}

async function buildGallery() {
  const wrap = document.querySelector("[data-gallery]");
  if (!wrap) return;

  const [shots, gifs] = await Promise.all([listFolder("screenshots"), listFolder("gifs")]);
  const media = [
    ...shots.filter(u => /\.(png|jpe?g)$/i.test(u)),
    ...gifs.filter(u => /\.gif$/i.test(u))
  ];
  if (!media.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No screenshots or gifs found.";
    wrap.appendChild(empty);
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        img.src = img.dataset.src;
        obs.unobserve(img);
      }
    });
  }, { rootMargin: "200px" });

  media.forEach(url => {
    const fig = document.createElement("figure");
    const img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = autoAltFromFilename(url);
    img.dataset.src = url;
    img.tabIndex = 0;
    img.addEventListener("click", () => openLightbox(url, img.alt));
    img.addEventListener("keydown", (ev) => { if (ev.key === "Enter") openLightbox(url, img.alt); });
    const cap = document.createElement("figcaption");
    cap.className = "caption";
    cap.textContent = autoAltFromFilename(url);
    fig.appendChild(img);
    fig.appendChild(cap);
    wrap.appendChild(fig);
    io.observe(img);
  });
}

function openLightbox(url, alt) {
  const dlg = document.getElementById("lightbox");
  if (!dlg) return;
  const img = dlg.querySelector("img");
  img.src = url;
  img.alt = alt;
  dlg.showModal();
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-close]");
  if (btn) btn.closest("dialog")?.close();
});

// Theme toggle
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-theme-toggle]");
  if (!t) return;
  const body = document.body;
  const isLight = body.classList.toggle("theme-light");
  t.setAttribute("aria-pressed", String(isLight));
});

// Year stamp
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-year]").forEach(n => n.textContent = new Date().getFullYear());
  setRepoLinks();
  setDemoButton();
  setDownloadButtons();
  mountChangelog();
  buildGallery();
});

// Auto hero selection (both pages)
document.addEventListener("DOMContentLoaded", async () => {
  const [press, shots, gifs] = await Promise.all([listFolder("press"), listFolder("screenshots"), listFolder("gifs")]);
  const hero = pickHero(press, shots, gifs);
  document.querySelectorAll("[data-auto-hero]").forEach(img => mountHero(img, hero || withRoot("ASSET_ROOT_URL/branding/logo.svg")));
});
