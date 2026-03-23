import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './charts.css'

const WAVES = [
  { label: 'Rejection', period: 'Pre-1990s', color: '#666', desc: 'Profit maximisation with minimal environmental consideration. Sustainability treated as irrelevant to business strategy.' },
  { label: 'Compliance', period: '1990–2015', color: '#cc4400', desc: '⚠ Meeting legal minimums only. The 2015 Dieselgate defeat device scandal exposed the catastrophic risk of compliance-only thinking.', highlight: true },
  { label: 'Transformation', period: '2016–Present', color: '#e8a020', desc: 'The "regenerate+" strategy. VW reinterpreted as an integral part of society — sustainability embedded at the strategic core.', current: true },
]

export default function DunphyTimeline() {
  const [open, setOpen] = useState(null)
  return (
    <div className="chart" style={{ justifyContent: 'flex-start' }}>
      <div className="chart__title">Dunphy et al. (2003) — Waves of Sustainability</div>
      <div style={{ position: 'relative', width: '100%', marginTop: '24px' }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          style={{ position: 'absolute', top: '18px', left: '18px', right: '18px', height: '2px', background: '#333', transformOrigin: 'left' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          {WAVES.map((w, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.2 + i * 0.18 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%', cursor: 'pointer' }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div style={{ position: 'relative', width: '36px', height: '36px' }}>
                {w.current && (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${w.color}` }}
                  />
                )}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: w.color, boxShadow: w.current ? `0 0 12px ${w.color}` : '2px 2px 0 #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {open === i && <span style={{ color: '#000', fontSize: '14px', fontWeight: 700 }}>✕</span>}
                </motion.div>
              </div>
              <div style={{ marginTop: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: w.color, letterSpacing: '0.08em', fontWeight: 700 }}>{w.label}</div>
                <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#666', marginTop: '2px' }}>{w.period}</div>
                {w.current && <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: '8px', color: '#e8a020', marginTop: '3px' }}>▲ YOU ARE HERE</motion.div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            key={open}
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            style={{ marginTop: '16px', width: '100%', background: '#0d1117', border: `1px solid ${WAVES[open].color}`, padding: '10px 12px', overflow: 'hidden' }}
          >
            <div style={{ fontSize: '12px', color: WAVES[open].color, fontWeight: 700, marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>{WAVES[open].label}</div>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#f2ead8', lineHeight: 1.6 }}>{WAVES[open].desc}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
