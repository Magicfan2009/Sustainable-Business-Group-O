import './PanArrow.css'

export default function PanArrow({ direction, onClick, panning }) {
  function handleClick() {
    if (panning?.current) return
    onClick()
  }
  return (
    <button
      className={`pan-arrow pan-arrow--${direction}${panning?.current ? ' pan-arrow--disabled' : ''}`}
      onClick={handleClick}
      aria-label={`Pan ${direction}`}
    >
      {direction === 'left' ? '‹' : '›'}
    </button>
  )
}
