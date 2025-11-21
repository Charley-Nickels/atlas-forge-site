// AtlasStudio Playground script — fake, but logically structured.

// Mobile nav toggle
document.querySelectorAll('.nav-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const navId = btn.getAttribute('aria-controls');
    const nav = document.getElementById(navId);
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (nav) {
      nav.style.display = expanded ? '' : 'flex';
    }
  });
});

// Only run playground logic if the dashboard elements exist
const scenarioButtons = document.querySelectorAll('.scenario-btn');
const tabButtons = document.querySelectorAll('.tab-btn');
const suggestionsBody = document.getElementById('suggestionsBody');
const panelTitleEl = document.getElementById('panelTitle');
const panelSubtitleEl = document.getElementById('panelSubtitle');
const previewTitleEl = document.getElementById('previewTitle');
const previewImageEl = document.getElementById('previewImage');
const previewStatusListEl = document.getElementById('previewStatusList');

const patchOverlayEl = document.getElementById('patchOverlay');
const patchBarEl = document.getElementById('patchBar');
const patchPercentEl = document.getElementById('patchPercent');
const patchNowBtn = document.getElementById('patchNowBtn');
const keepWorkingBtn = document.getElementById('keepWorkingBtn');
const closePatchBtn = document.getElementById('closePatchBtn');

