# Design Spec: Room Navigation + Interactive Charts
**Date:** 2026-03-23
**Project:** Group O Sustainable Business — VW Advisory Website
**Status:** Approved for implementation

---

## Overview

Extend the existing filing cabinet screen into a three-room looping environment. The user pans horizontally between rooms using arrow buttons. Each room contains a themed physical object in the same pseudo-pixel isometric CSS style as the cabinet.

**Room order (looping):**
```
Cabinet → Tablet → Monitor → (back to Cabinet)
```

---

## 1. Navigation System

### State Architecture

`App.jsx` gains a new `room` state: `'cabinet' | 'tablet' | 'monitor'`. Default: `'cabinet'`.

The existing `screen` state (`'cabinet' | 'reading' | 'ai' | 'password'`) is renamed to `'cabinet'` → `'rooms'` to avoid collision. Specifically: the `SCREENS.CABINET` value changes to `'rooms'` so that `screen === 'rooms'` means "show the room environment" (cabinet, tablet, or monitor). All existing references to `SCREENS.CABINET` update accordingly. `goBack()` and `closeAI()` return to `screen = 'rooms'`. The `room` state determines which room within the rooms environment is shown.

### Transition: Smooth Parallax Slide (GSAP)

When the user clicks a pan arrow:

1. Arrow buttons are immediately disabled (ref flag, not state, to avoid re-render).
2. A GSAP timeline runs:
   - **Exit:** current room's scene element translates from `x: 0` to `x: ±120vw`, duration 550ms, ease `power2.inOut`.
   - **Background:** a fixed dark background div translates in the same direction at 0.4× the room's travel distance. The room travels `±120vw`; the background travels `±48vw` (0.4 × 120vw). Duration 550ms, same ease. This background div is a `position: fixed; inset: 0; background: #0f0f0f; z-index: -1` element that always exists in App.jsx. It must NOT create a stacking context (no `transform` on the element itself — translate via GSAP `x` only).
   - **Entrance:** new room's scene starts at `x: ∓120vw`, translates to `x: 0`, duration 500ms, ease `back.out(1.15)`, begins 50ms after exit starts (slight overlap for snappiness).
3. On timeline complete: re-enable arrows, update `room` state.
4. The existing CSS opacity fade system in `App.jsx` is NOT used for room transitions. It remains only for transitions between `screen` values (e.g. opening the reading overlay).
5. **SCREENS constant migration:** `SCREENS.CABINET` currently has the string value `'cabinet'`. This value must change to `'rooms'`. Audit App.jsx for any hardcoded `'cabinet'` string literals in `setScreen()` calls (not via the constant) and replace them. The `room` state then uses `'cabinet'` as its own value independently.
6. **Stacking context:** The rooms environment wrapper (`<div>` containing all three room scenes) must have `position: relative; isolation: isolate` so that the reading overlay at `z-index: 10` correctly stacks above entering room scenes at `z-index: 2`. Room scenes must not apply `transform` on the wrapper itself — only GSAP animates their `x` via inline transform.

### Arrow Buttons — `PanArrow.jsx`

**Props:** `direction: 'left' | 'right'`, `onClick: fn`, `disabled: bool`

**Appearance:** 32×32px dark square (`#1a1a1a`), 2px solid `#333` border, hard shadow `2px 2px 0 #000`. Amber `‹` or `›` glyph, 18px, centred. On `disabled`: opacity 0.3, cursor not-allowed. On hover (not disabled): border-color `#e8a020`, glyph color `#e8a020`.

**Positioning:** Absolutely positioned left/right of the scene wrapper, vertically centred (`top: 50%; transform: translateY(-50%)`). On mobile (<700px): min touch target 44px, arrows shrink to 28px visual but have 44px padding.

**Arrow directions per room:**
- Cabinet: left → Monitor, right → Tablet
- Tablet: left → Cabinet, right → Monitor
- Monitor: left → Tablet, right → Cabinet

---

## 2. Cabinet Room (existing + additions)

No structural changes to drawers, nametag, or handles. Add:
- Left `PanArrow` (→ Monitor)
- Right `PanArrow` (→ Tablet)
- Existing bottom links remain unchanged

---

## 3. Tablet Room — `TabletScreen.jsx`

