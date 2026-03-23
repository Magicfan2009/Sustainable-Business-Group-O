import { useEffect, useRef, useState } from 'react'
import './charts.css'

const PILLARS = [
  {
    name: 'PEOPLE', color: '#4a90d9',
    metrics: [
      { label: 'S-Rating Coverage', value: 72, unit: '%', tooltip: '72% of 63,000+ suppliers rated. Hard-block on failure.' },
      { label: 'Cobalt Traceability', value: 88, unit: '%', tooltip: 'Blockchain tracking from DRC mines to VW factories.' },
      { label: 'Workers Retrained', value: 70, unit: '%', tooltip: '35,000 of 50,000 target retrained for EV/digital roles.' },
    ],
  },
  {
    name: 'PLANET', color: '#4ade80',
    metrics: [
      { label: 'Scope 1 Reduction', value: 50, unit: '%', tooltip: 'Achieved 25% of 50% target vs 2019.' },
      { label: 'Circular Materials', value: 30, unit: '%', tooltip: '12% of 40% target. Critical gap vs Renault.' },
      { label: 'Zero Impact Sites', value: 30, unit: '%', tooltip: '3 of 10 European sites at zero-impact standard.' },
    ],
  },
  {
    name: 'PROFIT', color: '#e8a020',
    metrics: [
      { label: 'Green Bonds', value: 75, unit: '%', tooltip: '€15B of €20B target raised. ESG capital momentum.' },
      { label: 'EV Market Share', value: 100, unit: '%', tooltip: '#1 EV in Europe 2025. ID.3, ID.4, ID.7, ID.Buzz.' },
      { label: 'CO₂ Compliance', value: 5, unit: '%', tooltip: '⚠ 0g compliance margin. Any shortfall = €95/g fine × 8M vehicles.' },
    ],
  },
]

function getColor(pct) {
  if (pct >= 70) return '#4ade80'
  if (pct >= 40) return '#e8a020'
  return '#cc2200'
}

export default function TBLScorecard() {
  const barRefs = useRef([])
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    barRefs.current.forEach((el, i) => {
      if (!el) return
      el.style.width = '0%'
      setTimeout(() => {
        el.style.transition = `width ${0.5 + i * 0.08}s ease`
        el.style.width = el.dataset.target
      }, 100 + i * 60)
    })
  }, [])

  let refIdx = 0
  return (
    <div className="chart" style={{ padding: '6px 4px' }}>
      <div className="chart__title">Triple Bottom Line Scorecard</div>
      <div style={{ display: 'flex', gap: '8px', width: '100%', flex: 1 }}>
        {PILLARS.map((pillar, pi) => (
          <div key={pi} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ fontSize: '11px', color: pillar.color, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.12em', borderBottom: `1px solid ${pillar.color}`, paddingBottom: '2px', marginBottom: '2px' }}>{pillar.name}</div>
            {pillar.metrics.map((m, mi) => {
              const idx = refIdx++
              return (
                <div key={mi}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'default' }}
                >
                  <div style={{ fontSize: '10px', color: '#888', fontFamily: 'var(--font-mono)', marginBottom: '1px', letterSpacing: '0.05em' }}>{m.label}</div>
                  <div style={{ height: '10px', background: '#1a1a1a', border: '1px solid #2a2a2a', position: 'relative' }}>
                    <div
                      ref={el => barRefs.current[idx] = el}
                      data-target={`${m.value}%`}
                      style={{ height: '100%', background: getColor(m.value), width: '0%' }}
                    />
                  </div>
                  {hovered === idx && (
                    <div style={{ fontSize: '10px', color: '#f2ead8', fontFamily: 'var(--font-mono)', background: '#0d1117', border: `1px solid ${getColor(m.value)}`, padding: '3px 4px', marginTop: '2px', lineHeight: 1.4, position: 'absolute', zIndex: 10, maxWidth: '200px' }}>
                      {m.tooltip}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
