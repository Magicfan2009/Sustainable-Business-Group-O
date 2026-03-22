# Filing Cabinet Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a password-protected, pixel-art-inspired vector filing cabinet website that presents the VW Group sustainability advisory report across 6 navigable document files.

**Architecture:** A React single-page application with GSAP animations. Three screens — Password, Cabinet, Reading Mode — managed via top-level state. All content is stored as structured JSON data files, one per section. The cabinet and documents are rendered entirely in CSS with no image assets.

**Tech Stack:** React 18, Vite, GSAP, Courier Prime (Google Fonts), CSS custom properties, GitHub Pages (hosting)

---

## File Structure

```
sustainable-business-website/          ← new subfolder in the repo
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.ico
└── src/
    ├── main.jsx                       ← React entry point
    ├── App.jsx                        ← Top-level screen router (Password | Cabinet | Reading)
    ├── tokens.css                     ← All CSS custom properties (palette, shadows, typography)
    ├── global.css                     ← Reset, body, font import
    ├── screens/
    │   ├── PasswordScreen.jsx         ← Screen 1: password gate
    │   ├── PasswordScreen.css
    │   ├── CabinetScreen.jsx          ← Screen 2: filing cabinet + drawer + tabs
    │   ├── CabinetScreen.css
    │   ├── ReadingScreen.jsx          ← Screen 3: document reader with page nav
    │   └── ReadingScreen.css
    ├── components/
    │   ├── Cabinet.jsx                ← The cabinet object (drawer, handle, label plate)
    │   ├── Cabinet.css
    │   ├── FolderTab.jsx              ← Individual folder tab in drawer
    │   ├── FolderTab.css
    │   ├── Document.jsx               ← Paper document panel (header, content, paperclip)
    │   ├── Document.css
    │   ├── PageNav.jsx                ← Back button + page counter + arrows
    │   ├── PageNav.css
    │   ├── Paperclip.jsx              ← Pixel-art-style CSS/SVG paperclip
    │   └── Paperclip.css
    ├── content/
    │   ├── sec-01-overview.json
    │   ├── sec-02-carbon-accounting.json
    │   ├── sec-03-triple-bottom-line.json
    │   ├── sec-04-benchmarking.json
    │   ├── sec-05-strategy-2035.json
    │   └── sec-06-executive-summary.json
    └── hooks/
        └── useGSAP.js                 ← Thin wrapper for GSAP timeline cleanup
```

---

## Chunk 1: Project Scaffold & Design Tokens

### Task 1: Scaffold the Vite + React project

**Files:**
- Create: `sustainable-business-website/package.json`
- Create: `sustainable-business-website/vite.config.js`
- Create: `sustainable-business-website/index.html`
- Create: `sustainable-business-website/src/main.jsx`

- [ ] **Step 1: Create the project folder and initialise**

```bash
cd "C:/Users/chuka/OneDrive/Desktop/Imperial Intercalation/Sustainable Business"
npm create vite@latest sustainable-business-website -- --template react
cd sustainable-business-website
npm install
```

- [ ] **Step 2: Install GSAP**

```bash
npm install gsap
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server running at `http://localhost:5173`. Browser shows default Vite/React page.

- [ ] **Step 4: Commit**

```bash
git add sustainable-business-website/
git commit -m "feat: scaffold Vite React project"
```

---

### Task 2: Design tokens and global styles

**Files:**
- Create: `sustainable-business-website/src/tokens.css`
- Create: `sustainable-business-website/src/global.css`
- Modify: `sustainable-business-website/src/main.jsx`

- [ ] **Step 1: Write `tokens.css`**

```css
/* tokens.css — all design decisions live here, nowhere else */
:root {
  /* Palette */
  --color-bg: #0f0f0f;
  --color-cabinet: #1e3a3a;
  --color-cabinet-light: #254a4a;
  --color-cream: #f2ead8;
  --color-amber: #e8a020;
  --color-black: #000000;
  --color-text: #0f0f0f;
  --color-cream-muted: rgba(242, 234, 216, 0.6);

  /* Shadows — hard offset, no blur */
  --shadow-sm: 2px 2px 0 0 var(--color-black);
  --shadow-md: 4px 4px 0 0 var(--color-black);
  --shadow-lg: 6px 6px 0 0 var(--color-black);

  /* Borders */
  --border: 2px solid var(--color-black);
  --border-heavy: 3px solid var(--color-black);

  /* Typography */
  --font-mono: 'Courier Prime', 'Special Elite', monospace;
  --text-xs: 11px;
  --text-sm: 13px;
  --text-base: 15px;
  --text-lg: 18px;
  --text-xl: 24px;
  --text-2xl: 32px;
  --line-height: 1.7;

  /* Transitions — snappy, game-feel */
  --transition-snap: 80ms ease-out;
  --transition-fast: 150ms ease-out;
  --transition-med: 250ms cubic-bezier(0.34, 1.56, 0.64, 1); /* overshoot */
}
```

