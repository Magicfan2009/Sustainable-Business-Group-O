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
  }, { scope: docRef })

  function animatePageChange(direction, callback) {
    if (animatingRef.current) return
    animatingRef.current = true

    const tl = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false
        callback()
        // Rise in
        gsap.from(docRef.current, {
          y: direction > 0 ? 24 : -24,
          opacity: 0,
          duration: 0.22,
          ease: 'back.out(1.7)',
        })
      },
    })

    // Lift
    tl.to(docRef.current, {
      y: -6,
      boxShadow: '10px 10px 0 0 #000',
      duration: 0.12,
      ease: 'power2.out',
    })
    // Slide back down into stack
    tl.to(docRef.current, {
      y: direction > 0 ? -20 : 20,
      opacity: 0,
      duration: 0.18,
      ease: 'power2.in',
    })
  }

  function goNext() {
    if (pageIndex >= totalPages - 1) return
    animatePageChange(1, () => setPageIndex(i => i + 1))
  }

  function goPrev() {
    if (pageIndex <= 0) return
    animatePageChange(-1, () => setPageIndex(i => i - 1))
  }

  function handleBack() {
    if (animatingRef.current) return
    const tl = gsap.timeline({ onComplete: onBack })
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2 })
    tl.to(docRef.current, { y: 140, opacity: 0, duration: 0.35, ease: 'power2.in' }, '<')
  }

  // Reset page index when section changes
  useEffect(() => {
    setPageIndex(0)
  }, [sectionCode])

  return (
    <div className="reading-screen">
      {/* Dark overlay behind the document, cabinet shows through */}
      <div className="reading-screen__overlay" ref={overlayRef} />

      <div className="reading-doc" ref={docRef}>
        {/* Back button */}
        <button className="reading-doc__back" onClick={handleBack}>
          ← BACK
        </button>

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
