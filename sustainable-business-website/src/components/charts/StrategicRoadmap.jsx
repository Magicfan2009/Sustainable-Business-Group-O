import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
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
  return (
    <div className="chart" style={{ justifyContent: 'flex-start', padding: '6px 4px' }}>
      <div className="chart__title">Strategic Roadmap 2025–2035</div>
      <div style={{ position: 'relative', width: '100%', marginTop: '20px' }}>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ position: 'absolute', top: '17px', left: '8px', right: '8px', height: '2px', background: '#333', transformOrigin: 'left' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {MILESTONES.map((m, i) => (
            <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.15 + i * 0.1 }}
              onClick={() => setOpen(open === i ? null : i)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', width: '15%' }}
            >
              <motion.div
                animate={{ background: open === i ? '#e8a020' : '#1a1a1a', borderColor: open === i ? '#e8a020' : '#444', boxShadow: open === i ? '0 0 10px #e8a020' : '2px 2px 0 #000' }}
                whileHover={{ scale: 1.2, boxShadow: '0 0 8px rgba(232,160,32,0.5)' }}
                whileTap={{ scale: 0.9 }}
                style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid #444', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <span style={{ fontSize: '8px', color: open === i ? '#000' : '#888', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{m.year}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div key={open} initial={{ opacity: 0, height: 0, y: -8 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            style={{ marginTop: '10px', width: '100%', background: '#0d1117', border: '1px solid #e8a020', padding: '8px 12px', overflow: 'hidden' }}
          >
            <div style={{ fontSize: '12px', color: '#e8a020', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>{MILESTONES[open].year}</div>
            {MILESTONES[open].items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                style={{ fontSize: '11px', color: '#f2ead8', fontFamily: 'var(--font-mono)', marginBottom: '4px', lineHeight: 1.5 }}
              >› {item}</motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