- [ ] **Step 2: Write `global.css`**

```css
/* global.css */
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');
@import './tokens.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  width: 100%;
  height: 100%;
  background: var(--color-bg);
  font-family: var(--font-mono);
  color: var(--color-cream);
  /* Do NOT set overflow: hidden here — each screen manages its own overflow */
  overflow: hidden; /* safe at root level; reading screen uses position:absolute with its own scroll context */
}

/* Reading screen scroll context — must be explicit height for overflow-y to work */
.reading-screen__page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 52px; /* height of PageNav */
  overflow-y: auto;
  padding: 28px 32px 16px;
}

/* Mobile fallback */
@media (max-width: 1023px) {
  body::after {
    content: 'THIS REPORT IS OPTIMISED FOR DESKTOP VIEWING.';
    position: fixed;
    inset: 0;
    background: var(--color-bg);
    color: var(--color-cream);
    font-family: var(--font-mono);
    font-size: var(--text-base);
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    z-index: 9999;
  }
  /* Hide everything else on mobile */
  #root > * { display: none; }
}
```

- [ ] **Step 3: Import both in `main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 4: Create minimal `App.jsx` placeholder**

```jsx
export default function App() {
  return <div style={{ color: 'var(--color-cream)', padding: '2rem' }}>Tokens loaded.</div>
}
```

- [ ] **Step 5: Verify in browser**

Expected: dark background, cream text "Tokens loaded." in Courier Prime.

- [ ] **Step 6: Commit**

```bash
git add sustainable-business-website/src/
git commit -m "feat: design tokens, global styles, font import"
```

---

## Chunk 2: Password Screen

### Task 3: Password screen component

**Files:**
- Create: `src/screens/PasswordScreen.jsx`
- Create: `src/screens/PasswordScreen.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: Write `PasswordScreen.css`**

```css
.password-screen {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: var(--color-bg);
}

.password-screen__label {
  font-size: var(--text-xs);
  letter-spacing: 0.2em;
  color: var(--color-amber);
  text-transform: uppercase;
}

.password-screen__title {
  font-size: var(--text-xl);
  color: var(--color-cream);
  text-align: center;
  font-weight: 700;
}

.password-screen__institution {
  font-size: var(--text-sm);
  color: var(--color-cream-muted);
}

.password-screen__input {
  background: var(--color-cabinet);
  border: var(--border);
  box-shadow: var(--shadow-sm);
  color: var(--color-cream);
  font-family: var(--font-mono);
  font-size: var(--text-base);
  padding: 12px 16px;
  width: 320px;
  outline: none;
  letter-spacing: 0.1em;
}

.password-screen__input::placeholder {
  color: var(--color-cream-muted);
}

.password-screen__input--shake {
  animation: shake 0.2s ease-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(6px); }
  75% { transform: translateX(-6px); }
}

.password-screen__btn {
  background: var(--color-cabinet);
  border: var(--border);
  box-shadow: var(--shadow-sm);
  color: var(--color-cream);
  font-family: var(--font-mono);
  font-size: var(--text-base);
  letter-spacing: 0.1em;
  padding: 10px 24px;
  cursor: pointer;
  transition: background var(--transition-snap), color var(--transition-snap), box-shadow var(--transition-snap);
  opacity: 0;
  pointer-events: none;
}

.password-screen__btn--visible {
  opacity: 1;
  pointer-events: all;
  transition: opacity 200ms ease, background var(--transition-snap), color var(--transition-snap);
}

.password-screen__btn:hover {
  background: var(--color-amber);
  color: var(--color-black);
  box-shadow: var(--shadow-md);
}

.password-screen__btn:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}
```

- [ ] **Step 2: Write `PasswordScreen.jsx`**

```jsx
import { useState, useRef } from 'react'
import './PasswordScreen.css'

const PASSWORD = 'PLACEHOLDER' // ← MUST be updated before deployment — agree with group first. Do not commit the real password.

export default function PasswordScreen({ onSuccess }) {
  const [value, setValue] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  function handleSubmit() {
    if (value === PASSWORD) {
      onSuccess()
    } else {
      setShake(true)
      setTimeout(() => {
        setShake(false)
        setValue('')
        inputRef.current?.focus()
      }, 300)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="password-screen">
      <span className="password-screen__label">Restricted Access</span>
      <h1 className="password-screen__title">VW Sustainability Advisory — Group O</h1>
      <p className="password-screen__institution">Imperial College London · 2026</p>
      <input
        ref={inputRef}
        className={`password-screen__input${shake ? ' password-screen__input--shake' : ''}`}
        type="password"
        placeholder="Enter access code"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKey}
        autoFocus
      />
      <button
        className={`password-screen__btn${value.length > 0 ? ' password-screen__btn--visible' : ''}`}
        onClick={handleSubmit}
      >
        ENTER →
      </button>
    </div>
  )
}
```

- [ ] **Step 3: Wire into `App.jsx` with fade transition**

