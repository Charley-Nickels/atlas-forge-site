# Atlasforge Site (Home + OIA Game Page)

1) In `script.js`, set:
```js
const CONFIG = {
  ASSET_ROOT_URL: "https://raw.githubusercontent.com/Charley-Nickels/octopus-in-action/main/assets",
  LIVE_DEMO_URL: "",
  REPO_URL: ""
};
```

2) Deploy (Vercel static):
- Framework: Other
- Build: (none)
- Output: `.` or `web/` if you place these files inside `/web`

3) Git quick-publish
```bash
git checkout -b atlasforge-site-final-v1
git add .
git commit -m "Atlasforge site: home + OIA game page"
git push origin atlasforge-site-final-v1
# Open PR → Squash & Merge
```
