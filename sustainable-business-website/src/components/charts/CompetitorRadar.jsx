import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
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
function polygon(scores, n) {
  return scores.map((s, i) => {
    const a = angleFor(i, n); const r = (s / MAX) * R
    return `${CX + r * Math.cos(a)},${CY + r * Math.sin(a)}`
  }).join(' ')
}
function axisEnd(i, n) { const a = angleFor(i, n); return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) } }
const gridPolys = [1,2,3,4,5].map(level =>
  Array.from({length: AXES.length}, (_, i) => {
    const a = angleFor(i, AXES.length); const r = (level / MAX) * R
    return `${CX + r * Math.cos(a)},${CY + r * Math.sin(a)}`
  }).join(' ')
)

export default function CompetitorRadar() {
  const [hidden, setHidden] = useState([])
  const [hovered, setHovered] = useState(null)
  const n = AXES.length
  function toggle(name) { if (name === 'VW') return; setHidden(h => h.includes(name) ? h.filter(x => x !== name) : [...h, name]) }

  return (
    <div className="chart">
      <div className="chart__title">Competitor Sustainability Radar</div>
      <svg width="260" height="240" style={{ overflow: 'visible' }}>
        {gridPolys.map((p, i) => <polygon key={i} points={p} fill="none" stroke="#1e1e1e" strokeWidth="1" />)}
        {AXES.map((_, i) => { const e = axisEnd(i, n); return <line key={i} x1={CX} y1={CY} x2={e.x} y2={e.y} stroke="#2a2a2a" strokeWidth="1" /> })}
        {AXES.map((label, i) => {
          const a = angleFor(i, n); const x = CX + (R + 14) * Math.cos(a); const y = CY + (R + 14) * Math.sin(a)
          return label.split('\n').map((line, li) => (
            <text key={`${i}-${li}`} x={x} y={y + li * 9} fontSize="8" fill="#666" textAnchor="middle" fontFamily="monospace">{line}</text>
          ))
        })}
        {COMPANIES.map((c, ci) => !hidden.includes(c.name) && (
          <motion.polygon
            key={c.name}
            points={polygon(c.scores, n)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: ci * 0.12 }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
            fill={c.color} fillOpacity={hovered === c.name ? 0.35 : 0.15}
            stroke={c.color} strokeWidth={c.always ? 2.5 : 1.5}
            onMouseEnter={() => setHovered(c.name)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
        {COMPANIES.map(c => (
          <motion.button key={c.name} onClick={() => toggle(c.name)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: c.always ? 'default' : 'pointer', opacity: hidden.includes(c.name) ? 0.3 : 1, padding: '2px 4px' }}
          >
            <div style={{ width: '12px', height: '12px', background: c.color, borderRadius: '2px' }} />
            <span style={{ fontSize: '10px', color: '#f2ead8', fontFamily: 'var(--font-mono)' }}>{c.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