```jsx
import { useState, useEffect, useRef } from 'react'
import PasswordScreen from './screens/PasswordScreen'
import CabinetScreen from './screens/CabinetScreen'

// Screen IDs
const SCREENS = { PASSWORD: 'password', CABINET: 'cabinet', READING: 'reading' }

export default function App() {
  const [screen, setScreen] = useState(SCREENS.PASSWORD)
  const [fadeOut, setFadeOut] = useState(false)
  const [fadeDuration, setFadeDuration] = useState(400)
  const [activeFile, setActiveFile] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false) // lifted so drawer stays open on back-navigation

  function handlePasswordSuccess() {
    // Fade to black (0.8s per spec) then show cabinet
    setFadeDuration(800)
    setFadeOut(true)
    setTimeout(() => {
      setScreen(SCREENS.CABINET)
      setFadeOut(false)
    }, 800)
  }

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      opacity: fadeOut ? 0 : 1,
      transition: `opacity ${fadeDuration}ms ease`
    }}>
      {screen === SCREENS.PASSWORD && (
        <PasswordScreen onSuccess={handlePasswordSuccess} />
      )}
      {screen === SCREENS.CABINET && (
        <div style={{ color: 'var(--color-cream)', padding: '2rem' }}>
          Cabinet screen — coming in Task 4.
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Test in browser**
  - Load page — should see password screen with amber "RESTRICTED ACCESS" label
  - Type anything — ENTER → button should fade in
  - Wrong password — input should shake and reset
  - Correct password (`groupO2026`) — page fades to black, then shows "Cabinet screen — coming in Task 4."

- [ ] **Step 5: Commit**

```bash
git add sustainable-business-website/src/
git commit -m "feat: password screen with shake animation and fade transition"
```

---

## Chunk 3: Cabinet Screen

### Task 4: Cabinet component

**Files:**
- Create: `src/components/Cabinet.jsx`
- Create: `src/components/Cabinet.css`
- Create: `src/components/FolderTab.jsx`
- Create: `src/components/FolderTab.css`

- [ ] **Step 1: Write `Cabinet.css`**

```css
.cabinet {
  position: relative;
  width: 360px;
  background: var(--color-cabinet);
  border: var(--border-heavy);
  box-shadow: var(--shadow-lg);
}

.cabinet__label-plate {
  background: var(--color-cream);
  border-bottom: var(--border);
  color: var(--color-black);
  font-size: var(--text-xs);
  letter-spacing: 0.15em;
  text-align: center;
  padding: 8px 12px;
  text-transform: uppercase;
}

.cabinet__drawer {
  position: relative;
  background: var(--color-cabinet-light);
  border-top: var(--border);
  height: 280px;
  overflow: hidden;
  transition: height var(--transition-med);
}

.cabinet__drawer--closed {
  height: 12px; /* slightly ajar */
}

.cabinet__drawer--open {
  height: 280px;
}

.cabinet__handle-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 36px;
  background: var(--color-cabinet);
  border-top: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
}

.cabinet__handle {
  width: 80px;
  height: 14px;
  background: var(--color-amber);
  border: var(--border);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-snap), transform var(--transition-snap);
}

