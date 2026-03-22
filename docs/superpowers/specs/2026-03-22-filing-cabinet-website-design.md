# Design Spec: VW Sustainability Advisory Website
**Group O | Imperial College London | Sustainable Business 2026**
**Date:** 2026-03-22
**Status:** Approved

---

## Overview

A password-protected, skeuomorphic filing cabinet website presenting the Volkswagen Group sustainability advisory report. The experience simulates handling a physical consultancy report — a steel filing cabinet, real document files, paper texture, and page-by-page reading — while remaining clean, premium, and digestible within 30 minutes.

The audience is Dr Robey and, within the fiction of the assignment, the Volkswagen Board of Management. Every design decision prioritises clarity, authority, and ease of navigation over decoration.

---

## Visual Identity

### Colour Palette
| Role | Colour | Hex |
|------|--------|-----|
| Page background | Dark charcoal | `#1a1a1a` |
| Cabinet body | Matte steel grey | `#2e2e2e` |
| Handles & accents | Silver | `#8a8a8a` |
| Paper | Off-white | `#f0ede8` |
| Folder tabs | Manila | `#d4b896` |
| Dimmed background (reading mode) | Cabinet view at 20% opacity | — |
| Highlight marks | Semi-transparent yellow | `rgba(255, 235, 0, 0.35)` |

### Typography
- **Font:** Courier Prime (body and headings) — Google Fonts, free
- **Fallback:** Special Elite, then `monospace`
- **Usage:** All text across all screens — password page, cabinet labels, document content, navigation elements
- No mixing of font families anywhere on the site

### Design Principles
- No gradients
- No colour outside the defined palette
- No rounded corners
- No decorative elements beyond the paper/cabinet materials themselves
- Sharp, considered, quiet — premium consultancy aesthetic

---

## Screen 1 — Password

### Layout
Full-screen dark charcoal background. All elements centred vertically and horizontally.

### Elements (top to bottom)
1. **Label** — All-caps, silver, small tracking: `RESTRICTED ACCESS`
2. **Report title** — Typewriter font, off-white: `VW Sustainability Advisory — Group O`
3. **Institution line** — Smaller, silver: `Imperial College London · 2026`
4. **Input box** — Steel grey background, silver border, typewriter font, placeholder: `Enter access code`
5. **Button** — Appears via fade-in as soon as the user begins typing: `ENTER →` — silver text, no fill, silver border

### Behaviour
- Incorrect password: input box shakes subtly, placeholder resets
- Correct password: slow fade to black (0.8s), then fade up to the cabinet screen (0.6s)
- No error messages that reveal anything about the password format

---

## Screen 2 — The Cabinet

### Layout
A matte steel filing cabinet, front-facing, centred on the dark charcoal background. Rendered in CSS — no image assets required.

### Initial State
- Drawer is slightly ajar by default (~15px gap) — a passive invitation to interact
- Cabinet label plate above the drawer: `GROUP O · SUSTAINABILITY ADVISORY · VW GROUP`

### Drawer Interaction
- Clicking the drawer handle triggers a smooth slide-open animation (300ms ease-out)
- Inside the drawer: six folder tabs visible, staggered at 28px horizontal intervals, no rotation, labels left-aligned — all readable simultaneously

### Folder Tabs
Tabs are manila-coloured with steel grey typewriter text. Labels:
1. `SEC-01 · Overview`
2. `SEC-02 · Carbon Accounting`
3. `SEC-03 · Triple Bottom Line`
4. `SEC-04 · Benchmarking`
5. `SEC-05 · Strategy 2035`
6. `SEC-06 · Executive Summary`

### Hover State
- Hovered tab lifts 4px upward with a subtle drop shadow — indicates it is selectable
- Cursor changes to pointer

### Selection
- Clicking a tab triggers the file pull-out animation — the selected file rises from the drawer and transitions to reading mode

---

## Screen 3 — Reading Mode

### Background
The cabinet view remains visible but dimmed to 20% opacity behind the document. This preserves spatial context — the user always knows where they are.

### Document Entry Animation
The file slides upward from the drawer, decelerates, and settles centred on screen — as if placed on a desk (400ms ease-out).

### Document Appearance
- Off-white paper (`#f0ede8`) with a subtle SVG grain texture overlay
- Slight drop shadow to lift the paper off the dimmed background
- A CSS-rendered paperclip graphic anchored to the top-left corner
- Section reference and title at the top in typewriter font: e.g. `SEC-02 · Carbon Accounting`
- Content below: text, data tables, charts — all styled as a printed report

