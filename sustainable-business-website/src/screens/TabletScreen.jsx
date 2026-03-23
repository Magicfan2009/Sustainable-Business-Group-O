import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import PanArrow from '../components/PanArrow'
import DunphyTimeline from '../components/charts/DunphyTimeline'
import ScopeDonut from '../components/charts/ScopeDonut'
import NetZeroProjection from '../components/charts/NetZeroProjection'
import TBLScorecard from '../components/charts/TBLScorecard'
import CompetitorRadar from '../components/charts/CompetitorRadar'
import NetZeroTimeline from '../components/charts/NetZeroTimeline'
import StrategicRoadmap from '../components/charts/StrategicRoadmap'
import './TabletScreen.css'

const SECTIONS = [
  {
    code: 'SEC-01', label: 'Overview',
    gradient: 'linear-gradient(135deg, #1a3a5c 0%, #2d6a9f 100%)',
    fold: '#0f2340',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <rect x="6" y="4" width="22" height="28" rx="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
        <line x1="10" y1="12" x2="24" y2="12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="10" y1="17" x2="24" y2="17" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="10" y1="22" x2="18" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M28 4 L34 10 L28 10 Z" fill="rgba(255,255,255,0.3)"/>
        <path d="M28 4 L28 10 L34 10" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    code: 'SEC-02', label: 'Carbon',
    gradient: 'linear-gradient(135deg, #1a4a2a 0%, #2d8f4e 100%)',
    fold: '#0f2d1a',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <circle cx="20" cy="20" r="13" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
        <path d="M20 7 A13 13 0 0 1 33 20" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M20 7 A13 13 0 1 0 33 20" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <text x="20" y="24" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="monospace">CO₂</text>
      </svg>
    ),
  },
  {
    code: 'SEC-03', label: 'TBL',
    gradient: 'linear-gradient(135deg, #3a1a4a 0%, #7a3d9f 100%)',
    fold: '#240f30',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <rect x="5" y="24" width="8" height="12" rx="1" fill="#4ade80" opacity="0.9"/>
        <rect x="16" y="16" width="8" height="20" rx="1" fill="#e8a020" opacity="0.9"/>
        <rect x="27" y="8" width="8" height="28" rx="1" fill="#6699bb" opacity="0.9"/>
        <line x1="4" y1="36" x2="36" y2="36" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    code: 'SEC-04', label: 'Benchmarking',
    gradient: 'linear-gradient(135deg, #4a2a1a 0%, #9f5a2d 100%)',
    fold: '#2d1a0f',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <polygon points="20,6 28,15 24,27 16,27 12,15" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <polygon points="20,6 28,15 24,27 16,27 12,15" fill="rgba(232,160,32,0.25)" strokeWidth="0"/>
        <polygon points="20,10 25,17 22,24 18,24 15,17" fill="rgba(232,160,32,0.5)" strokeWidth="0"/>
        <line x1="20" y1="6" x2="20" y2="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        <line x1="28" y1="15" x2="32" y2="13" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        <line x1="24" y1="27" x2="26" y2="31" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        <line x1="16" y1="27" x2="14" y2="31" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        <line x1="12" y1="15" x2="8" y2="13" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    code: 'SEC-05', label: 'Strategy 2035',
    gradient: 'linear-gradient(135deg, #1a2a4a 0%, #2d4a8f 100%)',
    fold: '#0f1a2d',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <line x1="6" y1="28" x2="34" y2="28" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <circle cx="6"  cy="28" r="3" fill="#444" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
        <circle cx="15" cy="20" r="3" fill="#444" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
        <circle cx="24" cy="14" r="3" fill="#444" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
        <circle cx="34" cy="8"  r="3" fill="#e8a020" stroke="#e8a020" strokeWidth="1.5"/>
        <polyline points="6,28 15,20 24,14 34,8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
        <line x1="34" y1="8" x2="34" y2="28" stroke="rgba(232,160,32,0.4)" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    code: 'SEC-06', label: 'Exec Summary',
    gradient: 'linear-gradient(135deg, #3a1a1a 0%, #8f2d2d 100%)',
    fold: '#2d0f0f',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <polygon points="20,5 23,14 33,14 25,20 28,30 20,24 12,30 15,20 7,14 17,14" fill="rgba(232,160,32,0.8)" stroke="rgba(232,160,32,1)" strokeWidth="1"/>
      </svg>
    ),
  },
]

// Sections that should stay in portrait (not rotate to landscape)
const PORTRAIT_ONLY = new Set(['SEC-03'])