.cabinet__handle-bar:hover .cabinet__handle {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.cabinet__handle-bar:active .cabinet__handle {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.cabinet__tabs-area {
  padding: 24px 20px 44px;
  display: flex;
  flex-direction: row;
  gap: 0;
  height: 100%;
  align-items: flex-end;
}
```

- [ ] **Step 2: Write `FolderTab.css`**

```css
.folder-tab {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 120px;
  min-width: 120px;
  height: 200px;
  background: var(--color-cream);
  border: var(--border);
  box-shadow: var(--shadow-sm);
  padding: 10px 8px;
  cursor: pointer;
  transition:
    transform var(--transition-snap),
    box-shadow var(--transition-snap),
    background var(--transition-snap);
  position: relative;
  margin-left: -28px; /* overlap tabs */
  z-index: var(--tab-z, 1);
}

.folder-tab:first-child {
  margin-left: 0;
}

.folder-tab:hover {
  background: var(--color-amber);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  z-index: 10;
}

.folder-tab:active {
  transform: translateY(-2px) translate(2px, 2px);
  box-shadow: var(--shadow-sm);
}

.folder-tab__code {
  font-size: var(--text-xs);
  color: var(--color-cabinet);
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

.folder-tab:hover .folder-tab__code {
  color: var(--color-black);
}

.folder-tab__title {
  font-size: var(--text-xs);
  color: var(--color-black);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1.4;
}

.folder-tab__notch {
  position: absolute;
  top: -8px;
  left: 10px;
  width: 40px;
  height: 8px;
  background: var(--color-cream);
  border: var(--border);
  border-bottom: none;
}

.folder-tab:hover .folder-tab__notch {
  background: var(--color-amber);
}
```

- [ ] **Step 3: Write `FolderTab.jsx`**

```jsx
import './FolderTab.css'

export default function FolderTab({ code, title, index, onClick }) {
  return (
    <div
      className="folder-tab"
      style={{ '--tab-z': index + 1 }}
      onClick={onClick}
    >
      <div className="folder-tab__notch" />
      <span className="folder-tab__code">{code}</span>
      <span className="folder-tab__title">{title}</span>
    </div>
  )
}
```

- [ ] **Step 4: Write `Cabinet.jsx`**

```jsx
import { useState } from 'react'
import FolderTab from './FolderTab'
import './Cabinet.css'

const SECTIONS = [
  { code: 'SEC-01', title: 'Overview' },
  { code: 'SEC-02', title: 'Carbon Accounting' },
  { code: 'SEC-03', title: 'Triple Bottom Line' },
  { code: 'SEC-04', title: 'Benchmarking' },
  { code: 'SEC-05', title: 'Strategy 2035' },
  { code: 'SEC-06', title: 'Executive Summary' },
]

export default function Cabinet({ onFileSelect, open, onToggle }) {
  // open and onToggle are lifted to App.jsx so drawer stays open after returning from reading mode

  return (
    <div className="cabinet">
      <div className="cabinet__label-plate">
        Group O · Sustainability Advisory · VW Group
      </div>
      <div className={`cabinet__drawer cabinet__drawer--${open ? 'open' : 'closed'}`}>
        <div className="cabinet__tabs-area">
          {open && SECTIONS.map((s, i) => (
            <FolderTab
              key={s.code}
              code={s.code}
              title={s.title}
              index={i}
              onClick={() => onFileSelect(s.code)}
            />
          ))}
        </div>
        <div className="cabinet__handle-bar" onClick={() => setOpen(o => !o)}>
          <div className="cabinet__handle" />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add sustainable-business-website/src/components/
git commit -m "feat: Cabinet and FolderTab components"
```

---

### Task 5: Cabinet screen layout

**Files:**
- Create: `src/screens/CabinetScreen.jsx`
- Create: `src/screens/CabinetScreen.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: Write `CabinetScreen.css`**

```css
.cabinet-screen {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  position: relative;
}

.cabinet-screen__footer {
  position: absolute;
  bottom: 24px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 32px;
}

.cabinet-screen__footer-link {
  font-size: var(--text-xs);
  color: var(--color-amber);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-snap);
}

.cabinet-screen__footer-link:hover {
  border-bottom-color: var(--color-amber);
}
```

- [ ] **Step 2: Write `CabinetScreen.jsx`**

```jsx
import Cabinet from '../components/Cabinet'
import './CabinetScreen.css'

export default function CabinetScreen({ onFileSelect, onAIDisclosure }) {
  return (
    <div className="cabinet-screen">
      <Cabinet onFileSelect={onFileSelect} />
      <footer className="cabinet-screen__footer">
        <span className="cabinet-screen__footer-link" onClick={onAIDisclosure}>
          AI Use Statement
        </span>
      </footer>
    </div>
  )
}
```

- [ ] **Step 3: Update `App.jsx` to use CabinetScreen**

```jsx
import { useState } from 'react'
import PasswordScreen from './screens/PasswordScreen'
import CabinetScreen from './screens/CabinetScreen'

const SCREENS = { PASSWORD: 'password', CABINET: 'cabinet', READING: 'reading', AI: 'ai' }

export default function App() {
  const [screen, setScreen] = useState(SCREENS.PASSWORD)
  const [fadeOut, setFadeOut] = useState(false)
  const [activeFile, setActiveFile] = useState(null)

  function transition(toScreen, payload = null) {
    setFadeOut(true)
    setTimeout(() => {
      if (payload) setActiveFile(payload)
      setScreen(toScreen)
      setFadeOut(false)
    }, 400)
  }

  function handlePasswordSuccess() {
    setFadeOut(true)
    setTimeout(() => {
      setScreen(SCREENS.CABINET)
      setFadeOut(false)
    }, 800)
  }

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.4s ease'
    }}>
      {screen === SCREENS.PASSWORD && (
        <PasswordScreen onSuccess={handlePasswordSuccess} />
      )}
      {screen === SCREENS.CABINET && (
        <CabinetScreen
          onFileSelect={code => transition(SCREENS.READING, code)}
          onAIDisclosure={() => transition(SCREENS.AI)}
          drawerOpen={drawerOpen}
          onDrawerToggle={() => setDrawerOpen(o => !o)}
        />
      )}
      {screen === SCREENS.READING && (
        <div style={{ color: 'var(--color-cream)', padding: '2rem' }}>
          Reading: {activeFile} — coming in Task 6.
        </div>
      )}
      {screen === SCREENS.AI && (
        <div style={{ color: 'var(--color-cream)', padding: '2rem' }}>
          AI Disclosure — coming in Task 8.
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Test in browser**
  - After password: dark screen with centred cabinet
  - Click handle: drawer opens, all 6 folder tabs visible
  - Hover tab: amber fill, lifts up
  - Click tab: transitions to "Reading: SEC-0X" placeholder
  - AI Use Statement link visible at bottom

- [ ] **Step 5: Commit**

```bash
git add sustainable-business-website/src/
git commit -m "feat: cabinet screen with drawer open/close and tab navigation"
```

---

## Chunk 4: Reading Mode

### Task 6: Paperclip and Document components

**Files:**
- Create: `src/components/Paperclip.jsx`
- Create: `src/components/Paperclip.css`
- Create: `src/components/Document.jsx`
- Create: `src/components/Document.css`

- [ ] **Step 1: Write `Paperclip.css`**

```css
/* Pixel-art style paperclip — pure CSS, no image assets */
.paperclip {
  position: absolute;
  top: -10px;
  left: 24px;
  width: 18px;
  height: 48px;
  z-index: 2;
}

.paperclip__outer {
  position: absolute;
  width: 18px;
  height: 48px;
  border: 3px solid var(--color-amber);
  border-radius: 0; /* square — pixel art */
}

.paperclip__inner {
  position: absolute;
  top: 8px;
  left: 4px;
  width: 10px;
  height: 32px;
  border: 3px solid var(--color-amber);
  border-top: none;
}
```

- [ ] **Step 2: Write `Paperclip.jsx`**

```jsx
import './Paperclip.css'

export default function Paperclip() {
  return (
    <div className="paperclip" aria-hidden="true">
      <div className="paperclip__outer" />
      <div className="paperclip__inner" />
    </div>
  )
}
```

- [ ] **Step 3: Write `Document.css`**

```css
.document {
  position: relative;
  background: var(--color-cream);
  border: var(--border-heavy);
  box-shadow: var(--shadow-lg);
  width: 680px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  color: var(--color-text);
}

.document__header {
  background: var(--color-cabinet);
  border-bottom: var(--border);
  padding: 12px 20px 12px 56px; /* left pad for paperclip */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.document__header-code {
  font-size: var(--text-xs);
  color: var(--color-amber);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.document__header-title {
  font-size: var(--text-sm);
  color: var(--color-cream);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.document__body {
  flex: 1;
  overflow: hidden;
  padding: 28px 32px;
  position: relative;
}

/* Content styles */
.document__body h2 {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid var(--color-black);
  padding-bottom: 6px;
}

.document__body h3 {
  font-size: var(--text-base);
  font-weight: 700;
  margin: 20px 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.document__body p {
  font-size: var(--text-base);
  line-height: var(--line-height);
  margin-bottom: 12px;
}

.document__body .highlight {
  background: var(--color-amber);
  padding: 0 2px;
}

.document__body table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: var(--text-sm);
}

.document__body th {
  background: var(--color-cabinet);
  color: var(--color-cream);
  border: var(--border);
  padding: 6px 10px;
  text-align: left;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: var(--text-xs);
}

.document__body td {
  border: var(--border);
  padding: 6px 10px;
  vertical-align: top;
}

.document__body .stat-block {
  display: inline-block;
  background: var(--color-cabinet);
  color: var(--color-cream);
  border: var(--border);
  box-shadow: var(--shadow-sm);
  padding: 8px 14px;
  margin: 4px 4px 4px 0;
}

.document__body .stat-block__value {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-amber);
  display: block;
}

.document__body .stat-block__label {
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.document__body .placeholder-video {
  width: 100%;
  aspect-ratio: 16/9;
  background: var(--color-cabinet);
  border: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-cream-muted);
  font-size: var(--text-sm);
  letter-spacing: 0.1em;
}
```

- [ ] **Step 4: Write `Document.jsx`**

```jsx
import Paperclip from './Paperclip'
import './Document.css'

export default function Document({ code, title, children }) {
  return (
    <div className="document">
      <Paperclip />
      <div className="document__header">
        <span className="document__header-code">{code}</span>
        <span className="document__header-title">{title}</span>
      </div>
      <div className="document__body">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add sustainable-business-website/src/components/
git commit -m "feat: Document and Paperclip components with content styles"
```

---

### Task 7: Page navigation component and Reading screen

**Files:**
- Create: `src/components/PageNav.jsx`
- Create: `src/components/PageNav.css`
- Create: `src/screens/ReadingScreen.jsx`
- Create: `src/screens/ReadingScreen.css`
- Create: `src/hooks/useGSAP.js`

- [ ] **Step 1: Write `PageNav.css`**

```css
.page-nav {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 52px;
  background: var(--color-cabinet);
  border-top: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 0 20px;
}

.page-nav__btn {
  background: var(--color-cabinet-light);
  border: var(--border);
  box-shadow: var(--shadow-sm);
  color: var(--color-cream);
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background var(--transition-snap), box-shadow var(--transition-snap), transform var(--transition-snap);
  user-select: none;
}

.page-nav__btn:hover {
  background: var(--color-amber);
  color: var(--color-black);
  box-shadow: var(--shadow-md);
}

.page-nav__btn:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.page-nav__btn--hidden {
  opacity: 0;
  pointer-events: none;
}

.page-nav__counter {
  font-size: var(--text-xs);
  color: var(--color-amber);
  letter-spacing: 0.15em;
  min-width: 48px;
  text-align: center;
}
```

- [ ] **Step 2: Write `PageNav.jsx`**

```jsx
import './PageNav.css'

export default function PageNav({ current, total, onPrev, onNext }) {
  return (
    <div className="page-nav">
      <button
        className={`page-nav__btn${current <= 1 ? ' page-nav__btn--hidden' : ''}`}
        onClick={onPrev}
        aria-label="Previous page"
      >
        ‹
      </button>
      <span className="page-nav__counter">{current} / {total}</span>
      <button
        className={`page-nav__btn${current >= total ? ' page-nav__btn--hidden' : ''}`}
        onClick={onNext}
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  )
}
```

- [ ] **Step 3: Write `useGSAP.js`**

```js
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Cleans up GSAP timeline on unmount
export function useGSAPTimeline() {
  const tl = useRef(null)
  useEffect(() => {
    return () => { tl.current?.kill() }
  }, [])
  return tl
}
```

- [ ] **Step 4: Write `ReadingScreen.css`**

```css
.reading-screen {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reading-screen__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 15, 15, 0.85);
}

.reading-screen__back {
  position: absolute;
  top: 24px;
  left: 24px;
  background: var(--color-cabinet);
  border: var(--border);
  box-shadow: var(--shadow-sm);
  color: var(--color-cream);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: 0.1em;
  padding: 8px 16px;
  cursor: pointer;
  z-index: 10;
  transition: background var(--transition-snap), color var(--transition-snap), box-shadow var(--transition-snap);
}

.reading-screen__back:hover {
  background: var(--color-amber);
  color: var(--color-black);
  box-shadow: var(--shadow-md);
}

.reading-screen__back:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.reading-screen__document-wrapper {
  position: relative;
  z-index: 5;
}

.reading-screen__page {
  position: absolute;
  inset: 0;
  padding: 28px 32px 60px;
  overflow-y: auto;
}

.reading-screen__page--hidden {
  display: none;
}
```

- [ ] **Step 5: Write `ReadingScreen.jsx`**

```jsx
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import Document from '../components/Document'
import PageNav from '../components/PageNav'
import { useGSAPTimeline } from '../hooks/useGSAP'
import './ReadingScreen.css'

// Placeholder content — replaced in Task 9
const PLACEHOLDER_PAGES = [
  <p key="1">Page 1 content — will be replaced with real content in Task 9.</p>,
  <p key="2">Page 2 content.</p>,
  <p key="3">Page 3 content.</p>,
]

const SECTION_META = {
  'SEC-01': { code: 'SEC-01', title: 'Overview', pages: PLACEHOLDER_PAGES },
  'SEC-02': { code: 'SEC-02', title: 'Carbon Accounting', pages: PLACEHOLDER_PAGES },
  'SEC-03': { code: 'SEC-03', title: 'Triple Bottom Line', pages: PLACEHOLDER_PAGES },
  'SEC-04': { code: 'SEC-04', title: 'Benchmarking', pages: PLACEHOLDER_PAGES },
  'SEC-05': { code: 'SEC-05', title: 'Strategy 2035', pages: PLACEHOLDER_PAGES },
  'SEC-06': { code: 'SEC-06', title: 'Executive Summary', pages: PLACEHOLDER_PAGES },
}

export default function ReadingScreen({ fileCode, onBack }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [animating, setAnimating] = useState(false)
  const docRef = useRef(null)
  const tl = useGSAPTimeline()

  const section = SECTION_META[fileCode] || SECTION_META['SEC-01']
  const totalPages = section.pages.length

  // Entry animation
  useEffect(() => {
    if (!docRef.current) return
    gsap.fromTo(docRef.current,
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35,
        ease: 'back.out(1.4)' }
    )
  }, [])

  function changePage(direction) {
    if (animating) return
    const next = currentPage + direction
    if (next < 1 || next > totalPages) return

    setAnimating(true)
    const el = docRef.current

    // Lift up
    gsap.to(el, {
      y: -8, scale: 1.01, duration: 0.12,
      onComplete: () => {
        // Slide back into stack — reset scale here to avoid it persisting into the rise
        gsap.to(el, {
          y: 20, opacity: 0, scale: 1, duration: 0.18,
          onComplete: () => {
            setCurrentPage(next)
            // Rise from behind
            gsap.fromTo(el,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, scale: 1, duration: 0.22,
                ease: 'back.out(1.2)',
                onComplete: () => setAnimating(false)
              }
            )
          }
        })
      }
    })
  }

  function handleBack() {
    if (!docRef.current) { onBack(); return }
    gsap.to(docRef.current, {
      y: 140, opacity: 0, duration: 0.3,
      onComplete: onBack
    })
  }

  return (
    <div className="reading-screen">
      <div className="reading-screen__backdrop" />
      <button className="reading-screen__back" onClick={handleBack}>
        ← BACK
      </button>
      <div className="reading-screen__document-wrapper" ref={docRef}>
        <Document code={section.code} title={section.title}>
          <div className="reading-screen__page">
            {section.pages[currentPage - 1]}
          </div>
          <PageNav
            current={currentPage}
            total={totalPages}
            onPrev={() => changePage(-1)}
            onNext={() => changePage(1)}
          />
        </Document>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Wire ReadingScreen into `App.jsx`**

Add import and replace the placeholder reading div:

```jsx
import ReadingScreen from './screens/ReadingScreen'

// In JSX:
{screen === SCREENS.READING && (
  <ReadingScreen
    fileCode={activeFile}
    onBack={() => setScreen(SCREENS.CABINET)}
  />
)}
```

- [ ] **Step 7: Test in browser**
  - Password → cabinet → click a folder tab → document slides up
  - Document shows header, paperclip, placeholder content, page counter
  - Page arrows work, transition animates correctly
  - ← BACK returns to cabinet

- [ ] **Step 8: Commit**

```bash
git add sustainable-business-website/src/
git commit -m "feat: reading screen with page transitions and GSAP animations"
```

---

## Chunk 5: Content & AI Page

### Task 8: AI Disclosure screen

**Files:**
- Create: `src/screens/AIScreen.jsx`
- Create: `src/screens/AIScreen.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: Write `AIScreen.css`**

```css
.ai-screen {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  position: relative;
}

.ai-screen__back {
  position: absolute;
  top: 24px;
  left: 24px;
  background: var(--color-cabinet);
  border: var(--border);
  box-shadow: var(--shadow-sm);
  color: var(--color-cream);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: 0.1em;
  padding: 8px 16px;
  cursor: pointer;
  transition: background var(--transition-snap), color var(--transition-snap);
}

.ai-screen__back:hover {
  background: var(--color-amber);
  color: var(--color-black);
}
```

- [ ] **Step 2: Write `AIScreen.jsx`**

```jsx
import Document from '../components/Document'
import './AIScreen.css'

export default function AIScreen({ onBack }) {
  return (
    <div className="ai-screen">
      <button className="ai-screen__back" onClick={onBack}>← BACK</button>
      <Document code="AI-01" title="AI Use Statement">
        <div style={{ padding: '28px 32px', overflowY: 'auto', maxHeight: '60vh' }}>
          <h2>AI Use Statement</h2>
          <p>
            We acknowledge the use of <strong>Claude Sonnet 4.6</strong> (Anthropic,{' '}
            <span style={{ color: 'var(--color-cabinet)' }}>claude.ai</span>) to assist
            with research synthesis, content structuring, and drafting sections of this
            sustainability analysis.
          </p>
          <p>
            All data was verified against primary sources including the VW Group
            Sustainability Report 2024, the CDP database, and the SBTi Registry.
            The analytical conclusions, recommendations, and judgements presented
            in this report are our own.
          </p>
          <h3>Tools Used</h3>
          <p><strong>[PLACEHOLDER — list all AI tools used by the group]</strong></p>
          <h3>How AI Was Used</h3>
          <p><strong>[PLACEHOLDER — complete before submission]</strong></p>
        </div>
      </Document>
    </div>
  )
}
```

- [ ] **Step 3: Wire into `App.jsx`**

```jsx
import AIScreen from './screens/AIScreen'

// In JSX:
{screen === SCREENS.AI && (
  <AIScreen onBack={() => setScreen(SCREENS.CABINET)} />
)}
```

- [ ] **Step 4: Commit**

```bash
git add sustainable-business-website/src/
git commit -m "feat: AI disclosure screen with placeholder content"
```

---

### Task 9: Wire real content into sections

**Files:**
- Create: `src/content/sections.jsx` — all 6 sections as React JSX content arrays

- [ ] **Step 1: Confirm `content_extracted.md` exists with final reviewed content**

This file lives at the project root. It was generated by scraping the Base44 site. Before wiring content, confirm all sections are complete and reviewed against the style guide. If content is still being written, complete that first — Task 9 is purely a wiring task, not a content-writing task.

- [ ] **Step 2: Create `sections.jsx` with real content from `content_extracted.md`**

Each section is an array of JSX pages. Example structure:

```jsx
// src/content/sections.jsx
export const SECTIONS = {
  'SEC-01': {
    code: 'SEC-01',
    title: 'Overview',
    pages: [
      // Page 1
      <>
        <h2>From Value Destroyer to Value Creator</h2>
        <p>The 2015 "Dieselgate" emissions scandal marked a fundamental turning point
        for Volkswagen. What began as a failure in the Compliance phase of the
        Dunphy et al. (2003) Waves of Sustainability model catalysed a structural
        transformation into VW's current 3rd Wave: Transformation stage.</p>
        <p>The "regenerate+" strategy aims to reinterpret VW not merely as a car
        manufacturer, but as an integral part of society — the hallmark of a
        Sustaining Corporation.</p>
        <h3>VW's Four Sustainability Dimensions</h3>
        <table>
          <thead><tr><th>Dimension</th><th>Focus</th></tr></thead>
          <tbody>
            <tr><td>Nature</td><td>Planetary boundaries, climate targets, circular economy</td></tr>
            <tr><td>People</td><td>Human rights, supply chain due diligence, labour standards</td></tr>
            <tr><td>Society</td><td>Community engagement, trust rebuilding, governance</td></tr>
            <tr><td>Business</td><td>Sustainable profitability, green finance, EV transition</td></tr>
          </tbody>
        </table>
      </>,
      // Page 2 — Dunphy Waves
      <>
        <h2>Dunphy et al. (2003) — Waves of Sustainability</h2>
        {/* ... */}
      </>,
      // Add remaining pages following the same pattern
      // Reference: content_extracted.md for all text and data
    ]
  },
  'SEC-02': { /* Carbon Accounting — port from content_extracted.md */ },
  'SEC-03': { /* Triple Bottom Line */ },
  'SEC-04': { /* Benchmarking */ },
  'SEC-05': { /* Strategy 2035 */ },
  'SEC-06': { /* Executive Summary + video placeholder */ },
}
```

- [ ] **Step 2: Replace SECTION_META in `ReadingScreen.jsx`**

```jsx
import { SECTIONS } from '../content/sections'
// Remove the SECTION_META and PLACEHOLDER_PAGES constants
// Replace with:
const section = SECTIONS[fileCode] || SECTIONS['SEC-01']
```

- [ ] **Step 4: Add video to SEC-06 — dedicated page, no shared text content**

Per the spec, the video must occupy its own page entry in the SEC-06 pages array with no other text content on that page.

```jsx
// SEC-06 pages array — video must be its own entry, nothing else on this page:
<>
  {/* If video URL is available: */}
  <video
    controls
    style={{ width: '100%', border: 'var(--border)', display: 'block' }}
    src="[INSERT VIDEO URL]"
  />
  {/* If video not yet recorded, use placeholder: */}
  {/* <div className="placeholder-video">[ VIDEO — to be embedded before submission ]</div> */}
</>
```

- [ ] **Step 4: Verify all 6 sections navigate correctly with real content**

- [ ] **Step 5: Commit**

```bash
git add sustainable-business-website/src/content/
git commit -m "feat: wire real content into all 6 sections"
```

---

## Chunk 6: Build & Deploy

### Task 10: Configure build and deploy to GitHub Pages

**Files:**
- Modify: `sustainable-business-website/vite.config.js`
- Modify: `sustainable-business-website/package.json`

- [ ] **Step 1: Update `vite.config.js` for GitHub Pages**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: base must exactly match the GitHub repo name (case-sensitive)
  // Confirm at: https://github.com/Magicfan2009/Sustainable-Business-Group-O
  base: '/Sustainable-Business-Group-O/',
})
```

- [ ] **Step 2: Add deploy script to `package.json`**

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}
```

- [ ] **Step 3: Install gh-pages**

```bash
npm install --save-dev gh-pages
```

- [ ] **Step 4: Build and verify locally**

```bash
npm run build
npm run preview
```

Expected: site runs at `http://localhost:4173/Sustainable-Business-Group-O/`

- [ ] **Step 5: Enable GitHub Pages in repository settings (manual — one time)**

Go to: https://github.com/Magicfan2009/Sustainable-Business-Group-O/settings/pages
Set Source: Deploy from branch → Branch: `gh-pages` → folder: `/ (root)` → Save.

- [ ] **Step 6: Deploy to GitHub Pages**

```bash
npm run deploy
```

Expected: site live at `https://magicfan2009.github.io/Sustainable-Business-Group-O/`

- [ ] **Step 6: Test live site**
  - Password screen loads
  - Password works
  - All 6 sections open and navigate
  - AI disclosure page accessible
  - Test in incognito to confirm password is required

- [ ] **Step 7: Final commit**

```bash
git add .
git commit -m "feat: production build and GitHub Pages deployment"
git push origin main
```

---

## Pre-Submission Checklist

- [ ] Update password in `PasswordScreen.jsx` — agree with group first
- [ ] Complete AI disclosure content in `AIScreen.jsx`
- [ ] Add video embed URL to SEC-06 once recorded
- [ ] Complete progress-against-targets table in SEC-01
- [ ] Add dedicated S&W critique section to SEC-04
- [ ] Test site in incognito — confirm password gate works
- [ ] Test on at least two different browsers (Chrome + Safari/Firefox)
- [ ] Confirm site URL and password ready to email Dr Robey by 16:00 Monday 23rd March
