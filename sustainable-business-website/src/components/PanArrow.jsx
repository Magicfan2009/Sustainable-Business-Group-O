import './PanArrow.css'

export default function PanArrow({ direction, onClick, panning, label }) {
  function handleClick() {
    if (panning?.current) return
    onClick()
  }
  return (
    <button
      className={`pan-arrow pan-arrow--${direction}${panning?.current ? ' pan-arrow--disabled' : ''}`}
      onClick={handleClick}
      aria-label={label || `Pan ${direction}`}
    >
      {direction === 'left' && <span className="pan-arrow__chevron">‹</span>}
      {label && <span className="pan-arrow__label">{label}</span>}
      {direction === 'right' && <span className="pan-arrow__chevron">›</span>}
    </button>
  )
}