### Visual Design

A realistic iPad rendered in pseudo-pixel isometric CSS — same three-face skew technique as the cabinet (see `CabinetScreen.css` for reference pattern: front face flat, top face `skewX(-40deg) scaleY(0.6)`, right face `skewY(-50deg) scaleX(0.65)`).

**Approximate front face dimensions:** 260px wide × 340px tall.
**Bezel:** 12px all sides, `#1a1a1a`, with amber 1px inner border.
**Screen area:** remaining interior, `#080c10` (dark blue-black tint).
**Home button:** 10px circle, `#2a2a2a`, centred below screen, 8px below bezel.
**Camera dot:** 5px circle, `#2a2a2a`, top-centre of bezel.
**Top face depth:** ~20px parallelogram.
**Right face depth:** ~18px parallelogram, `#111`.
**Hard shadow:** `8px 8px 0 #000` on the cabinet-iso wrapper.
**Floating nametag:** "CHARTS & FIGURES" — same `.cabinet-nametag` animation class as cabinet.

### Tablet Home Screen (shown on tablet's screen area)

6 section tiles arranged in a 2×3 grid. Each tile: SEC code + label, dark background (`#0d1117`), amber left border, cream text. Clicking a tile opens that section's chart view.

SEC-06 tile label changes to "EXEC SUMMARY" and, when clicked, triggers the room-level pan transition to the Monitor room. The `TabletScreen` receives an `onPanToMonitor` prop (a function passed from App.jsx) which fires the GSAP pan transition identically to clicking the right pan arrow from Monitor's left neighbour. This keeps transition logic in App.jsx and avoids TabletScreen needing to know about GSAP.

### Chart View

When a tile is clicked (SEC-01 through SEC-05):
- GSAP: home screen translates `y: -100%` (300ms, `power2.in`), chart view translates from `y: 100%` to `y: 0` (350ms, `back.out(1.1)`), starts 50ms after home begins exiting.
- A `← BACK` button top-left returns to home screen (reverse animation: chart slides down, home slides in from above).
- Section code + title shown in a small header bar (same style as reading doc header).
- Sub-chart pagination (SEC-02, SEC-04 only): `TabletScreen` owns a `subPage` state (0 or 1). The `‹ ›` arrows at the chart view bottom increment/decrement `subPage`. The chart area swaps the rendered chart component based on `subPage` — no animation between sub-charts, just an instant swap (keeps complexity low). The `1 / 2` indicator updates accordingly.
- Chart components receive their data inline as constants (no props from sections.jsx — chart data is self-contained in each chart component file).

---

## 4. Monitor Room — `MonitorScreen.jsx`

### Visual Design

A CRT-style monitor on a stand, pseudo-pixel isometric CSS.

**Front face:** ~320px wide × 240px tall. Bezel: 16px, `#1a1a1a`. Screen area: `#050508` with CSS scanline texture: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)`.
**Stand neck:** 6px wide × 24px tall, `#222`, centred below monitor.
**Stand base:** 80px wide × 8px tall, `#1a1a1a`, hard shadow.
**Top face + right face:** same skew technique, thinner than cabinet (~16px depth).
**Power LED:** 4px circle, `#4ade80` (green), bottom-right of bezel, CSS pulse animation.
**Floating nametag:** "EXECUTIVE BRIEFING".

### Monitor Screen Content

A `<video>` element fills the screen area (object-fit: fill to match the monitor dimensions exactly, no letterbox). `controls` attribute hidden — replaced by a custom amber `▶` / `⏸` overlay button centred on screen. Clicking anywhere on screen toggles play/pause.

**Initial state on pan-in:** Monitor always starts paused. If video src is set, show poster frame (first frame) with amber `▶` overlay. If no src, show placeholder.

**Placeholder state** (no video src): amber dashed border around screen area, centred text `[ VIDEO PENDING ]` in amber monospace, slow amber border pulse animation.

**Video dimensions:** the `<video>` element matches the monitor screen area exactly (~288px × 208px at 1× scale). The monitor scene is scaled up as needed for legibility.

---

## 5. Interactive Charts

All charts: vanilla JS + CSS only. GSAP for entrance animations. No canvas, no external libraries.

