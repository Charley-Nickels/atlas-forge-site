
// Static site data/config
const CONFIG = {
  ASSET_ROOT_URL: "ASSET_ROOT_URL", // e.g., https://raw.githubusercontent.com/Charley-Nickels/octopus-in-action/main/assets
  LIVE_DEMO_URL: "",                 // optional
  REPO_URL: ""                       // optional
};
const OIA_ASSETS = null; // or provide manual index

const withRoot = (u) => (u || "").replaceAll("ASSET_ROOT_URL", CONFIG.ASSET_ROOT_URL);
async function safeFetch(url){ try{ const r=await fetch(url); if(!r.ok) throw 0; return r; } catch { return null; } }
async function listFolder(folder){
  if (OIA_ASSETS && Array.isArray(OIA_ASSETS[folder])) return OIA_ASSETS[folder].map(withRoot);
  const res = await safeFetch(withRoot(`${CONFIG.ASSET_ROOT_URL}/${folder}/`));
  if (!res) return [];
  const html = await res.text();
  const links = [...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]);
  return links.filter(h=>!h.startsWith("?")&&!h.startsWith("#"))
              .filter(h=>!h.endsWith("/")&&!h.includes("index"))
              .map(h=>withRoot(`${CONFIG.ASSET_ROOT_URL}/${folder}/${decodeURI(h)}`));
}
const autoAlt = (url) => url.split("/").pop().split(".")[0].replace(/[_-]+/g," ").replace(/\b\w/g,c=>c.toUpperCase());

function pickHero(press, shots, gifs){
  const heroPress = press.filter(u => /hero_/i.test(u) && /\.(png|jpe?g)$/i.test(u));
  if (heroPress.length) return heroPress[0];
  const imgs = shots.filter(u => /\.(png|jpe?g)$/i.test(u));
  if (imgs.length) return imgs.sort((a,b)=>b.length-a.length)[0];
  if (gifs.length) return gifs[0];
  return null;
}
function mountHero(imgEl, url){ imgEl.src = url || "assets/branding/logo.svg"; imgEl.alt = url ? autoAlt(url) : "Atlasforge hero"; }

async function buildGallery(){
  const wrap = document.querySelector("[data-gallery]"); if(!wrap) return;
  const [shots, gifs] = await Promise.all([listFolder("screenshots"), listFolder("gifs")]);
  const media = [
    ...shots.filter(u => /\.(png|jpe?g)$/i.test(u)),
    ...gifs.filter(u => /\.gif$/i.test(u))
  ];
  if (!media.length){
    const p=document.createElement("p"); p.className="muted"; p.textContent="No screenshots or gifs found.";
    wrap.appendChild(p); return;
  }
  media.forEach(url=>{
    const fig=document.createElement("figure");
    const img=document.createElement("img");
    img.loading="lazy"; img.decoding="async"; img.alt=autoAlt(url); img.src=url; img.tabIndex=0;
    img.addEventListener("click",()=>openLightbox(url, img.alt));
    img.addEventListener("keydown",(ev)=>{ if(ev.key==='Enter') openLightbox(url,img.alt) });
    const cap=document.createElement("figcaption"); cap.className="caption"; cap.textContent=autoAlt(url);
    fig.appendChild(img); fig.appendChild(cap); wrap.appendChild(fig);
  });
}
function openLightbox(url, alt){
  const dlg=document.getElementById("lightbox"); if(!dlg) return;
  const img=dlg.querySelector("img"); img.src=url; img.alt=alt; dlg.showModal();
}
document.addEventListener("click",(e)=>{ const c=e.target.closest("[data-close]"); if(c) c.closest("dialog")?.close(); });

document.addEventListener("DOMContentLoaded", async () => {
  document.querySelectorAll("[data-year]").forEach(n=>n.textContent=new Date().getFullYear());
  const demo=document.querySelector("[data-demo]");
  if (demo) { demo.hidden = !CONFIG.LIVE_DEMO_URL; if(CONFIG.LIVE_DEMO_URL) demo.href = CONFIG.LIVE_DEMO_URL; }
  document.querySelectorAll("[data-download]").forEach(a=>a.href=withRoot("ASSET_ROOT_URL/downloads/latest.zip"));

  const [press,shots,gifs]=await Promise.all([listFolder("press"), listFolder("screenshots"), listFolder("gifs")]);
  const hero = pickHero(press, shots, gifs);
  document.querySelectorAll("[data-auto-hero]").forEach(img=>mountHero(img, hero));

  buildGallery();

  const pre=document.querySelector("[data-changelog]");
  if (pre){
    const res = await safeFetch(withRoot("ASSET_ROOT_URL/downloads/CHANGELOG.md"));
    pre.textContent = res ? (await res.text()).split("\n").slice(0,20).join("\n") : "No changelog found.";
  }
});
