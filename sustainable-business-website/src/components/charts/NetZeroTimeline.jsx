import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import './charts.css'

const COMPANIES = [
  { name: 'Stellantis', year: 2038, color: '#4a9a8a', strategy: 'Dare Forward 2030', caveat: '⚠ Plan scaled back in 2024 after profit warnings' },
  { name: 'Mercedes', year: 2039, color: '#6699bb', strategy: 'Ambition 2039', caveat: 'Walked back full-electric pledge 2023' },
  { name: 'VW', year: 2050, color: '#e8a020', strategy: 'regenerate+', caveat: 'Reasonable Assurance leader — strongest governance' },
  { name: 'Toyota', year: 2050, color: '#cc5544', strategy: 'Env. Challenge 2050', caveat: 'EU BEV mandate compliance risk from hybrid focus' },
]
const MIN_YEAR = 2024, MAX_YEAR = 2058
const W = 360, Y_LINE = 80

function toX(year) { return 10 + (year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR) * (W - 20) }

export default function NetZeroTimeline() {
  const [hovered, setHovered] = useState(null)
  const markersRef = useRef([])

  useEffect(() => {
    gsap.from(markersRef.current, {
      y: -20, opacity: 0, duration: 0.4, ease: 'back.out(1.7)',
      stagger: 0.15, delay: 0.1,
    })
  }, [])

  return (
    <div className="chart">
      <div className="chart__title">Net Zero Target Timeline</div>
      <svg width={W} height={200} style={{ overflow: 'visible', marginTop: '8px' }}>
        {/* Axis line */}
        <line x1="10" y1={Y_LINE} x2={W - 10} y2={Y_LINE} stroke="#333" strokeWidth="1.5" />

        {/* Year ticks */}
        {[2025,2030,2035,2040,2045,2050,2055].map(y => (
          <g key={y}>
            <line x1={toX(y)} y1={Y_LINE - 3} x2={toX(y)} y2={Y_LINE + 3} stroke="#444" strokeWidth="1" />
            <text x={toX(y)} y={Y_LINE + 14} fontSize="8" fill="#555" textAnchor="middle" fontFamily="monospace">{y}</text>
          </g>
        ))}

        {/* TODAY marker */}
        <line x1={toX(2026)} y1={Y_LINE - 20} x2={toX(2026)} y2={Y_LINE + 8} stroke="#e8a020" strokeWidth="1" strokeDasharray="2 2" />
        <text x={toX(2026)} y={Y_LINE - 22} fontSize="8" fill="#e8a020" textAnchor="middle" fontFamily="monospace">TODAY</text>

        {/* Company markers */}
        {COMPANIES.map((c, i) => {
          const x = toX(c.year) + (i % 2 === 0 ? -6 : 6) // slight offset for same-year
          const yOff = i % 2 === 0 ? -22 : -36
          return (
            <g
              key={c.name}
              ref={el => markersRef.current[i] = el}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'default' }}
            >
              <circle cx={toX(c.year)} cy={Y_LINE} r="7" fill={c.color} />
              <line x1={toX(c.year)} y1={Y_LINE - 7} x2={x} y2={Y_LINE + yOff + 6} stroke={c.color} strokeWidth="0.5" strokeDasharray="2 1" />
              <text x={x} y={Y_LINE + yOff} fontSize="10" fill={c.color} textAnchor="middle" fontFamily="monospace" fontWeight="700">{c.year}</text>
              <text x={x} y={Y_LINE + yOff + 12} fontSize="8" fill="#888" textAnchor="middle" fontFamily="monospace">{c.name}</text>
            </g>
          )
        })}
      </svg>

      {/* Hover card */}
      {hovered !== null && (
        <div style={{
          width: '100%', background: '#0d1117',
          border: `1px solid ${COMPANIES[hovered].color}`,
          padding: '5px 6px', fontSize: '10px', color: '#f2ead8',
          fontFamily: 'var(--font-mono)', lineHeight: 1.5,
        }}>
          <div style={{ color: COMPANIES[hovered].color, fontWeight: 700, marginBottom: '2px', fontSize: '11px' }}>{COMPANIES[hovered].name} — {COMPANIES[hovered].strategy}</div>
          {COMPANIES[hovered].caveat}
        </div>
      )}
    </div>
  )
}
