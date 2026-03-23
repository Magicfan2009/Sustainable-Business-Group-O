import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './charts.css'

// VW = blue (#0066cc), Mercedes = amber (#e8a020)
const COMPANIES = [
  { name: 'Stellantis', year: 2038, color: '#4a9a8a', strategy: 'Dare Forward 2030', caveat: '⚠ Plan scaled back in 2024 after profit warnings' },
  { name: 'Mercedes',   year: 2039, color: '#e8a020', strategy: 'Ambition 2039',      caveat: 'Walked back full-electric pledge 2023' },
  { name: 'Toyota',     year: 2050, color: '#cc5544', strategy: 'Env. Challenge 2050', caveat: 'EU BEV mandate compliance risk from hybrid focus' },
  { name: 'VW',         year: 2050, color: '#0066cc', strategy: 'regenerate+',         caveat: 'Reasonable Assurance leader — strongest governance' },
]
const MIN_YEAR = 2024, MAX_YEAR = 2058, W = 360, Y_LINE = 80
function toX(year) { return 10 + (year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR) * (W - 20) }

// VW and Toyota both at 2050:
// - centres 6px apart, midpoint = toX(2050), so overlap is ~8px (>50% of r=7 diameter)
// - Toyota left, VW right — VW rendered last so it paints on top
// - VW uses white stroke to show separation where they overlap
const X_OFFSET = { VW: 3, Toyota: -3 }

// Labels: stagger vertically to avoid collision
const LABEL_YOFF = { VW: -48, Toyota: -28, Stellantis: -28, Mercedes: -44 }

export default function NetZeroTimeline() {
  const [hovered, setHovered] = useState(null)
  return (
    <div className="chart">
      <div className="chart__title">Net Zero Target Timeline</div>
      <svg width={W} height={200} style={{ overflow: 'visible', marginTop: '8px' }}>
        <motion.line initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}
          x1="10" y1={Y_LINE} x2={W-10} y2={Y_LINE} stroke="#b0bac8" strokeWidth="1.5" style={{ transformOrigin: '10px 0' }} />
        {[2025,2030,2035,2040,2045,2050,2055].map(y => (
          <g key={y}>
            <line x1={toX(y)} y1={Y_LINE-4} x2={toX(y)} y2={Y_LINE+4} stroke="#8090a8" strokeWidth="1" />
            <text x={toX(y)} y={Y_LINE+14} fontSize="8" fill="#556" textAnchor="middle" fontFamily="monospace">{y}</text>
          </g>
        ))}
        {/* TODAY marker */}
        <line x1={toX(2026)} y1={Y_LINE-20} x2={toX(2026)} y2={Y_LINE+8} stroke="#0066cc" strokeWidth="1" strokeDasharray="2 2" />
        <text x={toX(2026)} y={Y_LINE-23} fontSize="8" fill="#0066cc" textAnchor="middle" fontFamily="monospace">TODAY</text>

        {/* Render Toyota's visual circle first so VW paints over it */}
        {COMPANIES.map((c) => {
          if (c.name !== 'Toyota') return null
          const cx = toX(c.year) + (X_OFFSET[c.name] ?? 0)
          const isHov = hovered === c.name
          return (
            <circle key={`vis-${c.name}`} cx={cx} cy={Y_LINE}
              r={isHov ? 10 : 7} fill={c.color}
              style={{ pointerEvents: 'none', transition: 'r 0.1s ease' }} />
          )
        })}
        {COMPANIES.map((c) => {
          if (c.name !== 'VW') return null
          const cx = toX(c.year) + (X_OFFSET[c.name] ?? 0)
          const isHov = hovered === c.name
          return (
            <circle key={`vis-${c.name}`} cx={cx} cy={Y_LINE}
              r={isHov ? 10 : 7} fill={c.color}
              stroke="white" strokeWidth="1.5"
              style={{ pointerEvents: 'none', transition: 'r 0.1s ease' }} />
          )
        })}

        {/* Labels + connectors + hit areas for all companies */}
        {COMPANIES.map((c, i) => {
          const xOff = X_OFFSET[c.name] ?? (i % 2 === 0 ? -8 : 8)
          const cx = toX(c.year) + xOff
          const yOff = LABEL_YOFF[c.name] ?? -36
          const isHov = hovered === c.name
          return (
            <motion.g key={c.name}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 + i * 0.15 }}
              style={{ cursor: 'default' }}
            >
              {/* Connector from label to circle position */}
              <line x1={cx} y1={Y_LINE - (isHov ? 10 : 7) - 1} x2={cx} y2={Y_LINE + yOff + 10}
                stroke={c.color} strokeWidth="0.5" strokeDasharray="2 1" />
              <text x={cx} y={Y_LINE + yOff} fontSize="10" fill={c.color}
                textAnchor="middle" fontFamily="monospace" fontWeight="700">{c.year}</text>
              <text x={cx} y={Y_LINE + yOff + 12} fontSize="8" fill="#334"
                textAnchor="middle" fontFamily="monospace">{c.name}</text>

              {/* Large transparent hit area */}
              <circle cx={cx} cy={Y_LINE} r={14} fill="transparent" style={{ cursor: 'crosshair' }}
                onMouseEnter={() => setHovered(c.name)}
                onMouseLeave={() => setHovered(null)}
              />
            </motion.g>
          )
        })}
      </svg>
      <AnimatePresence>
        {hovered !== null && (() => {
          const c = COMPANIES.find(x => x.name === hovered)
          if (!c) return null
          return (
            <motion.div key={hovered} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.15 }}
              style={{
                width: '100%', background: '#ffffff',
                border: `1px solid ${c.color}`,
                padding: '6px 8px', fontSize: '10px', color: '#001e50',
                fontFamily: 'var(--font-mono)', lineHeight: 1.5,
                boxShadow: '0 2px 8px rgba(0,30,80,0.1)',
              }}
            >
              <div style={{ color: c.color, fontWeight: 700, marginBottom: '3px', fontSize: '11px' }}>
                {c.name} — {c.strategy}
              </div>
              {c.caveat}
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