### SEC-01 — Dunphy Wave Timeline

**Component:** `DunphyTimeline.jsx`
**Layout:** Horizontal timeline. Three circular nodes connected by a line. Labels below each node.
**Data:**
- Node 1: "Rejection" / Pre-1990s
- Node 2: "Compliance" / 1990–2015 / ⚠ Dieselgate 2015
- Node 3: "Transformation" / 2016–Present ← "YOU ARE HERE" pulsing amber marker
**Interaction:** Click any node → tooltip card expands below with description text. One open at a time.
**Animation:** Nodes fade + scale in sequentially on mount (GSAP stagger).

---

### SEC-02a — Scope Emissions Donut

**Component:** `ScopeDonut.jsx`
**Layout:** CSS conic-gradient donut + legend.
**Data:** Scope 1 (3.3Mt, green), Scope 2 (4.2Mt, amber), Scope 3 (688Mt, red — ~98% of ring).
**Interaction:** Hover segment label → highlight segment (brightness) + show Mt value tooltip.
**Animation:** Donut draws in clockwise on mount via CSS animation on `conic-gradient` using a clip trick.

---

### SEC-02b — Net Zero Projection

**Component:** `NetZeroProjection.jsx`
**Layout:** SVG line chart, 100% wide, fixed height 180px.
**Data:**
- Historical (cream line): 2019: 750Mt, 2021: 680Mt, 2023: 720Mt, 2024: 695Mt
- VW trajectory (amber line): 2024→2050 gradual decline to ~50Mt
- Business-as-usual (red dashed): flat/slight decline
- SBTi target (amber dashed): steeper decline line
**Axes:** Year (x), Mt CO₂e (y). Simple tick marks, no full grid.
**Interaction:** SVG `<circle>` hit targets on each data point — hover shows year + value tooltip.
**Animation:** Lines draw in left-to-right via SVG `stroke-dashoffset` on mount.

---

### SEC-03 — TBL Scorecard

**Component:** `TBLScorecard.jsx`
**Layout:** Three columns: People / Planet / Profit. Each column has 2–3 metric rows with a progress bar.
**Data:**
- People: S-Rating Coverage 72% (amber), Cobalt Traceability 88% (green), Workers Retrained 35k / 50k target (amber)
- Planet: Scope 1 Reduction 25% of 50% target (amber), Circular Materials 12% of 40% target (red), Zero Impact Factory 3/10 sites (amber)
- Profit: Green Bonds €15B / €20B target (green), EV Market Share Europe #1 (green), Compliance Margin 0g (red)
**Interaction:** Hover any row → tooltip with detail text.
**Animation:** Progress bars animate from 0 to target width on mount.
**Colours:** Green ≥70%, Amber 40–69%, Red <40%.

---

### SEC-04a — Competitor Radar

**Component:** `CompetitorRadar.jsx`
**Layout:** SVG pentagon radar chart. 5 axes: SBTi Alignment, Assurance Level, Circularity, EU Compliance, Net Zero Ambition. Scores 0–5.
**Data:**
| Company | SBTi | Assurance | Circularity | Compliance | Ambition |
|---|---|---|---|---|---|
| VW | 4 | 5 | 4 | 3 | 4 |
| Mercedes | 5 | 3 | 4 | 4 | 5 |
| Stellantis | 3 | 2 | 4 | 4 | 5 |
| Toyota | 3 | 2 | 3 | 2 | 3 |
**Interaction:** Click company name in legend to toggle polygon on/off. VW always shown. Hover polygon → show score breakdown.
**Colours:** VW amber, Mercedes blue-grey, Stellantis teal, Toyota red-muted. All semi-transparent fills.

---

### SEC-04b — Net Zero Timeline

**Component:** `NetZeroTimeline.jsx`
**Layout:** Horizontal SVG timeline, 2024 left → 2060 right. TODAY marker at 2026.
**Data:** Stellantis 2038, Mercedes 2039, VW 2050, Toyota 2050.
**Interaction:** Hover company marker → card appears above with Net Zero year, strategy name, key caveat (e.g. Stellantis: "⚠ Dare Forward scaled back 2024").
**Animation:** Markers drop in from above with GSAP stagger on mount.

---

### SEC-05 — Strategic Roadmap