if (scenarioButtons.length && tabButtons.length && suggestionsBody) {
  const scenarios = {
    rpg: {
      title: 'RPG: Crafting system patch',
      hero: 'Game preview — Version alpha‑v0.1.12',
      image: 'assets/dashboard_mock_1.png',
      preview: [
        { label: 'New quest added', badge: 'OK' },
        { label: 'Required — UI changes', badge: 'UI' },
        { label: 'Suggestion — Add shops to buy / sell weapons', badge: 'Boost' }
      ],
      tabs: {
        brainstorm: `
          <div class="subpanel-heading">Patch idea — <strong>RPG crafting</strong></div>
          <p>Should the game support crafting weapons, armor, and potions from raw materials?</p>
          <div class="toggle-row">
            <label for="t-rpg-recipes">Enable crafting recipes?</label>
            <input id="t-rpg-recipes" type="checkbox" checked>
          </div>
          <div class="toggle-row">
            <label for="t-rpg-shops">Add weapon / armor shops?</label>
            <input id="t-rpg-shops" type="checkbox" checked>
          </div>
          <ul>
            <li>Implemented — Inventory system <span class="badge">OK</span></li>
            <li>Required — UI changes <span class="badge">UI impact</span></li>
            <li>Suggested improvement — Add shops to buy / sell weapons <span class="badge">Boosts engagement</span></li>
            <li>Required — Crafting recipes <span class="badge">Balance risk</span></li>
          </ul>
        `,
        uat: `
          <div class="subpanel-heading">UAT — <strong>Test the patch</strong></div>
          <p>This section sketches how AtlasStudio could auto‑draft test cases for your approved toggles.</p>
          <ul>
            <li>Create a basic sword from starter materials.</li>
            <li>Upgrade an item to verify quality tiers.</li>
            <li>Craft both armor and potions in a single session.</li>
            <li>Confirm recipes unlock in the journal after discovery.</li>
          </ul>
        `,
        review: `
          <div class="subpanel-heading">Review — <strong>Summary &amp; risks</strong></div>
          <p>Here AtlasStudio would generate a human‑readable summary of what this patch does, what it touches,
          and what you explicitly rejected.</p>
          <ul>
            <li>Highlights crafting as a mid‑game progression feature.</li>
            <li>Notes new UI surfaces and tutorial moments.</li>
            <li>Calls out balance risks if rare materials are too common.</li>
          </ul>
        `,
        patch: `
          <div class="subpanel-heading">Patch — <strong>Final checklist</strong></div>
          <ul>
            <li>Lock in a patch label (e.g. <code>alpha‑v0.1.12</code>).</li>
            <li>Snapshot approved toggles for audit/history.</li>
            <li>Notify narrative, design, and QA about the new crafting feature.</li>
          </ul>
          <p>Press “Patch now” to see the fake loading overlay.</p>
        `
      }
    },
    sheet: {
      title: 'Spreadsheet: KPI sheet automation',
      hero: 'Spreadsheet preview — Q1‑Q4 summary',
      image: 'assets/dashboard_mock_2.png',
      preview: [
        { label: 'Formulas updated', badge: 'OK' },
        { label: 'Pending column validation', badge: 'Check' }
      ],
      tabs: {
        brainstorm: `
          <div class="subpanel-heading">Patch idea — <strong>KPI sheet</strong></div>
          <p>Automate quarterly totals and sanity‑check expense ranges.</p>
          <div class="toggle-row">
            <label for="t-sheet-qtr">Add quarterly total row?</label>
            <input id="t-sheet-qtr" type="checkbox" checked>
          </div>
          <div class="toggle-row">
            <label for="t-sheet-flags">Flag out‑of‑range expenses?</label>
            <input id="t-sheet-flags" type="checkbox" checked>
          </div>
          <div class="field-label">Request</div>
          <div>If you add this formula, you'll also need to edit the formula in row 37 due to shifting columns.</div>
        `,
        uat: `
          <div class="subpanel-heading">UAT — <strong>Test the patch</strong></div>
          <ul>
            <li>Change a single revenue value and confirm all totals update.</li>
            <li>Paste in out‑of‑range expenses and confirm they’re highlighted.</li>
            <li>Export to CSV and verify no formulas leak into the export.</li>
          </ul>
        `,
        review: `
          <div class="subpanel-heading">Review — <strong>Summary &amp; risks</strong></div>
          <ul>
            <li>Clarify which tabs are now formula‑driven vs manual.</li>
            <li>Ensure documentation reflects new “do not edit” columns.</li>
          </ul>
        `,
        patch: `
          <div class="subpanel-heading">Patch — <strong>Final checklist</strong></div>
          <ul>
            <li>Back up the original workbook.</li>
            <li>Apply formulas to a copy and run smoke tests.</li>
          </ul>
        `
      }
    },
    policy: {
      title: 'Policy: Safety SOP update',
      hero: 'Policy preview — Training & inspections',
      image: 'assets/dashboard_mock_policy.png',
      preview: [
        { label: 'Policy established', badge: 'OK' },
        { label: 'Training verified', badge: 'OK' },
        { label: 'Inspections updated', badge: 'OK' }
      ],
      tabs: {
        brainstorm: `
          <div class="subpanel-heading">Patch idea — <strong>Safety SOP</strong></div>
          <p>Add a two‑person rule for certain high‑risk tasks.</p>
          <ul>
            <li><span class="badge">OK</span> Training records reference “primary operator only”.</li>
            <li><span class="badge">Check</span> Shift‑handoff checklist assumes a single signature.</li>
          </ul>
        `,
        uat: `
          <div class="subpanel-heading">UAT — <strong>Test the patch</strong></div>
          <ul>
            <li>Walk through a mock shift change with two operators.</li>
            <li>Verify that inspection forms capture both signatures.</li>
          </ul>
        `,
        review: `
          <div class="subpanel-heading">Review — <strong>Summary &amp; risks</strong></div>
          <ul>
            <li>Clarify which roles the two‑person rule applies to.</li>
            <li>Highlight training updates and grace periods.</li>
          </ul>
        `,
        patch: `
          <div class="subpanel-heading">Patch — <strong>Final checklist</strong></div>
          <ul>
            <li>Insert a “two‑person rule” definition into the glossary.</li>
            <li>Update onboarding materials to reference the new procedure.</li>
          </ul>
        `
      }
    },
    pizza: {
      title: 'App: Pizza delivery tracking',
      hero: 'App preview — Order tracking',
      image: 'assets/dashboard_mock_pizza.png',
      preview: [
        { label: 'Order tracking enabled', badge: 'OK' },
        { label: 'Push notifications required', badge: 'Check' }
      ],
      tabs: {
        brainstorm: `
          <div class="subpanel-heading">Patch idea — <strong>Pizza app</strong></div>
          <p>Add order tracking and more honest ETA messaging.</p>
          <div class="toggle-row">
            <label for="t-pizza-track">Show order status timeline?</label>
            <input id="t-pizza-track" type="checkbox" checked>
          </div>
          <div class="field-label">Requested change</div>
          <div>Add a “rush delivery” option and tweak ETA messaging based on kitchen load.</div>
        `,
        uat: `
          <div class="subpanel-heading">UAT — <strong>Test the patch</strong></div>
          <ul>
            <li>Place a normal order and confirm ETA updates as it moves.</li>
            <li>Enable “rush” and confirm fees + messaging are correct.</li>
          </ul>
        `,
        review: `
          <div class="subpanel-heading">Review — <strong>Summary &amp; risks</strong></div>
          <ul>
            <li>Watch for customer confusion around ETA ranges.</li>
            <li>Verify analytics still capture conversion events.</li>
          </ul>
        `,
        patch: `
          <div class="subpanel-heading">Patch — <strong>Final checklist</strong></div>
          <ul>
            <li>Coordinate with operations on realistic ETA windows.</li>
            <li>Double‑check push notification copy with legal/brand.</li>
          </ul>
        `
      }
    },
    restaurant: {
      title: 'Site: Restaurant ordering flow',
      hero: 'Site preview — Golden Dragon',
      image: 'assets/dashboard_mock_restaurant.png',
      preview: [
        { label: 'Online ordering enabled', badge: 'OK' },
        { label: 'Reservations toggle off', badge: 'OK' }
      ],
      tabs: {
        brainstorm: `
          <div class="subpanel-heading">Patch idea — <strong>Restaurant site</strong></div>
          <p>Refine the online ordering experience.</p>
          <div class="toggle-row">
            <label for="t-rest-menu">Enable menu categories?</label>
            <input id="t-rest-menu" type="checkbox" checked>
          </div>
          <div class="toggle-row">
            <label for="t-rest-res">Accept reservations online?</label>
            <input id="t-rest-res" type="checkbox">
          </div>
          <span class="label">Update navigation to point to /seasonal-menu instead of /menu-2023.pdf</span>
        `,
        uat: `
          <div class="subpanel-heading">UAT — <strong>Test the patch</strong></div>
          <ul>
            <li>Place a to‑go order from mobile and desktop.</li>
            <li>Verify address + hours are visible in all flows.</li>
          </ul>
        `,
        review: `
          <div class="subpanel-heading">Review — <strong>Summary &amp; risks</strong></div>
          <ul>
            <li>Confirm delivery radius settings with the kitchen.</li>
            <li>Document where promos appear in the flow.</li>
          </ul>
        `,
        patch: `
          <div class="subpanel-heading">Patch — <strong>Final checklist</strong></div>
          <ul>
            <li>Sync menu data with POS before launch.</li>
            <li>Set up uptime monitoring for the ordering page.</li>
          </ul>
        `
      }
    },
    clipper: {
      title: 'Tool: Audio/video clipper',
      hero: 'Tool preview — Waveform editor',
      image: 'assets/dashboard_mock_clipper.png',
      preview: [
        { label: 'Social presets queued', badge: 'OK' },
        { label: 'Batch export planned', badge: 'Soon' }
      ],
      tabs: {
        brainstorm: `
          <div class="subpanel-heading">Patch idea — <strong>Clipper</strong></div>
          <p>Streamline how clips are exported for social media.</p>
          <span class="label">Queue batch export preset for “social vertical”.</span>
        `,
        uat: `
          <div class="subpanel-heading">UAT — <strong>Test the patch</strong></div>
          <ul>
            <li>Export a vertical clip and confirm safe frame.</li>
            <li>Render multiple clips in batch and confirm naming pattern.</li>
          </ul>
        `,
        review: `
          <div class="subpanel-heading">Review — <strong>Summary &amp; risks</strong></div>
          <ul>
            <li>Note GPU load and render time changes.</li>
            <li>Ensure presets don’t overwrite custom user templates.</li>
          </ul>
        `,
        patch: `
          <div class="subpanel-heading">Patch — <strong>Final checklist</strong></div>
          <ul>
            <li>Ship presets as non‑destructive additions.</li>
            <li>Collect feedback from editors after a week of use.</li>
          </ul>
        `
      }
    }
  };

  const tabsText = {
    brainstorm: 'Idea + suggestions + initial toggles.',
    uat: 'Draft UAT steps and test cases for this patch.',
    review: 'Summaries, risks, and change‑log drafts.',
    patch: 'Final confirmation before the patch pipeline runs.'
  };

  function renderScenario(scenarioKey, tabKey) {
    const scenario = scenarios[scenarioKey];
    const tab = tabKey || 'brainstorm';
    if (!scenario) return;

    panelTitleEl.textContent = scenario.title;
    panelSubtitleEl.textContent = tabsText[tab];
    previewTitleEl.textContent = `Preview — ${scenario.hero}`;
    previewImageEl.src = scenario.image;

    suggestionsBody.innerHTML = scenario.tabs[tab];

    previewStatusListEl.innerHTML = scenario.preview
      .map(item => `<li><span class="status-dot green"></span><span>${item.label}</span><span class="badge">${item.badge}</span></li>`)
      .join('');

    scenarioButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.scenario === scenarioKey);
    });
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
  }

  let currentScenario = 'rpg';
  let currentTab = 'brainstorm';
  renderScenario(currentScenario, currentTab);

  scenarioButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentScenario = btn.dataset.scenario;
      renderScenario(currentScenario, currentTab);
    });
  });

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTab = btn.dataset.tab;
      renderScenario(currentScenario, currentTab);
    });
  });

  // Patch overlay
  let patchTimer = null;

  function startFakePatch() {
    if (!patchOverlayEl) return;
    patchOverlayEl.classList.add('visible');
    patchOverlayEl.setAttribute('aria-hidden', 'false');
    let progress = 0;
    patchBarEl.style.width = '0%';
    patchPercentEl.textContent = '0% — Preparing changes…';
    if (patchTimer) window.clearInterval(patchTimer);

    patchTimer = window.setInterval(() => {
      progress += Math.random() * 14;
      if (progress >= 100) progress = 100;

      if (progress < 96) {
        patchPercentEl.textContent = `${Math.round(progress)}% — Mapping changes to patch steps…`;
      } else if (progress < 100) {
        patchPercentEl.textContent = '96% — Waiting for human confirmation…';
      } else {
        patchPercentEl.textContent = 'Complete — No real files were touched.';
        window.clearInterval(patchTimer);
      }
      patchBarEl.style.width = `${progress}%`;
    }, 420);
  }

  if (patchNowBtn) {
    patchNowBtn.addEventListener('click', startFakePatch);
  }
  if (closePatchBtn) {
    closePatchBtn.addEventListener('click', () => {
      patchOverlayEl.classList.remove('visible');
      patchOverlayEl.setAttribute('aria-hidden', 'true');
    });
  }
  if (keepWorkingBtn) {
    keepWorkingBtn.addEventListener('click', () => {
      panelSubtitleEl.textContent = 'Keep iterating — nothing is committed until you say so.';
    });
  }
}
