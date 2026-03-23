import { useState, useEffect, useRef, useCallback } from 'react'

const COLORS = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c']

function startDrag(e, onMove) {
  e.preventDefault()
  e.stopPropagation()
  const sx = e.clientX, sy = e.clientY
  function move(ev) { onMove(ev.clientX - sx, ev.clientY - sy) }
  function up() {
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', up)
  }
  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', up)
}

function Overlay({ id, label, color, rect, onRectChange }) {
  const snapRect = useRef(rect)
  // Keep snapRect in sync so callbacks always close over fresh value
  snapRect.current = rect

  function handleDragDown(e) {
    if (e.target.dataset.resize) return // let resize handle it
    const { left, top, width, height } = snapRect.current
    startDrag(e, (dx, dy) => onRectChange(id, { left: left + dx, top: top + dy, width, height }))
  }

  function handleResizeDown(e) {
    e.preventDefault()
    e.stopPropagation()
    const { left, top, width, height } = snapRect.current
    startDrag(e, (dx, dy) => onRectChange(id, {
      left, top,
      width: Math.max(20, width + dx),
      height: Math.max(20, height + dy),
    }))
  }

  return (
    <div
      onMouseDown={handleDragDown}
      style={{
        position: 'fixed',
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        border: `2px dashed ${color}`,
        boxSizing: 'border-box',
        zIndex: 99998,
        cursor: 'move',
        userSelect: 'none',
        pointerEvents: 'all',
      }}
    >
      {/* Label tab */}
      <div style={{
        position: 'absolute', top: -22, left: 0,
        background: color, color: '#fff',
        fontSize: 11, fontFamily: 'monospace', fontWeight: 700,
        padding: '2px 7px', whiteSpace: 'nowrap',
        borderRadius: '3px 3px 0 0', pointerEvents: 'none',
        letterSpacing: '0.06em',
      }}>
        {label}
      </div>

      {/* Resize corner — data-resize marks it so drag handler skips it */}
      <div
        data-resize="true"
        onMouseDown={handleResizeDown}
        style={{
          position: 'absolute', bottom: -1, right: -1,
          width: 18, height: 18,
          background: color, cursor: 'se-resize',
          zIndex: 99999, borderRadius: '0 0 3px 0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 900,
          userSelect: 'none',
        }}
      >
        ↘
      </div>
    </div>
  )
}

export default function DevEditor({ items }) {
  const [active, setActive] = useState(false)
  const [rects, setRects] = useState({})
  const [copied, setCopied] = useState(false)
  const origStyles = useRef({})

  useEffect(() => {
    function onKey(e) {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') setActive(a => !a)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (active) {
      const newRects = {}
      items.forEach(item => {
        const el = item.ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        newRects[item.id] = { left: r.left, top: r.top, width: r.width, height: r.height }
        origStyles.current[item.id] = {
          position: el.style.position,
          left: el.style.left,
          top: el.style.top,
          width: el.style.width,
          height: el.style.height,
          transform: el.style.transform,
          margin: el.style.margin,
          bottom: el.style.bottom,
          right: el.style.right,
          zIndex: el.style.zIndex,
        }
        el.style.position = 'fixed'
        el.style.left = r.left + 'px'
        el.style.top = r.top + 'px'
        el.style.width = r.width + 'px'
        el.style.height = r.height + 'px'
        el.style.transform = 'none'
        el.style.margin = '0'
        el.style.bottom = 'auto'
        el.style.right = 'auto'
        el.style.zIndex = '99997'
      })
      setRects(newRects)
    } else {
      items.forEach(item => {
        const el = item.ref.current
        if (!el || !origStyles.current[item.id]) return
        const o = origStyles.current[item.id]
        el.style.position = o.position
        el.style.left = o.left
        el.style.top = o.top
        el.style.width = o.width
        el.style.height = o.height
        el.style.transform = o.transform
        el.style.margin = o.margin
        el.style.bottom = o.bottom
        el.style.right = o.right
        el.style.zIndex = o.zIndex
      })
    }
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleRectChange = useCallback((id, newRect) => {
    setRects(prev => ({ ...prev, [id]: newRect }))
    const item = items.find(i => i.id === id)
    const el = item?.ref.current
    if (!el) return
    el.style.left = newRect.left + 'px'
    el.style.top = newRect.top + 'px'
    el.style.width = newRect.width + 'px'
    el.style.height = newRect.height + 'px'
  }, [items])

  function buildOutput() {
    const vw = window.innerWidth
    const vh = window.innerHeight
    return items.map(item => {
      const r = rects[item.id]
      if (!r) return `  ${item.label}: (not measured)`
      return [
        `  ${item.label}:`,
        `    left:   ${Math.round(r.left)}px  (${((r.left / vw) * 100).toFixed(1)}vw)`,
        `    top:    ${Math.round(r.top)}px  (${((r.top / vh) * 100).toFixed(1)}vh)`,
        `    width:  ${Math.round(r.width)}px`,
        `    height: ${Math.round(r.height)}px`,
      ].join('\n')
    }).join('\n\n')
  }

  function handleCopy() {
    navigator.clipboard.writeText(buildOutput()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  if (!active) return null

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 99990, background: 'rgba(0,0,0,0.15)', pointerEvents: 'none' }} />

      {items.map((item, i) => rects[item.id] && (
        <Overlay
          key={item.id}
          id={item.id}
          label={item.label}
          color={COLORS[i % COLORS.length]}
          rect={rects[item.id]}
          onRectChange={handleRectChange}
        />
      ))}

      <div style={{
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(8,8,18,0.97)', border: '1px solid #333', borderRadius: 8,
        padding: '12px 16px', zIndex: 100001, fontFamily: 'monospace', fontSize: 12,
        color: '#e0e0e0', maxWidth: '90vw', minWidth: 360,
        boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: '#888', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            ✦ Dev Editor — Ctrl+Shift+E to exit
          </span>
          <button onClick={handleCopy} style={{
            background: copied ? '#2ecc71' : '#0066cc', color: '#fff', border: 'none',
            borderRadius: 4, padding: '5px 14px', fontFamily: 'monospace', fontSize: 11,
            cursor: 'pointer', fontWeight: 700, letterSpacing: '0.08em', transition: 'background 0.2s',
          }}>
            {copied ? '✓ COPIED!' : 'COPY VALUES'}
          </button>
        </div>
        <pre style={{ margin: 0, color: '#7dd3fc', lineHeight: 1.7, whiteSpace: 'pre' }}>
          {buildOutput()}
        </pre>
        <div style={{ marginTop: 10, color: '#555', fontSize: 10, borderTop: '1px solid #222', paddingTop: 8 }}>
          Drag box → move · Drag ↘ corner → resize · Copy values → paste to Claude
        </div>
      </div>
    </>
  )
}
