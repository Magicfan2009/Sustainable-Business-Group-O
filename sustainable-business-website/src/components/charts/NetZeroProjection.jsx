import { useEffect, useRef } from 'react'
import './charts.css'

// Data points [year, Mt]
const HISTORICAL = [[2019,750],[2021,680],[2023,720],[2024,695]]
const VW_TRAJECTORY = [[2024,695],[2030,500],[2035,300],[2040,180],[2050,50]]
const BAU = [[2024,695],[2030,660],[2040,600],[2050,560]]
const SBTI_TARGET = [[2024,695],[2028,520],[2032,350],[2040,150],[2050,30]]

const MIN_YEAR = 2019, MAX_YEAR = 2055, MIN_MT = 0, MAX_MT = 800
const W = 220, H = 140, PAD = { top: 10, right: 10, bottom: 24, left: 32 }

function toX(year) { return PAD.left + (year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR) * (W - PAD.left - PAD.right) }
function toY(mt)   { return H - PAD.bottom - (mt - MIN_MT) / (MAX_MT - MIN_MT) * (H - PAD.top - PAD.bottom) }
function polyline(pts) { return pts.map(([y,m]) => `${toX(y)},${toY(m)}`).join(' ') }

export default function NetZeroProjection() {
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)

  useEffect(() => {
    [line1Ref, line2Ref, line3Ref].forEach((ref, i) => {
      if (!ref.current) return
      const len = ref.current.getTotalLength()
      ref.current.style.strokeDasharray = len
      ref.current.style.strokeDashoffset = len
      ref.current.style.transition = `stroke-dashoffset ${0.8 + i * 0.2}s ease ${i * 0.15}s forwards`
      setTimeout(() => { if (ref.current) ref.current.style.strokeDashoffset = 0 }, 50)
    })
  }, [])

  // Year ticks
  const years = [2020, 2025, 2030, 2035, 2040, 2045, 2050]
  const mts = [0, 200, 400, 600, 800]

  return (
    <div className="chart">
      <div className="chart__title">Net Zero Trajectory — 2024→2050</div>
      <svg width={W} height={H} style={{ overflow: 'visible' }}>
        {/* Grid lines */}
        {mts.map(m => (
          <line key={m} x1={PAD.left} x2={W - PAD.right} y1={toY(m)} y2={toY(m)} stroke="#1a1a1a" strokeWidth="1" />
        ))}
        {/* Y axis labels */}
        {mts.map(m => (
          <text key={m} x={PAD.left - 2} y={toY(m) + 3} fontSize="5" fill="#555" textAnchor="end" fontFamily="monospace">{m}</text>
        ))}
        {/* X axis labels */}
        {years.map(y => (
          <text key={y} x={toX(y)} y={H - 4} fontSize="5" fill="#555" textAnchor="middle" fontFamily="monospace">{y}</text>
        ))}

        {/* BAU line */}
        <polyline ref={line3Ref} points={polyline(BAU)} fill="none" stroke="#cc2200" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* SBTi target */}
        <polyline ref={line2Ref} points={polyline(SBTI_TARGET)} fill="none" stroke="#e8a020" strokeWidth="1" strokeDasharray="3 2" />
        {/* VW trajectory */}
        <polyline ref={line1Ref} points={polyline([...HISTORICAL, ...VW_TRAJECTORY.slice(1)])} fill="none" stroke="#f2ead8" strokeWidth="2" />

        {/* Legend */}
        <rect x={PAD.left} y={4} width="6" height="2" fill="#f2ead8" />
        <text x={PAD.left + 8} y={7} fontSize="5" fill="#f2ead8" fontFamily="monospace">VW Trajectory</text>
        <line x1={PAD.left + 50} y1={5} x2={PAD.left + 56} y2={5} stroke="#e8a020" strokeWidth="1" strokeDasharray="3 2" />
        <text x={PAD.left + 58} y={7} fontSize="5" fill="#e8a020" fontFamily="monospace">SBTi Target</text>
        <line x1={PAD.left + 100} y1={5} x2={PAD.left + 106} y2={5} stroke="#cc2200" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={PAD.left + 108} y={7} fontSize="5" fill="#cc2200" fontFamily="monospace">BAU</text>
      </svg>
    </div>
  )
}