### Content Styling Within Documents
- **Body text:** Courier Prime, dark charcoal, ~15px, comfortable line-height (1.7)
- **Pull quotes:** Rendered with a semi-transparent yellow highlight mark behind the text, as if hand-highlighted
- **Data tables:** Clean, minimal — silver borders, no background fills
- **Charts:** Monochrome or limited to the palette — no colour charts
- **Pull tabs:** On the right edge of the document, small manila tabs for jumping between subsections within the current file
- **Video block (SEC-06 only):** Video rendered inline within the paper boundary, full paper width, no rounded corners. Minimal browser-native controls accepted as-is. The video occupies its own dedicated page within the file and does not share a page with text content.

### Navigation Elements
- **Top-left:** `← Back` in silver typewriter text — returns the file to the drawer, reverses the entry animation
- **Bottom-right:** Page counter — `3 / 6` in small silver typewriter text
- **Bottom-centre:** Left arrow `‹` and right arrow `›` for page navigation
  - On page 1: only `›` visible
  - On last page: only `‹` visible
  - All other pages: both visible

### Page Transition Animation (Option D)
1. Current page lifts slightly (translateY -8px, slight scale increase, shadow deepens) — 150ms
2. Current page slides back and down into the stack — 200ms
3. Next page rises from behind and settles into reading position — 250ms

Total transition: ~600ms. Fast enough to feel responsive, slow enough to communicate physicality. If Back is activated before the entry animation completes, the animation is interrupted immediately and the exit animation plays from the current position.

### Exit (Back to Cabinet)
- Document slides back down into the drawer
- Cabinet view fades back to full opacity
- Drawer remains open, tabs visible — user can select another file

---

## Section Map — Files to Content

| File | Pages | Key Content |
|------|-------|-------------|
| SEC-01 · Overview | ~4 | Company intro, Dunphy Waves, Doughnut Economics, business case drivers, sustainability dimensions |
| SEC-02 · Carbon Accounting | ~4 | Scope 1/2/3 data, SBTi targets, decarbonisation hierarchy, GHG Protocol formula |
| SEC-03 · Triple Bottom Line | ~4 | People/Planet/Profit pillars, materiality map, trust rebuilding, double materiality |
| SEC-04 · Benchmarking | ~5 | Competitor matrix, compliance clock, transparency index, strategic archetypes, risk table |
| SEC-05 · Strategy 2035 | ~5 | R1–R4 recommendations, 2025–2035 roadmap |
| SEC-06 · Executive Summary | ~3 | Key findings, 5 board priorities, frameworks applied, video |

---

## Additional Required Pages

### AI Disclosure Page
Accessible via a small text link at the bottom of the cabinet screen (e.g. `AI Use Statement` in small silver text). Opens with a plain fade-in (300ms) — no slide-up animation, no dimmed cabinet background. Full charcoal background behind the paper. Same paper aesthetic (off-white, grain texture, paperclip, typewriter font) as reading mode. Must contain the formal AI statement per the assignment brief.

### Viewport & Responsive Behaviour
The site is desktop-first with a minimum effective width of 1024px. On viewports narrower than 1024px, display a centred message on the charcoal background in typewriter font: `This report is optimised for desktop viewing.` No attempt at responsive layout — this is a consultancy document intended for office, home, or airline lounge desktop review.

### Password Delivery
Submit URL + password to Dr Robey and the Hub. Password to be agreed by the group.

---

## What Is Deliberately Excluded

- No top navigation bar
- No footer
- No sidebar
- No loading spinners (beyond the password fade transition)
- No colour outside the defined palette
- No font mixing
- No decorative imagery or stock photos

---

## Technical Stack (Recommended)

| Layer | Tool | Reason |
|-------|------|--------|
| Framework | React | Component state for drawer/document open-close |
| Animation | GSAP | Timeline-based control of all transitions |
| Styling | CSS custom properties | Paper texture, grain, shadows — no image assets |
| Paper grain | SVG `feTurbulence` filter | Authentic texture without file weight |
| Font | Google Fonts — Courier Prime | Free, reliable, correct aesthetic |
| Hosting | GitHub Pages or Vercel | Free, fast, connects directly to the repo |
| Password | Simple client-side check | Sufficient for assignment purposes |

---

## Open Questions for the Group

1. What is the password?
2. Who is recording the 2-minute executive summary video (required for SEC-06)?
3. Who is writing the AI use document (1,000–2,000 words)?
4. Is the content being ported from the Base44 site or rewritten to the style guide?
