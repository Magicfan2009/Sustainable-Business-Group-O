import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import './charts.css'

const PILLARS = [
  {
    name: 'PEOPLE', color: '#4a90d9',
    metrics: [
      { label: 'S-Rating Coverage', value: 72, display: '72%', tooltip: '72% of 63,000+ suppliers rated. Hard-block on failure.' },
      { label: 'Cobalt Traceability', value: 88, display: '88%', tooltip: 'Blockchain tracking from DRC mines to VW factories.' },
      { label: 'Workers Retrained', value: 70, display: '35k / 50k', tooltip: '35,000 of 50,000 target retrained for EV/digital roles.' },
    ],
  },
  {
    name: 'PLANET', color: '#4ade80',
    metrics: [
      { label: 'Scope 1 Reduction', value: 50, display: '50%', tooltip: 'Achieved 25% of 50% target vs 2019.' },
      { label: 'Circular Materials', value: 30, display: '12% / 40%', tooltip: '12% of 40% target. Critical gap vs Renault.' },
      { label: 'Zero Impact Sites', value: 30, display: '3 / 10', tooltip: '3 of 10 European sites at zero-impact standard.' },
    ],
  },
  {
    name: 'PROFIT', color: '#e8a020',
    metrics: [
      { label: 'Green Bonds', value: 75, display: '€15B / €20B', tooltip: '€15B of €20B target raised. ESG capital momentum.' },
      { label: 'EV Market Share', value: 100, display: '#1 EU', tooltip: '#1 EV in Europe 2025. ID.3, ID.4, ID.7, ID.Buzz.' },
      { label: 'CO₂ Compliance', value: 5, display: '0g margin', tooltip: '⚠ 0g compliance margin. Any shortfall = €95/g × 8M vehicles.' },
    ],
  },
]

function getColor(pct) {
  if (pct >= 70) return '#4ade80'
  if (pct >= 40) return '#e8a020'
  return '#cc2200'
}

function SpringBar({ value, color, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} style={{ height: '10px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '2px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14, delay }}
        style={{ height: '100%', background: color, borderRadius: '2px' }}
      />
    </div>
  )
}

export default function TBLScorecard() {
  const [hovered, setHovered] = useState(null)
  let idx = 0
  return (
    <div className="chart" style={{ padding: '8px 6px' }}>
      <div className="chart__title">Triple Bottom Line Scorecard</div>
      <div style={{ display: 'flex', gap: '8px', width: '100%', flex: 1 }}>
        {PILLARS.map((pillar, pi) => (
          <div key={pi} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pi * 0.1, duration: 0.3 }}
              style={{ fontSize: '10px', color: pillar.color, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.1em', borderBottom: `1px solid ${pillar.color}`, paddingBottom: '4px', marginBottom: '2px' }}
            >{pillar.name}</motion.div>
            {pillar.metrics.map((m, mi) => {
              const i = idx++
              const barColor = getColor(m.value)
              const delay = pi * 0.1 + mi * 0.08
              return (
                <motion.div key={mi} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: delay + 0.1 }}
                  onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'default', position: 'relative' }}
                >
                  <div style={{ fontSize: '9px', color: '#888', fontFamily: 'var(--font-mono)', marginBottom: '3px', lineHeight: 1.2 }}>{m.label}</div>
                  <SpringBar value={m.value} color={barColor} delay={delay} />
                  <div style={{ fontSize: '9px', color: barColor, fontFamily: 'var(--font-mono)', marginTop: '2px', fontWeight: 700 }}>{m.display}</div>
                  {hovered === i && (
                    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                      style={{ position: 'absolute', bottom: '100%', left: 0, zIndex: 20, fontSize: '9px', color: '#f2ead8', fontFamily: 'var(--font-mono)', background: '#0d1117', border: `1px solid ${barColor}`, padding: '5px 7px', marginBottom: '4px', lineHeight: 1.5, maxWidth: '180px', whiteSpace: 'normal', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                    >{m.tooltip}</motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
