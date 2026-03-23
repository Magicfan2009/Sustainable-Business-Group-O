import { useState } from 'react'
import './charts.css'

const SCOPES = [
  { label: 'Scope 1', value: 3.3, pct: 0.5, color: '#4ade80', desc: 'Direct emissions from manufacturing. −25% since 2019.' },
  { label: 'Scope 2', value: 4.2, pct: 0.6, color: '#e8a020', desc: 'Energy indirect (market-based). Purchased electricity and heat.' },
  { label: 'Scope 3', value: 688, pct: 98.9, color: '#cc2200', desc: '⚠ 92% is Category 11 (vehicles in use). EV transition is the primary lever.' },
]

export default function ScopeDonut() {
  const [hovered, setHovered] = useState(null)

  // Build conic-gradient: S3 dominates (~98.9%), S1 0.5%, S2 0.6%
  const gradient = `conic-gradient(
    #cc2200 0deg 356deg,
    #4ade80 356deg 357.8deg,
    #e8a020 357.8deg 360deg
  )`

  return (
    <div className="chart">
      <div className="chart__title">Emissions Profile — Scope 1 / 2 / 3</div>

      <div style={{ position: 'relative', width: '140px', height: '140px', margin: '16px auto' }}>
        <div style={{
          width: '140px', height: '140px', borderRadius: '50%',
          background: gradient,
        }} />
        {/* Hole */}
        <div style={{
          position: 'absolute', top: '50px', left: '50px',
          width: '40px', height: '40px', borderRadius: '50%',
          background: '#080c10',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: '10px', color: '#666', fontFamily: 'var(--font-mono)', textAlign: 'center', lineHeight: 1.3, whiteSpace: 'pre' }}>
            {hovered !== null ? `${SCOPES[hovered].pct}%` : '695Mt\ntotal'}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
        {SCOPES.map((s, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '3px 4px', cursor: 'default',
              background: hovered === i ? '#0d1117' : 'transparent',
              border: hovered === i ? `1px solid ${s.color}` : '1px solid transparent',
            }}
          >
            <div style={{ width: '12px', height: '12px', background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: '11px', color: '#f2ead8', fontFamily: 'var(--font-mono)', flex: 1 }}>{s.label}</span>
            <span style={{ fontSize: '11px', color: s.color, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{s.value}Mt</span>
          </div>
        ))}
      </div>

      {hovered !== null && (
        <div style={{
          marginTop: '6px', width: '100%', background: '#0d1117',
          border: `1px solid ${SCOPES[hovered].color}`,
          padding: '4px 6px', fontSize: '11px', color: '#f2ead8',
          fontFamily: 'var(--font-mono)', lineHeight: 1.5,
        }}>
          {SCOPES[hovered].desc}
        </div>
      )}
    </div>
  )
}
