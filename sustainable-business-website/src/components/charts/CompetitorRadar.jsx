import { useState } from 'react'
import './charts.css'

const AXES = ['SBTi\nAlign', 'Assurance', 'Circularity', 'EU\nCompliance', 'Net Zero\nAmbition']
const MAX = 5
const COMPANIES = [
  { name: 'VW', color: '#e8a020', scores: [4,5,4,3,4], always: true },
  { name: 'Mercedes', color: '#6699bb', scores: [5,3,4,4,5] },
  { name: 'Stellantis', color: '#4a9a8a', scores: [3,2,4,4,5] },
  { name: 'Toyota', color: '#cc5544', scores: [3,2,3,2,3] },
]

const CX = 130, CY = 120, R = 85
function angleFor(i, n) { return (Math.PI * 2 * i / n) - Math.PI / 2 }
function point(score, i, n) {
  const a = angleFor(i, n)
  const r = (score / MAX) * R
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }
}
function axisEnd(i, n) {
  const a = angleFor(i, n)
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }
}
function polygon(scores, n) {
  return scores.map((s, i) => { const p = point(s, i, n); return `${p.x},${p.y}` }).join(' ')
}

export default function CompetitorRadar() {
  const [hidden, setHidden] = useState([])
  const n = AXES.length

  function toggle(name) {
    if (name === 'VW') return
    setHidden(h => h.includes(name) ? h.filter(x => x !== name) : [...h, name])
  }

  // Grid polygons at 1,2,3,4,5
  const gridPolys = [1,2,3,4,5].map(level =>
    Array.from({length: n}, (_, i) => {
      const a = angleFor(i, n)
      const r = (level / MAX) * R
      return `${CX + r * Math.cos(a)},${CY + r * Math.sin(a)}`
    }).join(' ')
  )

  return (
    <div className="chart">
      <div className="chart__title">Competitor Sustainability Radar</div>
      <svg width="260" height="240" style={{ overflow: 'visible' }}>
        {/* Grid */}
        {gridPolys.map((p, i) => (
          <polygon key={i} points={p} fill="none" stroke="#1e1e1e" strokeWidth="1" />
        ))}
        {/* Axes */}
        {AXES.map((_, i) => {
          const e = axisEnd(i, n)
          return <line key={i} x1={CX} y1={CY} x2={e.x} y2={e.y} stroke="#2a2a2a" strokeWidth="1" />
        })}
        {/* Axis labels */}
        {AXES.map((label, i) => {
          const a = angleFor(i, n)
          const x = CX + (R + 12) * Math.cos(a)
          const y = CY + (R + 12) * Math.sin(a)
          return label.split('\n').map((line, li) => (
            <text key={`${i}-${li}`} x={x} y={y + li * 9} fontSize="8" fill="#666" textAnchor="middle" fontFamily="monospace">{line}</text>
          ))
        })}
        {/* Company polygons */}
        {COMPANIES.map(c => !hidden.includes(c.name) && (
          <polygon key={c.name} points={polygon(c.scores, n)}
            fill={c.color} fillOpacity="0.15"
            stroke={c.color} strokeWidth={c.always ? 2.5 : 1.5}
          />
        ))}
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
        {COMPANIES.map(c => (
          <button key={c.name} onClick={() => toggle(c.name)} style={{
            display: 'flex', alignItems: 'center', gap: '3px',
            background: 'none', border: 'none', cursor: c.always ? 'default' : 'pointer',
            opacity: hidden.includes(c.name) ? 0.35 : 1, padding: '1px 3px',
          }}>
            <div style={{ width: '12px', height: '12px', background: c.color }} />
            <span style={{ fontSize: '10px', color: '#f2ead8', fontFamily: 'var(--font-mono)' }}>{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
