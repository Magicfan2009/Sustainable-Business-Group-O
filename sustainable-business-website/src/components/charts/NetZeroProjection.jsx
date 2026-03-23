import { useState } from 'react'
import { motion } from 'motion/react'
import './charts.css'

// Data points [year, Mt]
const HISTORICAL = [[2019,750],[2021,680],[2023,720],[2024,695]]
const VW_TRAJECTORY = [[2024,695],[2030,500],[2035,300],[2040,180],[2050,50]]
const BAU = [[2024,695],[2030,660],[2040,600],[2050,560]]
const SBTI_TARGET = [[2024,695],[2028,520],[2032,350],[2040,150],[2050,30]]

const MIN_YEAR = 2019, MAX_YEAR = 2055, MIN_MT = 0, MAX_MT = 800
const W = 380, H = 240, PAD = { top: 16, right: 16, bottom: 36, left: 48 }

function toX(year) { return PAD.left + (year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR) * (W - PAD.left - PAD.right) }
function toY(mt)   { return H - PAD.bottom - (mt - MIN_MT) / (MAX_MT - MIN_MT) * (H - PAD.top - PAD.bottom) }
function polyline(pts) { return pts.map(([y,m]) => `${toX(y)},${toY(m)}`).join(' ') }

const ALL_SERIES = [
  { key: 'vw', label: 'VW Trajectory', color: '#f2ead8', pts: [...HISTORICAL, ...VW_TRAJECTORY.slice(1)], strokeWidth: 3, dasharray: null },
  { key: 'sbti', label: 'SBTi Target', color: '#e8a020', pts: SBTI_TARGET, strokeWidth: 1.5, dasharray: '3 2' },
  { key: 'bau', label: 'BAU', color: '#cc2200', pts: BAU, strokeWidth: 2, dasharray: '4 3' },
]

// Year ticks
const years = [2020, 2025, 2030, 2035, 2040, 2045, 2050]
const mts = [0, 200, 400, 600, 800]

export default function NetZeroProjection() {
  const [hoveredPt, setHoveredPt] = useState(null)

  return (
    <div className="chart" style={{ justifyContent: 'flex-start' }}>
      <div className="chart__title">Net Zero Trajectory — 2024→2050</div>
      <svg viewBox="0 0 380 240" width="100%" style={{ flex: 1, minHeight: 0, overflow: 'visible' }}>
        {/* Grid lines */}
        {mts.map(m => (
          <line key={m} x1={PAD.left} x2={W - PAD.right} y1={toY(m)} y2={toY(m)} stroke="#1a1a1a" strokeWidth="1" />
        ))}
        {/* Y axis labels */}
        {mts.map(m => (
          <text key={m} x={PAD.left - 2} y={toY(m) + 3} fontSize="8" fill="#555" textAnchor="end" fontFamily="monospace">{m}</text>
        ))}
        {/* X axis labels */}
        {years.map(y => (
          <text key={y} x={toX(y)} y={H - 4} fontSize="8" fill="#555" textAnchor="middle" fontFamily="monospace">{y}</text>
        ))}

        {/* Animated Lines */}
        {ALL_SERIES.map((s, i) => (
          <motion.polyline
            key={s.key}
            points={polyline(s.pts)}
            fill="none"
            stroke={s.color}
            strokeWidth={s.strokeWidth}
            strokeDasharray={s.dasharray || undefined}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8 + i * 0.2, ease: 'easeOut', delay: i * 0.15 }}
          />
        ))}

        {/* Animated data point circles */}
        {ALL_SERIES.map((s, si) => s.pts.map(([year, mt], pi) => (
          <motion.circle
            key={`${s.key}-${pi}`}
            cx={toX(year)}
            cy={toY(mt)}
            r={5}
            fill={s.color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            whileHover={{ opacity: 1, scale: 1.4 }}
            transition={{ delay: si * 0.15 + pi * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
            style={{ cursor: 'crosshair' }}
            onMouseEnter={() => setHoveredPt({ label: s.label, color: s.color, year, mt })}
            onMouseLeave={() => setHoveredPt(null)}
          />
        )))}

        {/* Legend */}
        <rect x={PAD.left} y={6} width="10" height="3" fill="#f2ead8" />
        <text x={PAD.left + 14} y={10} fontSize="8" fill="#f2ead8" fontFamily="monospace">VW Trajectory</text>
        <line x1={PAD.left + 80} y1={8} x2={PAD.left + 90} y2={8} stroke="#e8a020" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x={PAD.left + 94} y={10} fontSize="8" fill="#e8a020" fontFamily="monospace">SBTi Target</text>
        <line x1={PAD.left + 170} y1={8} x2={PAD.left + 180} y2={8} stroke="#cc2200" strokeWidth="2" strokeDasharray="4 3" />
        <text x={PAD.left + 184} y={10} fontSize="8" fill="#cc2200" fontFamily="monospace">BAU</text>
      </svg>

      {/* Hover tooltip */}
      {hoveredPt && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '6px', background: '#0d1117',
            border: `1px solid ${hoveredPt.color}`,
            padding: '5px 8px', fontSize: '11px', color: '#f2ead8',
            fontFamily: 'var(--font-mono)', lineHeight: 1.5,
          }}
        >
          <span style={{ color: hoveredPt.color, fontWeight: 700 }}>{hoveredPt.label}</span>
          {' — '}{hoveredPt.year}: <span style={{ color: hoveredPt.color }}>{hoveredPt.mt} Mt</span>
        </motion.div>
      )}
    </div>
  )
}
