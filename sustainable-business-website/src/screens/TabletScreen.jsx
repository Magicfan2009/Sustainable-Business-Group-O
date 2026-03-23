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

export default function TabletScreen({ onPanLeft, onPanRight, onPanToMonitor, panning }) {
  const [activeSection, setActiveSection] = useState(null)
  const [subPage, setSubPage] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  function openSection(code) {
    if (code === 'SEC-06') { onPanToMonitor(); return }
    setSubPage(0)
    setActiveSection(code)
  }

  function closeSection() {
    setActiveSection(null)
  }

  function handleTabletClick() {
    if (!zoomed) setZoomed(true)
  }

  return (
    <div className="tablet-screen" style={{ position: 'relative' }}>
      {!zoomed && <PanArrow direction="left" onClick={onPanLeft} panning={panning} />}
      {!zoomed && <PanArrow direction="right" onClick={onPanRight} panning={panning} />}

      {zoomed && (
        <button
          onClick={() => { setZoomed(false); setActiveSection(null) }}
          style={{
            position: 'absolute', top: '16px', left: '16px', zIndex: 10,
            fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#e8a020',
            background: '#1a1a1a', border: '1px solid #333', padding: '6px 12px',
            cursor: 'pointer', letterSpacing: '0.1em',
          }}
        >
          ← BACK
        </button>
      )}

      <div
        className={`tablet-scene${zoomed ? ' tablet-scene--zoomed' : ''}`}
        onClick={handleTabletClick}
        style={{ cursor: zoomed ? 'default' : 'pointer' }}
      >
        <div className="tablet-iso">
          <div className="tablet-iso__top" />
          <div className="tablet-iso__side" />
          {!zoomed && <div className="tablet-nametag">CHARTS &amp; FIGURES</div>}

          <div className="tablet-iso__front">
            <div className="tablet-iso__camera" />
            <div className="tablet-iso__bezel" />

            <div
              className="tablet-iso__screen"
              onClick={e => { if (zoomed) e.stopPropagation() }}
            >
              <AnimatePresence mode="wait">
                {!activeSection ? (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    style={{ height: '100%' }}
                  >
                    <TabletHome sections={SECTIONS} onOpen={zoomed ? openSection : null} zoomed={zoomed} />
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
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
            </div>

            <div className="tablet-iso__home-btn" />
          </div>
        </div>
      </div>
    </div>
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
        fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(242,234,216,0.9)',
        textAlign: 'center', maxWidth: '72px',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        letterSpacing: '0.04em',
        textShadow: '0 1px 4px rgba(0,0,0,0.8)',
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
          fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#e8a020',
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
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#f2ead8', letterSpacing: '0.1em', flex: 1 }}>{section?.label}</span>
        {hasSubPages && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button onClick={() => onSubPageChange(Math.max(0, subPage - 1))} style={{ fontSize: '18px', color: subPage > 0 ? '#e8a020' : '#444', background: 'none', border: 'none', cursor: subPage > 0 ? 'pointer' : 'default', lineHeight: 1 }}>‹</button>
            <span style={{ fontSize: '10px', color: '#666', fontFamily: 'var(--font-mono)' }}>{subPage + 1}/{subPageCount}</span>
            <button onClick={() => onSubPageChange(Math.min(subPageCount - 1, subPage + 1))} style={{ fontSize: '18px', color: subPage < subPageCount - 1 ? '#e8a020' : '#444', background: 'none', border: 'none', cursor: subPage < subPageCount - 1 ? 'pointer' : 'default', lineHeight: 1 }}>›</button>
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
