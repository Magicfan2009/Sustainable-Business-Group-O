# Design Spec: VW Sustainability Advisory Website
**Group O | Imperial College London | Sustainable Business 2026**
**Date:** 2026-03-22
**Status:** Approved — v2 (aesthetic direction updated)

---

## Overview

A password-protected website presenting the Volkswagen Group sustainability advisory report through a pixel-art-inspired vector filing cabinet UI. The experience draws on retro game inventory and management sim aesthetics — clean, stylised, geometric — while remaining professional and digestible within 30 minutes.

The visual language is **neobrutalist / pixel-art-inspired vector**: flat colours, thick black outlines, hard offset shadows (no blur), sharp corners, a tight restrained palette. Think noir management game — dark, moody, authoritative, with real visual personality. Not photorealistic, not corporate flat. Something in between that feels considered and distinctive.

The audience is Dr Robey and, within the fiction of the assignment, the Volkswagen Board of Management. Every design decision prioritises clarity, authority, and ease of navigation over decoration.

---

## Visual Identity

### Aesthetic Reference
- **Style:** Pixel-art-inspired vector — smooth vectors rendered with the visual grammar of pixel art (chunky shapes, flat fills, visible structure)
- **Closest references:** PostHog UI, Gumroad, neobrutalism.dev — thick outlines, hard offset shadows, no gradients, no softness
- **Game feel:** Noir management sim / RPG inventory screen — dark palette, amber accent, deliberate and slightly dramatic

### Colour Palette (4 colours maximum)
| Role | Colour | Hex |
|------|--------|-----|
| Background | Near-black | `#0f0f0f` |
| Cabinet & UI panels | Dark teal / slate | `#1e3a3a` |
| Folder tabs & paper | Cream / off-white | `#f2ead8` |
| Accent (handles, highlights, hover) | Amber | `#e8a020` |
| Outlines (all elements) | Pure black | `#000000` |
| Dimmed background (reading mode) | Background at 15% opacity overlay | — |

### Typography
- **Font:** Courier Prime — Google Fonts, free. Typewriter feel, works at all sizes.
- **Fallback:** Special Elite, then `monospace`
- **Usage:** All text across all screens — password page, cabinet labels, folder tabs, document content, navigation
- No font mixing anywhere on the site

### Design Principles
- **Thick black outlines on all elements** — 2–3px minimum, heavier on major UI objects like the cabinet
- **Hard offset shadows — no blur** — e.g. `box-shadow: 4px 4px 0 0 #000`. The shadow reads as a physical offset, not a glow
- **No gradients** — flat fills only
- **No rounded corners** — everything is square-edged
- **No colour outside the defined 4-colour palette**
- **Pixel-art-inspired proportions** — chunky, deliberate, slightly oversized UI elements. Nothing delicate.
- Snappy, deliberate animations — game-feel, not easing curves

---

## Screen 1 — Password

### Layout
Full-screen near-black (`#0f0f0f`) background. All elements centred vertically and horizontally.

### Elements (top to bottom)
1. **Label** — All-caps, amber, small letter-spacing, Courier Prime: `RESTRICTED ACCESS`
2. **Report title** — Courier Prime, cream, larger: `VW Sustainability Advisory — Group O`
3. **Institution line** — Smaller, cream at 60% opacity: `Imperial College London · 2026`
4. **Input box** — Dark teal background, 2px black outline, 3px 3px hard black offset shadow, cream text, Courier Prime placeholder: `Enter access code`
5. **Button** — Fades in as soon as typing begins: `ENTER →` — cream text, dark teal fill, 2px black outline, hard offset shadow. On hover: amber fill, black text.

### Behaviour
- Incorrect password: input box shifts 6px right then snaps back (game-style shake), 2 cycles, 200ms total
- Correct password: slow fade to black (0.8s), then fade up to the cabinet screen (0.6s)
- No error messages that reveal anything about the password format

---

## Screen 2 — The Cabinet

### Layout
A pixel-art-inspired vector filing cabinet, front-facing, centred on the near-black background. Rendered entirely in CSS — no image assets. The cabinet is the hero of the page.

