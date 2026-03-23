import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './charts.css'

const SCOPES = [
  { label: 'Scope 1', value: 3.3, pct: 0.5, color: '#4ade80', desc: 'Direct emissions from manufacturing. −25% since 2019.' },
  { label: 'Scope 2', value: 4.2, pct: 0.6, color: '#e8a020', desc: 'Energy indirect (market-based). Purchased electricity and heat.' },
  { label: 'Scope 3', value: 688, pct: 98.9, color: '#cc2200', desc: '⚠ 92% is Category 11 (vehicles in use). EV transition is the primary lever.' },
]

export default function ScopeDonut() {
  const [hovered, setHovered] = useState(null)
  const gradient = `conic-gradient(#cc2200 0deg 356deg, #4ade80 356deg 357.8deg, #e8a020 357.8deg 360deg)`

  return (
    <div className="chart">
      <div className="chart__title">Emissions Profile — Scope 1 / 2 / 3</div>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.1 }}
        style={{ position: 'relative', width: '140px', height: '140px', margin: '16px auto' }}
      >
        <div style={{ width: '140px', height: '140px', borderRadius: '50%', background: gradient }} />
        <div style={{ position: 'absolute', top: '30px', left: '30px', width: '80px', height: '80px', borderRadius: '50%', background: '#080c10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={hovered ?? 'total'}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              style={{ fontSize: '10px', color: hovered !== null ? SCOPES[hovered].color : '#666', fontFamily: 'var(--font-mono)', textAlign: 'center', lineHeight: 1.3, whiteSpace: 'pre', fontWeight: 700 }}
            >
              {hovered !== null ? `${SCOPES[hovered].pct}%` : '695Mt\ntotal'}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {SCOPES.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 300, damping: 24 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 6px', cursor: 'default', background: hovered === i ? '#0d1117' : 'transparent', border: hovered === i ? `1px solid ${s.color}` : '1px solid transparent', borderRadius: '2px' }}
          >
            <motion.div whileHover={{ scale: 1.3 }} style={{ width: '12px', height: '12px', background: s.color, borderRadius: '2px', flexShrink: 0 }} />
            <span style={{ fontSize: '11px', color: '#f2ead8', fontFamily: 'var(--font-mono)', flex: 1 }}>{s.label}</span>
            <span style={{ fontSize: '11px', color: s.color, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{s.value}Mt</span>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key={hovered}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            style={{ marginTop: '8px', width: '100%', background: '#0d1117', border: `1px solid ${SCOPES[hovered].color}`, padding: '6px 8px', fontSize: '10px', color: '#f2ead8', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}
          >
            {SCOPES[hovered].desc}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
