import { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Paperclip from '../components/Paperclip'
import PageNav from '../components/PageNav'
import { getSectionData } from '../data/sections'
import './ReadingScreen.css'

export default function ReadingScreen({ sectionCode, onBack }) {
  const section = getSectionData(sectionCode)
  const [pageIndex, setPageIndex] = useState(0)
  const [pendingIndex, setPendingIndex] = useState(null)
  const [pageDirection, setPageDirection] = useState(1)
  const wrapperRef = useRef(null)
  const docRef = useRef(null)
  const overlayRef = useRef(null)
  const animatingRef = useRef(false)

  const pages = section.pages
  const totalPages = pages.length
  const currentPage = pages[pageIndex]

  // Entry animation — document rises from below
  useGSAP(() => {
    gsap.from(docRef.current, {
      y: 120,
      opacity: 0,
      duration: 0.45,
      ease: 'back.out(1.7)',
    })
    gsap.from(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
    })
  }, { scope: wrapperRef })

  // Page-in animation whenever pageIndex or pendingIndex settles
  useEffect(() => {
    if (pendingIndex === null) return
    // New page has rendered — animate it in
    gsap.fromTo(docRef.current,
      { y: pageDirection > 0 ? 30 : -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.22, ease: 'back.out(1.7)', onComplete: () => {
        animatingRef.current = false
        setPendingIndex(null)
      }}
    )
  }, [pageIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  function animatePageChange(direction, nextIndex) {
    if (animatingRef.current) return
    animatingRef.current = true
    setPageDirection(direction)

    // Lift then slide out
    const tl = gsap.timeline({
      onComplete: () => {
        // Now swap the page — triggers useEffect above
        setPageIndex(nextIndex)
        setPendingIndex(nextIndex)
      },
    })
    tl.to(docRef.current, { y: -6, boxShadow: '10px 10px 0 0 #000', duration: 0.12, ease: 'power2.out' })
    tl.to(docRef.current, { y: direction > 0 ? -24 : 24, opacity: 0, duration: 0.18, ease: 'power2.in' })
  }

  function goNext() {
    if (pageIndex >= totalPages - 1 || animatingRef.current) return
    animatePageChange(1, pageIndex + 1)
  }

  function goPrev() {
    if (pageIndex <= 0 || animatingRef.current) return
    animatePageChange(-1, pageIndex - 1)
  }

  function handleBack() {
    if (animatingRef.current) return
    animatingRef.current = true
    const tl = gsap.timeline({ onComplete: onBack })
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2 })
    tl.to(docRef.current, { y: 140, opacity: 0, duration: 0.35, ease: 'power2.in' }, '<')
  }

  // Reset page index when section changes
  useEffect(() => {
    setPageIndex(0)
    setPendingIndex(null)
    animatingRef.current = false
  }, [sectionCode])

  return (
    <div className="reading-screen" ref={wrapperRef}>
      {/* Dark overlay */}
      <div className="reading-screen__overlay" ref={overlayRef} />

      {/* Back button — outside the clipped doc so it's always visible */}
      <button className="reading-screen__back" onClick={handleBack}>
        ← BACK
      </button>

      <div className="reading-doc" ref={docRef}>
        {/* Paperclip — top left */}
        <div className="reading-doc__paperclip">
          <Paperclip />
        </div>

        {/* Header bar */}
        <div className="reading-doc__header">
          <span className="reading-doc__section-code">{sectionCode}</span>
          <span className="reading-doc__sep">·</span>
          <span className="reading-doc__section-title">{section.title}</span>
        </div>

        {/* Page content */}
        <div className="reading-doc__body">
          {currentPage}
        </div>

        {/* Page navigation */}
        <div className="reading-doc__footer">
          <PageNav
            current={pageIndex + 1}
            total={totalPages}
            onPrev={goPrev}
            onNext={goNext}
          />
        </div>
      </div>
    </div>
  )
}