### Cabinet Visual Style
- **Body:** Dark teal rectangle, 3px black outline, hard offset shadow (6px 6px 0 0 #000)
- **Drawer:** Slightly lighter teal panel within the body, 2px black outline
- **Handle:** Amber rectangle, centred on the drawer face, 2px black outline
- **Label plate:** Cream panel above the drawer with black text: `GROUP O · SUSTAINABILITY ADVISORY · VW GROUP`
- **Proportions:** Chunky and deliberate — the cabinet should feel like a game asset, not a realistic object

### Initial State
- Drawer is slightly ajar by default (~12px gap with a dark interior visible) — a passive invitation to interact
- A small amber blinking cursor indicator near the handle signals interactivity (optional — remove if it feels excessive)

### Drawer Interaction
- Clicking the handle triggers a snappy slide-open animation (250ms, slight overshoot easing — game feel)
- Interior of the drawer: dark background with six folder tabs visible, staggered at 28px horizontal intervals, no rotation, labels left-aligned

### Folder Tabs
- Each tab: cream fill, 2px black outline, 2px 2px hard black offset shadow
- Text: Courier Prime, dark teal, all-caps
- Labels:
  1. `SEC-01 · OVERVIEW`
  2. `SEC-02 · CARBON ACCOUNTING`
  3. `SEC-03 · TRIPLE BOTTOM LINE`
  4. `SEC-04 · BENCHMARKING`
  5. `SEC-05 · STRATEGY 2035`
  6. `SEC-06 · EXECUTIVE SUMMARY`

### Hover State
- Hovered tab: amber fill replaces cream, black text, offset shadow increases to 4px — snappy 80ms transition
- Cursor changes to pointer

### Selection
- Clicking a tab: tab pushes down 2px (pressed state, 80ms), then file rises from the drawer into reading mode

---

## Screen 3 — Reading Mode

### Background
Cabinet view remains visible but darkened with a near-black overlay at 85% opacity. The cabinet is still recognisable but the document commands full attention.

### Document Entry Animation
File rises from the drawer, snappy deceleration, settles centred on screen (350ms, slight overshoot). Feels like pulling a card from a game inventory.

### Document Appearance
- **Body:** Cream (`#f2ead8`) rectangle, 3px black outline, 6px 6px hard black offset shadow
- **No paper grain texture** — flat cream fill consistent with the pixel-art-inspired vector aesthetic
- **Header bar:** Dark teal strip across the top of the document, cream Courier Prime text: `SEC-02 · CARBON ACCOUNTING`
- **A pixel-art-style paperclip** rendered in CSS/SVG anchored to the top-left corner — amber and black, geometric, chunky
- Content below the header: text, tables, charts — all styled within the cream panel

### Content Styling Within Documents
- **Body text:** Courier Prime, near-black (`#0f0f0f`), 15px, line-height 1.7
- **Pull quotes:** Amber background bar behind the text — flat, no opacity. Looks like a game tooltip or highlighted item description.
- **Data tables:** 2px black outlines on all cells, dark teal header row with cream text, no background fills on body rows
- **Charts:** Flat fills using the 4-colour palette only — no colour outside palette, no gradients
- **Section dividers:** 2px black horizontal rule
- **Pull tabs:** Right edge of the document — small amber rectangles with black Courier Prime text, 2px black outline. Jump to subsections within the current file.
- **Video block (SEC-06 only):** Video rendered inline, full document width, 2px black outline. Minimal browser-native controls. Occupies its own dedicated page — does not share a page with text content.

### Navigation Elements
- **Top-left:** `← BACK` — cream text on dark teal button, 2px black outline, hard shadow. Returns file to drawer, reverses entry animation.
- **Bottom-right:** Page counter — `3 / 6` in small amber Courier Prime text
- **Bottom-centre:** `‹` and `›` arrows — dark teal buttons, cream text, 2px black outline, hard shadow
  - Page 1: only `›` visible
  - Last page: only `‹` visible
  - All other pages: both visible
  - Hover state: amber fill, black text

### Page Transition Animation
1. Current page lifts slightly (translateY -6px, shadow increases) — 120ms
2. Current page slides back and down into the stack — 180ms
3. Next page rises from behind and snaps into reading position — 220ms

Total: ~520ms. Game-feel — snappy but legible. If Back is activated mid-animation, the animation interrupts immediately and the exit animation plays from the current position.

### Exit (Back to Cabinet)
- Document snaps back down into the drawer (reverse of entry)
- Cabinet overlay fades — cabinet returns to full visibility
- Drawer remains open, tabs visible

---

## Section Map — Files to Content

| File | Pages | Key Content |
|------|-------|-------------|
| SEC-01 · Overview | ~4 | Company intro, Dunphy Waves, Doughnut Economics, business case drivers |
| SEC-02 · Carbon Accounting | ~4 | Scope 1/2/3 data, SBTi targets, decarbonisation hierarchy |
| SEC-03 · Triple Bottom Line | ~4 | People/Planet/Profit pillars, materiality map, trust rebuilding |
| SEC-04 · Benchmarking | ~5 | Competitor matrix, S&W critique, compliance clock, transparency index |
| SEC-05 · Strategy 2035 | ~5 | R1–R4 recommendations, 2025–2035 roadmap |
| SEC-06 · Executive Summary | ~3 | Key findings, 5 board priorities, video (placeholder until recorded) |

---

## Additional Required Pages

### AI Disclosure Page
Accessible via a small amber text link at the very bottom of the cabinet screen: `AI USE STATEMENT`. Opens with a plain fade-in (300ms) — no drawer animation, no cabinet overlay. Full near-black background behind the document panel. Same document aesthetic (cream panel, dark teal header, black outline, hard shadow). Must contain the formal AI statement per the assignment brief.

### Viewport & Responsive Behaviour
Desktop-first, minimum effective width 1024px. On narrower viewports display a centred message on the near-black background in Courier Prime, cream text:

> `THIS REPORT IS OPTIMISED FOR DESKTOP VIEWING.`

No attempt at responsive layout.

### Password Delivery
Submit URL + password to Dr Robey and the Hub by 16:00 Monday 23rd March 2026. Password to be agreed by the group.

---

## What Is Deliberately Excluded

- No top navigation bar
- No footer
- No sidebar
- No gradients anywhere
- No rounded corners anywhere
- No colour outside the 4-colour palette
- No font mixing
- No decorative imagery or stock photos
- No paper grain texture (inconsistent with vector aesthetic)
- No easing curves that feel "smooth" — animations should feel snappy and game-like

---

## Technical Stack (Recommended)

| Layer | Tool | Reason |
|-------|------|--------|
| Framework | React | Component state for drawer/document interactions |
| Animation | GSAP | Timeline control, overshoot easing, interrupt handling |
| Styling | CSS custom properties | 4-colour palette as tokens, hard shadow utility classes |
| Font | Google Fonts — Courier Prime | Free, correct aesthetic |
| Hosting | GitHub Pages or Vercel | Free, connects directly to the repo |
| Password | Simple client-side check | Sufficient for assignment purposes |

---

## Open Questions for the Group

1. What is the password?
2. Who is recording the 2-minute executive summary video (SEC-06)?
3. Who is writing the AI use document (1,000–2,000 words)?
4. Is the Base44 content being rewritten to the style guide, or ported as-is?
