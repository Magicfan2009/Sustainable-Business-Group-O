import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import './charts.css'

const WAVES = [
  {
    label: 'Rejection',
    period: 'Pre-1990s',
    color: '#666',
    desc: 'Profit maximisation with minimal environmental consideration. Sustainability treated as irrelevant to business strategy.',
  },
  {
    label: 'Compliance',
    period: '1990–2015',
    color: '#cc4400',
    desc: '⚠ Meeting legal minimums only. The 2015 Dieselgate defeat device scandal exposed the catastrophic risk of compliance-only thinking.',
    highlight: true,
  },
  {
    label: 'Transformation',
    period: '2016–Present',
    color: '#e8a020',
    desc: 'The "regenerate+" strategy. VW reinterpreted as an integral part of society — sustainability embedded at the strategic core.',
    current: true,
  },
]

export default function DunphyTimeline() {
  const [open, setOpen] = useState(null)
  const nodesRef = useRef([])

  useEffect(() => {
    gsap.from(nodesRef.current, {
      scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(1.7)',
      stagger: 0.15, delay: 0.1,
    })
  }, [])

  return (
    <div className="chart" style={{ justifyContent: 'flex-start' }}>
      <div className="chart__title">Dunphy et al. (2003) — Waves of Sustainability</div>

      {/* Timeline line + nodes */}
      <div style={{ position: 'relative', width: '100%', marginTop: '16px' }}>
        {/* Connecting line */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px', right: '12px',
          height: '2px', background: '#333',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          {WAVES.map((w, i) => (
            <div
              key={i}
              ref={el => nodesRef.current[i] = el}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%', cursor: 'pointer' }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {/* Node circle */}
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: w.color, border: `2px solid ${w.color}`,
                boxShadow: w.current ? `0 0 8px ${w.color}` : '2px 2px 0 #000',
                position: 'relative', zIndex: 1, flexShrink: 0,
              }}>
                {w.current && (
                  <div style={{
                    position: 'absolute', inset: '-4px', borderRadius: '50%',
                    border: `1px solid ${w.color}`, opacity: 0.5,
                    animation: 'led-pulse 2s ease-in-out infinite',
                  }} />
                )}
              </div>

              <div style={{ marginTop: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '7px', fontFamily: 'var(--font-mono)', color: w.color, letterSpacing: '0.1em', fontWeight: 700 }}>{w.label}</div>
                <div style={{ fontSize: '6px', fontFamily: 'var(--font-mono)', color: '#666', marginTop: '1px' }}>{w.period}</div>
                {w.current && <div style={{ fontSize: '6px', color: '#e8a020', marginTop: '2px' }}>▲ YOU ARE HERE</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded tooltip */}
      {open !== null && (
        <div style={{
          marginTop: '12px', width: '100%',
          background: '#0d1117', border: `1px solid ${WAVES[open].color}`,
          padding: '6px 8px', fontSize: '7px', fontFamily: 'var(--font-mono)',
          color: '#f2ead8', lineHeight: 1.6, letterSpacing: '0.04em',
        }}>
          <div style={{ color: WAVES[open].color, fontWeight: 700, marginBottom: '3px', fontSize: '8px' }}>{WAVES[open].label}</div>
          {WAVES[open].desc}
        </div>
      )}
    </div>
  )
}
