import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import './charts.css'

const MILESTONES = [
  { year: 2025, items: ['EU CO₂ compliance (0g margin)', 'Publish S-Rating Tier 1 data', 'Submit Scope 3 to SBTi'] },
  { year: 2026, items: ['Launch ID.2 BEV <€25,000', 'Achieve CDP "A" rating', 'Sustainability Council report'] },
  { year: 2027, items: ['100% renewable EU plants', 'Tier 2 S-Rating pilot', 'Zero certified child labour incidents'] },
  { year: 2028, items: ['30% BEV share globally', '20% circular materials', 'Scope 1+2 −35% vs 2018'] },
  { year: 2030, items: ['Zero Impact Factory all EU sites', '−40% carbon/vehicle-km', 'Scope 1+2 −50% (SBTi target)'] },
  { year: 2035, items: ['100% BEV in Europe — NO ICE', '40% circular materials target', 'Net Zero preparation phase'] },
]

export default function StrategicRoadmap() {
  const [open, setOpen] = useState(null)
  const nodesRef = useRef([])

  useEffect(() => {
    gsap.from(nodesRef.current, {
      scale: 0, opacity: 0, duration: 0.35, ease: 'back.out(1.7)',
      stagger: 0.1, delay: 0.1,
    })
  }, [])

  function toggle(i) {
    setOpen(open === i ? null : i)
  }

  return (
    <div className="chart" style={{ justifyContent: 'flex-start', padding: '6px 4px' }}>
      <div className="chart__title">Strategic Roadmap 2025–2035</div>

      {/* Horizontal node row */}
      <div style={{ position: 'relative', width: '100%', marginTop: '12px' }}>
        <div style={{ position: 'absolute', top: '11px', left: '8px', right: '8px', height: '2px', background: '#333' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              ref={el => nodesRef.current[i] = el}
              onClick={() => toggle(i)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', width: '15%' }}
            >
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%',
                background: open === i ? '#e8a020' : '#1a1a1a',
                border: `2px solid ${open === i ? '#e8a020' : '#444'}`,
                boxShadow: open === i ? '0 0 6px #e8a020' : '2px 2px 0 #000',
                zIndex: 1, transition: 'background 150ms ease, border-color 150ms ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '5px', color: open === i ? '#000' : '#888', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{m.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded detail */}
      {open !== null && (
        <div style={{
          marginTop: '8px', width: '100%',
          background: '#0d1117', border: '1px solid #e8a020',
          padding: '5px 7px', overflow: 'hidden',
        }}>
          <div style={{ fontSize: '8px', color: '#e8a020', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '4px' }}>{MILESTONES[open].year}</div>
          {MILESTONES[open].items.map((item, i) => (
            <div key={i} style={{ fontSize: '7px', color: '#f2ead8', fontFamily: 'var(--font-mono)', marginBottom: '3px', lineHeight: 1.4 }}>
              › {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
