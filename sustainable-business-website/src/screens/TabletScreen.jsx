import { useState } from 'react'
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
  { code: 'SEC-01', label: 'OVERVIEW' },
  { code: 'SEC-02', label: 'CARBON ACCOUNTING' },
  { code: 'SEC-03', label: 'TRIPLE BOTTOM LINE' },
  { code: 'SEC-04', label: 'BENCHMARKING' },
  { code: 'SEC-05', label: 'STRATEGY 2035' },
  { code: 'SEC-06', label: 'EXEC SUMMARY' },
]

export default function TabletScreen({ onPanLeft, onPanRight, onPanToMonitor, panning }) {
  const [activeSection, setActiveSection] = useState(null)
  const [subPage, setSubPage] = useState(0)

  function openSection(code) {
    if (code === 'SEC-06') { onPanToMonitor(); return }
    setSubPage(0)
    setActiveSection(code)
  }

  function closeSection() {
    setActiveSection(null)
  }

  return (
    <div className="tablet-screen" style={{ position: 'relative' }}>
      <PanArrow direction="left" onClick={onPanLeft} panning={panning} />
      <PanArrow direction="right" onClick={onPanRight} panning={panning} />

      <div className="tablet-scene">
        <div className="tablet-iso">
          <div className="tablet-iso__top" />
          <div className="tablet-iso__side" />
          <div className="tablet-nametag">CHARTS &amp; FIGURES</div>

          <div className="tablet-iso__front">
            <div className="tablet-iso__camera" />
            <div className="tablet-iso__bezel" />

            <div className="tablet-iso__screen">
              {!activeSection ? (
                <TabletHome sections={SECTIONS} onOpen={openSection} />
              ) : (
                <TabletChartView
                  code={activeSection}
                  onBack={closeSection}
                  subPage={subPage}
                  onSubPageChange={setSubPage}
                />
              )}
            </div>

            <div className="tablet-iso__home-btn" />
          </div>
        </div>
      </div>
    </div>
  )
}

function TabletHome({ sections, onOpen }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px',
      padding: '10px', height: '100%', boxSizing: 'border-box',
    }}>
      {sections.map(s => (
        <button key={s.code} onClick={() => onOpen(s.code)} style={{
          background: '#0d1117', borderLeft: '2px solid #e8a020',
          border: 'none', borderLeft: '2px solid #e8a020',
          padding: '8px 6px', cursor: 'pointer', textAlign: 'left',
          display: 'flex', flexDirection: 'column', gap: '2px',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#e8a020', letterSpacing: '0.15em' }}>{s.code}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: '#f2ead8', letterSpacing: '0.08em' }}>{s.label}</span>
        </button>
      ))}
    </div>
  )
}

function TabletChartView({ code, onBack, subPage, onSubPageChange }) {
  const hasSubPages = code === 'SEC-02' || code === 'SEC-04'
  const subPageCount = hasSubPages ? 2 : 1

  return (
    <div style={{ padding: '8px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexShrink: 0 }}>
        <button onClick={onBack} style={{
          fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#e8a020',
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          letterSpacing: '0.1em',
        }}>← BACK</button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#f2ead8', letterSpacing: '0.1em', flex: 1 }}>{code}</span>
        {hasSubPages && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button onClick={() => onSubPageChange(Math.max(0, subPage - 1))} style={{ fontSize: '10px', color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}>‹</button>
            <span style={{ fontSize: '7px', color: '#666', fontFamily: 'var(--font-mono)' }}>{subPage + 1}/{subPageCount}</span>
            <button onClick={() => onSubPageChange(Math.min(subPageCount - 1, subPage + 1))} style={{ fontSize: '10px', color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}>›</button>
          </div>
        )}
      </div>

      {/* Chart area */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {code === 'SEC-01' && <DunphyTimeline />}
        {code === 'SEC-02' && subPage === 0 && <ScopeDonut />}
        {code === 'SEC-02' && subPage === 1 && <NetZeroProjection />}
        {code === 'SEC-03' && <TBLScorecard />}
        {code === 'SEC-04' && subPage === 0 && <CompetitorRadar />}
        {code === 'SEC-04' && subPage === 1 && <NetZeroTimeline />}
        {code === 'SEC-05' && <StrategicRoadmap />}
      </div>
    </div>
  )
}