export default function TabletScreen({ onPanLeft, onPanRight, onPanToMonitor, panning }) {
  const [activeSection, setActiveSection] = useState(null)
  const [subPage, setSubPage] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  // Go landscape only when a section is open AND it's not portrait-only
  const isLandscape = activeSection && !PORTRAIT_ONLY.has(activeSection)

  function openSection(code) {
    if (code === 'SEC-06') { onPanToMonitor(); return }
    setSubPage(0)
    setActiveSection(code)
  }

  function closeSection() {
    setActiveSection(null)
  }

  function exitZoom() {
    setZoomed(false)
    setActiveSection(null)
  }

  return (
    <div className="tablet-screen" style={{ position: 'relative' }}>
      {!zoomed && <PanArrow direction="left" onClick={onPanLeft} panning={panning} />}
      {!zoomed && <PanArrow direction="right" onClick={onPanRight} panning={panning} />}

      {/* ── Mini room view: decorative SVG tablet prop ── */}
      {!zoomed && (
        <motion.div
          onClick={() => setZoomed(true)}
          whileHover={{ scale: 1.04, y: -4 }}
          whileTap={{ scale: 0.97 }}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
        >
          <TabletSVG />
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700,
            letterSpacing: '0.18em', color: 'rgba(0,30,80,0.7)',
            textTransform: 'uppercase',
          }}>
            CHARTS &amp; FIGURES
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: 'rgba(0,102,204,0.8)', letterSpacing: '0.1em',
          }}>
            tap to open →
          </div>
        </motion.div>
      )}

      {/* ── Zoomed full-screen overlay ── */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            key="zoomed"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 8,
              background: 'var(--color-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {/* Back button — always top-left */}
            <button
              onClick={activeSection ? closeSection : exitZoom}
              style={{
                position: 'absolute', top: '16px', left: '16px', zIndex: 10,
                fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-amber)',
                background: '#ffffff', border: '1px solid #ccc', padding: '6px 12px',
                cursor: 'pointer', letterSpacing: '0.1em',
              }}
            >
              ← {activeSection ? 'HOME' : 'BACK'}
            </button>

            {/* Tablet shell — animates between portrait and landscape */}
            <motion.div
              animate={isLandscape ? {
                width:  'min(92vh, 96vw)',
                height: 'min(64vh, 68vw)',
                borderRadius: '20px',
              } : {
                width:  'min(420px, 88vw)',
                height: 'min(640px, 86vh)',
                borderRadius: '28px',
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              style={{
                background: '#d0d5de',
                border: '2px solid #9aa0aa',
                boxShadow: '0 0 0 1px #b0b8c4, 0 32px 80px rgba(0,30,80,0.25)',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              {/* Camera — top-centre in portrait, left-centre in landscape */}
              <motion.div
                animate={isLandscape ? {
                  top: '50%', left: '14px',
                  translateX: '0%', translateY: '-50%',
                } : {
                  top: '14px', left: '50%',
                  translateX: '-50%', translateY: '0%',
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: '#8a9099', border: '1px solid #6a7080',
                  position: 'absolute', zIndex: 3,
                }}
              />

              {/* Amber bezel ring */}
              <div style={{
                position: 'absolute', inset: '6px',
                borderRadius: '16px',
                border: '1px solid rgba(0,102,204,0.3)',
                pointerEvents: 'none', zIndex: 2,
              }} />

              {/* Screen — inset adjusts for orientation */}
              <motion.div
                animate={isLandscape ? {
                  top: '14px', left: '36px', right: '62px', bottom: '14px',
                } : {
                  top: '34px', left: '14px', right: '14px', bottom: '68px',
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                style={{
                  position: 'absolute',
                  background: '#f5f7fa',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <AnimatePresence mode="wait">
                  {!activeSection ? (
                    <motion.div
                      key="home"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      style={{ height: '100%' }}
                    >
                      <TabletHome sections={SECTIONS} onOpen={openSection} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.15 }}
                      style={{ height: '100%' }}
                    >
                      <TabletChartView
                        code={activeSection}
                        onBack={closeSection}
                        subPage={subPage}
                        onSubPageChange={setSubPage}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Home button — bottom-centre portrait / right-centre landscape */}
              <motion.div
                animate={isLandscape ? {
                  top: '50%', right: '10px', left: 'auto', bottom: 'auto',
                  translateX: '0%', translateY: '-50%',
                } : {
                  bottom: '12px', left: '50%', top: 'auto', right: 'auto',
                  translateX: '-50%', translateY: '0%',
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                style={{
                  position: 'absolute',
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: '#b8bec8', border: '2px solid #8a90a0',
                  boxShadow: 'inset 0 1px 3px rgba(0,30,80,0.2)',
                  zIndex: 3,
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Decorative SVG tablet illustration (mini room prop) ── */
function TabletSVG() {
  return (
    <svg
      viewBox="0 0 220 300"
      width="260"
      height="355"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <rect x="2" y="2" width="216" height="296" rx="22" fill="#c8cdd8" stroke="#9aa0aa" strokeWidth="2"/>
      {/* Blue bezel ring */}
      <rect x="8" y="8" width="204" height="284" rx="18" fill="none" stroke="rgba(0,102,204,0.3)" strokeWidth="1"/>
      {/* Screen area — lit up */}
      <rect x="16" y="40" width="188" height="212" rx="6" fill="url(#screenBg)"/>
      {/* Screen glow border */}
      <rect x="16" y="40" width="188" height="212" rx="6" fill="none" stroke="rgba(120,180,255,0.2)" strokeWidth="1"/>
      {/* Faint screen content — decorative grid of icons */}
      {[0,1,2].map(col => [0,1].map(row => (
        <rect
          key={`${col}-${row}`}
          x={36 + col * 60} y={64 + row * 72}
          width="38" height="38" rx="9"
          fill={['rgba(45,106,159,0.5)','rgba(45,143,78,0.5)','rgba(122,61,159,0.5)','rgba(159,90,45,0.5)','rgba(45,74,143,0.5)','rgba(143,45,45,0.5)'][col + row * 3]}
        />
      )))}
      {/* Gloss sheen on screen */}
      <rect x="16" y="40" width="188" height="80" rx="6" fill="url(#screenGloss)"/>
      {/* Camera dot */}
      <circle cx="110" cy="22" r="5" fill="#1e1e1e" stroke="#3a3a3a" strokeWidth="1"/>
      <circle cx="110" cy="22" r="2" fill="#0a0a0a"/>
      {/* Home button */}
      <circle cx="110" cy="274" r="14" fill="#1a1a1a" stroke="#3a3a3a" strokeWidth="1.5"/>
      <circle cx="110" cy="274" r="10" fill="none" stroke="#444" strokeWidth="1"/>
      {/* Side buttons */}
      <rect x="216" y="70" width="4" height="28" rx="2" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>
      <rect x="0" y="80" width="4" height="20" rx="2" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>
      <rect x="0" y="108" width="4" height="20" rx="2" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>
      <defs>
        <linearGradient id="screenBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8eef5"/>
          <stop offset="100%" stopColor="#d0dae8"/>
        </linearGradient>
        <linearGradient id="screenGloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.07)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function AppIcon({ section, onOpen, zoomed, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20, delay: index * 0.06 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
    >
      <motion.button
        onClick={() => onOpen && onOpen(section.code)}
        whileHover={zoomed ? { scale: 1.12, y: -4 } : {}}
        whileTap={zoomed ? { scale: 0.92 } : {}}
        style={{
          width: '68px', height: '68px',
          borderRadius: '22%',
          background: section.gradient,
          border: 'none',
          cursor: zoomed ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
          padding: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gloss sheen */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)',
          borderRadius: '22% 22% 0 0',
          pointerEvents: 'none',
        }} />
        {section.icon}
      </motion.button>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#001e50',
        textAlign: 'center', maxWidth: '76px',
        lineHeight: '1.3',
        letterSpacing: '0.04em',
      }}>
        {section.label}
      </span>
    </motion.div>
  )
}

function TabletHome({ sections, onOpen, zoomed }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px', padding: '20px 16px',
      height: '100%', boxSizing: 'border-box',
      alignContent: 'start',
    }}>
      {sections.map((s, i) => (
        <AppIcon key={s.code} section={s} onOpen={onOpen} zoomed={zoomed} index={i} />
      ))}
    </div>
  )
}

function TabletChartView({ code, onBack, subPage, onSubPageChange }) {
  const hasSubPages = code === 'SEC-02' || code === 'SEC-04'
  const subPageCount = hasSubPages ? 2 : 1
  const section = SECTIONS.find(s => s.code === code)

  return (
    <div style={{ padding: '10px 12px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexShrink: 0 }}>
        <button onClick={onBack} style={{
          fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-amber)',
          background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
          letterSpacing: '0.1em',
        }}>← BACK</button>
        <div style={{
          width: '28px', height: '28px', borderRadius: '8px',
          background: section?.gradient, display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <div style={{ transform: 'scale(0.7)' }}>{section?.icon}</div>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#001e50', letterSpacing: '0.1em', flex: 1 }}>{section?.label}</span>
        {hasSubPages && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button onClick={() => onSubPageChange(Math.max(0, subPage - 1))} style={{ fontSize: '18px', color: subPage > 0 ? 'var(--color-amber)' : '#aaa', background: 'none', border: 'none', cursor: subPage > 0 ? 'pointer' : 'default', lineHeight: 1 }}>‹</button>
            <span style={{ fontSize: '10px', color: '#001e50', fontFamily: 'var(--font-mono)' }}>{subPage + 1}/{subPageCount}</span>
            <button onClick={() => onSubPageChange(Math.min(subPageCount - 1, subPage + 1))} style={{ fontSize: '18px', color: subPage < subPageCount - 1 ? 'var(--color-amber)' : '#aaa', background: 'none', border: 'none', cursor: subPage < subPageCount - 1 ? 'pointer' : 'default', lineHeight: 1 }}>›</button>
          </div>
        )}
      </div>

      {/* Chart area */}
      <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${code}-${subPage}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ height: '100%' }}
          >
            {code === 'SEC-01' && <DunphyTimeline />}
            {code === 'SEC-02' && subPage === 0 && <ScopeDonut />}
            {code === 'SEC-02' && subPage === 1 && <NetZeroProjection />}
            {code === 'SEC-03' && <TBLScorecard />}
            {code === 'SEC-04' && subPage === 0 && <CompetitorRadar />}
            {code === 'SEC-04' && subPage === 1 && <NetZeroTimeline />}
            {code === 'SEC-05' && <StrategicRoadmap />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
