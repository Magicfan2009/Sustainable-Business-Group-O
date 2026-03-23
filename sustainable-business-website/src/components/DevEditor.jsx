import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * DevEditor
 * ---------
 * Press Ctrl+Shift+E to enter/exit edit mode.
 *
 * Usage:
 *   <DevEditor
 *     items={[
 *       { id: 'frame', label: 'Circula Frame', ref: frameRef },
 *       { id: 'cactus', label: 'Cactus', ref: cactusRef },
 *       ...
 *     ]}
 *   />
 *
 * Each item.ref must point to the real DOM element you want to control.
 * In edit mode, the element gets:
 *   position: fixed, left, top, width, height applied directly via style.
 * On deactivate, styles are removed and original layout resumes.
 * The output panel shows values to copy to Claude.
 */

const COLORS = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c']

function useDrag(onMove) {
  return useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY

    function move(ev) { onMove(ev.clientX - startX, ev.clientY - startY) }
    function up() {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }, [onMove])
}

function Overlay({ id, label, color, rect, onRectChange }) {
  const startRect = useRef(null)

  const onDragDown = useDrag(useCallback((dx, dy) => {
    onRectChange(id, {
      ...startRect.current,
      left: startRect.current.left + dx,
      top: startRect.current.top + dy,
    })
  }, [id, onRectChange]))

  const onResizeDown = useDrag(useCallback((dx, dy) => {
    onRectChange(id, {
      ...startRect.current,
      width: Math.max(20, startRect.current.width + dx),
      height: Math.max(20, startRect.current.height + dy),
    })
  }, [id, onRectChange]))

  function captureStart(e) {
    startRect.current = { ...rect }
  }

  return (
    <div
      onMouseDown={(e) => { captureStart(e); onDragDown(e) }}
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
        position: 'absolute',
        top: -22,
        left: 0,
        background: color,
        color: '#fff',
        fontSize: 11,
        fontFamily: 'monospace',
        fontWeight: 700,
        padding: '2px 7px',
        whiteSpace: 'nowrap',
        borderRadius: '3px 3px 0 0',
        pointerEvents: 'none',
        letterSpacing: '0.06em',
      }}>
        {label}
      </div>

      {/* Resize corner */}
      <div
        onMouseDown={(e) => { e.stopPropagation(); startRect.current = { ...rect }; onResizeDown(e) }}
        style={{
          position: 'absolute',
          bottom: -1,
          right: -1,
          width: 16,
          height: 16,
          background: color,
          cursor: 'se-resize',
          zIndex: 99999,
          borderRadius: '0 0 3px 0',
        }}
      />
    </div>
  )
}

export default function DevEditor({ items }) {
  const [active, setActive] = useState(false)
  // rects[id] = { left, top, width, height } in viewport px
  const [rects, setRects] = useState({})
  const [copied, setCopied] = useState(false)
  // Store original position/size styles to restore on deactivate
  const origStyles = useRef({})

  // Toggle on Ctrl+Shift+E
  useEffect(() => {
    function onKey(e) {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        setActive(a => !a)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // On activate: measure each element and snapshot its bounding rect
  useEffect(() => {
    if (active) {
      const newRects = {}
      items.forEach(item => {
        const el = item.ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        newRects[item.id] = { left: r.left, top: r.top, width: r.width, height: r.height }
        // Save original styles
        origStyles.current[item.id] = {
          position: el.style.position,
          left: el.style.left,
          top: el.style.top,
          width: el.style.width,
          height: el.style.height,
          transform: el.style.transform,
          margin: el.style.margin,
          marginTop: el.style.marginTop,
          marginBottom: el.style.marginBottom,
        }
        // Override to fixed positioning so we control it
        el.style.position = 'fixed'
        el.style.left = r.left + 'px'
        el.style.top = r.top + 'px'
        el.style.width = r.width + 'px'
        el.style.height = r.height + 'px'
        el.style.transform = 'none'
        el.style.margin = '0'
        el.style.zIndex = '99997'
      })
      setRects(newRects)
    } else {
      // Restore original styles
      items.forEach(item => {
        const el = item.ref.current
        if (!el || !origStyles.current[item.id]) return
        const orig = origStyles.current[item.id]
        el.style.position = orig.position
        el.style.left = orig.left
        el.style.top = orig.top
        el.style.width = orig.width
        el.style.height = orig.height
        el.style.transform = orig.transform
        el.style.margin = orig.margin
        el.style.marginTop = orig.marginTop
        el.style.marginBottom = orig.marginBottom
        el.style.zIndex = ''
      })
    }
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleRectChange = useCallback((id, newRect) => {
    setRects(prev => ({ ...prev, [id]: newRect }))
    // Also move the real element
    const item = items.find(i => i.id === id)
    if (!item?.ref.current) return
    const el = item.ref.current
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
      if (!r) return `  ${item.id}: (not measured)`
      const leftPct = ((r.left / vw) * 100).toFixed(1)
      const topPct = ((r.top / vh) * 100).toFixed(1)
      return [
        `  ${item.label}:`,
        `    left: ${Math.round(r.left)}px  (${leftPct}vw)`,
        `    top:  ${Math.round(r.top)}px  (${topPct}vh)`,
        `    width:  ${Math.round(r.width)}px`,
        `    height: ${Math.round(r.height)}px`,
      ].join('\n')
    }).join('\n\n')
  }

  function handleCopy() {
    navigator.clipboard.writeText(buildOutput()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (!active) return null

  return (
    <>
      {/* Dim overlay to signal edit mode */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99990,
        background: 'rgba(0,0,0,0.18)',
        pointerEvents: 'none',
      }} />

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

      {/* Output panel */}
      <div style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(8,8,18,0.97)',
        border: '1px solid #333',
        borderRadius: 8,
        padding: '12px 16px',
        zIndex: 100001,
        fontFamily: 'monospace',
        fontSize: 12,
        color: '#e0e0e0',
        maxWidth: '90vw',
        minWidth: 340,
        boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: '#888', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            ✦ Dev Editor Active
          </span>
          <button
            onClick={handleCopy}
            style={{
              background: copied ? '#2ecc71' : '#0066cc',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '5px 14px',
              fontFamily: 'monospace',
              fontSize: 11,
              cursor: 'pointer',
              fontWeight: 700,
              letterSpacing: '0.08em',
              transition: 'background 0.2s',
            }}
          >
            {copied ? '✓ COPIED!' : 'COPY VALUES'}
          </button>
        </div>
        <pre style={{ margin: 0, color: '#7dd3fc', lineHeight: 1.7, whiteSpace: 'pre' }}>
          {buildOutput()}
        </pre>
        <div style={{ marginTop: 10, color: '#555', fontSize: 10, borderTop: '1px solid #222', paddingTop: 8 }}>
          Drag coloured box → move element · Drag corner square → resize · Ctrl+Shift+E to exit
        </div>
      </div>
    </>
  )
}
