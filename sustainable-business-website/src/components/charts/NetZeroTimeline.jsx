import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './charts.css'

const COMPANIES = [
  { name: 'Stellantis', year: 2038, color: '#4a9a8a', strategy: 'Dare Forward 2030', caveat: '⚠ Plan scaled back in 2024 after profit warnings' },
  { name: 'Mercedes', year: 2039, color: '#6699bb', strategy: 'Ambition 2039', caveat: 'Walked back full-electric pledge 2023' },
  { name: 'VW', year: 2050, color: '#e8a020', strategy: 'regenerate+', caveat: 'Reasonable Assurance leader — strongest governance' },
  { name: 'Toyota', year: 2050, color: '#cc5544', strategy: 'Env. Challenge 2050', caveat: 'EU BEV mandate compliance risk from hybrid focus' },
]
const MIN_YEAR = 2024, MAX_YEAR = 2058, W = 360, Y_LINE = 80
function toX(year) { return 10 + (year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR) * (W - 20) }

export default function NetZeroTimeline() {
  const [hovered, setHovered] = useState(null)
  return (
    <div className="chart">
      <div className="chart__title">Net Zero Target Timeline</div>
      <svg width={W} height={200} style={{ overflow: 'visible', marginTop: '8px' }}>
        <motion.line initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}
          x1="10" y1={Y_LINE} x2={W-10} y2={Y_LINE} stroke="#333" strokeWidth="1.5" style={{ transformOrigin: '10px 0' }} />
        {[2025,2030,2035,2040,2045,2050,2055].map(y => (
          <g key={y}>
            <line x1={toX(y)} y1={Y_LINE-4} x2={toX(y)} y2={Y_LINE+4} stroke="#444" strokeWidth="1" />
            <text x={toX(y)} y={Y_LINE+14} fontSize="8" fill="#555" textAnchor="middle" fontFamily="monospace">{y}</text>
          </g>
        ))}
        <line x1={toX(2026)} y1={Y_LINE-20} x2={toX(2026)} y2={Y_LINE+8} stroke="#e8a020" strokeWidth="1" strokeDasharray="2 2" />
        <text x={toX(2026)} y={Y_LINE-23} fontSize="8" fill="#e8a020" textAnchor="middle" fontFamily="monospace">TODAY</text>
        {COMPANIES.map((c, i) => {
          const x = toX(c.year) + (i % 2 === 0 ? -8 : 8)
          const yOff = i % 2 === 0 ? -28 : -44
          return (
            <motion.g key={c.name}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 + i * 0.15 }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'default' }}
            >
              <motion.circle cx={toX(c.year)} cy={Y_LINE} r="7" fill={c.color} whileHover={{ r: 10, scale: 1.2 }} />
              <line x1={toX(c.year)} y1={Y_LINE-7} x2={x} y2={Y_LINE+yOff+8} stroke={c.color} strokeWidth="0.5" strokeDasharray="2 1" />
              <text x={x} y={Y_LINE+yOff} fontSize="10" fill={c.color} textAnchor="middle" fontFamily="monospace" fontWeight="700">{c.year}</text>
              <text x={x} y={Y_LINE+yOff+12} fontSize="8" fill="#888" textAnchor="middle" fontFamily="monospace">{c.name}</text>
            </motion.g>
          )
        })}
      </svg>
      <AnimatePresence>
        {hovered !== null && (
          <motion.div key={hovered} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.15 }}
            style={{ width: '100%', background: '#0d1117', border: `1px solid ${COMPANIES[hovered].color}`, padding: '6px 8px', fontSize: '10px', color: '#f2ead8', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}
          >
            <div style={{ color: COMPANIES[hovered].color, fontWeight: 700, marginBottom: '3px', fontSize: '11px' }}>{COMPANIES[hovered].name} — {COMPANIES[hovered].strategy}</div>
            {COMPANIES[hovered].caveat}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