**Component:** `StrategicRoadmap.jsx`
**Layout:** Horizontal timeline, 6 year nodes: 2025, 2026, 2027, 2028, 2030, 2035.
**Data:** Milestones per year from sections.jsx SEC-05 page 5.
**Interaction:** Click year node → milestone list expands below. Active node turns amber. Collapse on second click.
**Animation:** Node entrance stagger on mount. Expand/collapse via GSAP height tween.

---

## 6. Content Changes (sections.jsx)

- Remove all `.pen-red`, `.pen-blue`, `.pen-green`, `.margin-note`, `.margin-note--red`, `.margin-note--green` spans. These are CSS-only removes (delete the span wrappers, keep inner text).
- Keep `.mark-red` for genuinely critical figures only (0g compliance margin, 688Mt Scope 3, Dieselgate references).
- Remove all other `.mark-*` highlight classes except `.mark-red`.
- Add ~1,500 words of analytical prose distributed as follows:
  - SEC-01 page 1: +200 words — expand the Dieselgate → transformation narrative
  - SEC-02 page 2: +300 words — deeper Scope 3 analysis, Category 11 significance
  - SEC-03 page 4: +200 words — expand Edelman Trust / Dieselgate governance response
  - SEC-04 pages 2–4: +400 words — expand qualitative Brand DNA and conflict analysis
  - SEC-05 pages 2–3: +300 words — expand R1/R2 strategic rationale
- Tone: authoritative, analytical, third-person, no filler. Consistent with existing style guide.

---

## 7. CSS Annotation Classes Cleanup

Remove from `ReadingScreen.css` (CSS-only, no structural change to ReadingScreen.jsx):
- `.pen-red`, `.pen-blue`, `.pen-green`
- `.margin-note`, `.margin-note--red`, `.margin-note--green`
- `.circle-red`, `.circle-green`
- `.flag`
- `.mark-yellow`, `.mark-green`, `.mark-blue`

Keep: `.mark-red`, `.pull-quote` (unchanged).

---

## 8. Responsive Behaviour

The room environment is designed for desktop (≥1024px). On mobile:
- The same cabinet scale transforms applied in the existing mobile CSS apply to all three rooms.
- Pan arrows remain visible and tappable.
- Tablet and monitor scenes scale to `0.65×` on ≤700px, `0.5×` on ≤420px via `transform: scale()` on the scene wrapper (same pattern as existing cabinet mobile CSS).
- Chart components use `width: 100%` and `min-height` so they reflow within the scaled scene.

---

## 9. Z-Index & Layering

During room pan transitions, two room scenes are simultaneously visible. Z-index stack:
- Background div: `z-index: -1`
- Exiting room scene: `z-index: 1`
- Entering room scene: `z-index: 2` (renders on top during overlap)
- Reading overlay (when open): `z-index: 10` — room transitions are disabled while `screen !== 'rooms'`.

---

## 10. File Structure

**New files:**
```
src/screens/TabletScreen.jsx
src/screens/TabletScreen.css
src/screens/MonitorScreen.jsx
src/screens/MonitorScreen.css
src/components/PanArrow.jsx
src/components/PanArrow.css
src/components/charts/DunphyTimeline.jsx
src/components/charts/ScopeDonut.jsx
src/components/charts/NetZeroProjection.jsx
src/components/charts/TBLScorecard.jsx
src/components/charts/CompetitorRadar.jsx
src/components/charts/NetZeroTimeline.jsx
src/components/charts/StrategicRoadmap.jsx
src/components/charts/charts.css   (shared chart styles)
```

**Modified files:**
```
src/App.jsx                        (room state, SCREENS.CABINET → SCREENS.ROOMS)
src/data/sections.jsx              (content expansion + annotation cleanup)
src/screens/CabinetScreen.jsx      (add PanArrow left/right)
src/screens/CabinetScreen.css      (arrow positioning)
src/screens/ReadingScreen.css      (remove annotation CSS classes)
```

---

## 11. Out of Scope

- Password screen changes
- ReadingScreen JSX structural changes
- Deep-link from reading doc to tablet chart (deferred)
- Real video file upload (placeholder only)
- Any backend / Supabase
- External chart libraries (Recharts, Chart.js, D3)
