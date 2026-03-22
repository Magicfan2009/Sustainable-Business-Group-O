import './PageNav.css'

export default function PageNav({ current, total, onPrev, onNext }) {
  const isFirst = current === 1
  const isLast = current === total

  return (
    <div className="page-nav">
      <button
        className={`page-nav__arrow${isFirst ? ' page-nav__arrow--hidden' : ''}`}
        onClick={onPrev}
        disabled={isFirst}
        aria-label="Previous page"
      >
        ‹
      </button>

      <span className="page-nav__counter">
        {current} / {total}
      </span>

      <button
        className={`page-nav__arrow${isLast ? ' page-nav__arrow--hidden' : ''}`}
        onClick={onNext}
        disabled={isLast}
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  )
}
