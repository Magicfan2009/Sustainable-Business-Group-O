import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Paperclip from '../components/Paperclip'
import PageNav from '../components/PageNav'
import { getSectionData } from '../data/sections'
import DunphyTimeline from '../components/charts/DunphyTimeline'
import ScopeDonut from '../components/charts/ScopeDonut'
import NetZeroProjection from '../components/charts/NetZeroProjection'
import TBLScorecard from '../components/charts/TBLScorecard'
import CompetitorRadar from '../components/charts/CompetitorRadar'
import NetZeroTimeline from '../components/charts/NetZeroTimeline'
import StrategicRoadmap from '../components/charts/StrategicRoadmap'
import './ReadingScreen.css'

export default function ReadingScreen({ sectionCode, onBack }) {
  const section = getSectionData(sectionCode)
  const [pageIndex, setPageIndex] = useState(0)
  const [pendingIndex, setPendingIndex] = useState(null)
  const [chartOpen, setChartOpen] = useState(false)
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
    setChartOpen(false)
    animatingRef.current = false
  }, [sectionCode])

  function getChart() {
    if (sectionCode === 'SEC-01') return <DunphyTimeline />
    if (sectionCode === 'SEC-02') return pageIndex === 0 ? <ScopeDonut /> : <NetZeroProjection />
    if (sectionCode === 'SEC-03') return <TBLScorecard />
    if (sectionCode === 'SEC-04') return pageIndex === 0 ? <CompetitorRadar /> : <NetZeroTimeline />
    if (sectionCode === 'SEC-05') return <StrategicRoadmap />
    return null
  }
  const chart = getChart()

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

      {/* Mini tablet prop — appears at right if section has a chart */}
      {chart && !chartOpen && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.4 }}
          onClick={() => setChartOpen(true)}
          style={{
            position: 'absolute',
            right: 'max(16px, calc(50% - 420px))',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {/* Mini tablet SVG */}
          <svg viewBox="0 0 110 150" width="90" height="123" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="108" height="148" rx="12" fill="#c8cdd8" stroke="#9aa0aa" strokeWidth="1.5"/>
            <rect x="4" y="4" width="102" height="142" rx="10" fill="none" stroke="rgba(232,160,32,0.3)" strokeWidth="0.75"/>
            <rect x="8" y="20" width="94" height="106" rx="4" fill="url(#miniScreenBg)"/>
            <circle cx="55" cy="10" r="3.5" fill="#8a9099" stroke="#6a7080" strokeWidth="0.75"/>
            <circle cx="55" cy="137" r="7" fill="#8a9099" stroke="#6a7080" strokeWidth="1"/>
            <circle cx="55" cy="137" r="5" fill="none" stroke="#8a9099" strokeWidth="0.75"/>
            <defs>
              <linearGradient id="miniScreenBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e8eef5"/>
                <stop offset="100%" stopColor="#d0dae8"/>
              </linearGradient>
            </defs>
          </svg>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: 'rgba(0,102,204,0.8)', letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>view chart</span>
        </motion.div>
      )}

      {/* Chart overlay — landscape tablet */}
      <AnimatePresence>
        {chartOpen && (
          <motion.div
            key="chart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setChartOpen(false)}
            style={{
              position: 'absolute', inset: 0, zIndex: 10,
              background: 'rgba(10, 10, 10, 0.75)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(2px)',
            }}
          >
            {/* Tablet shell — landscape */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: 'min(86vw, 780px)',
                height: 'min(58vh, 520px)',
                background: '#c8cdd8',
                borderRadius: '18px',
                border: '2px solid #9aa0aa',
                boxShadow: '0 0 0 1px #9aa0aa, 0 24px 60px rgba(0,30,80,0.25)',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              {/* Amber bezel ring */}
              <div style={{
                position: 'absolute', inset: '5px', borderRadius: '14px',
                border: '1px solid rgba(0,102,204,0.25)', pointerEvents: 'none', zIndex: 2,
              }} />
              {/* Camera left */}
              <div style={{
                position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#8a9099', border: '1px solid #6a7080', zIndex: 3,
              }} />
              {/* Home button right */}
              <div style={{
                position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                width: '38px', height: '38px', borderRadius: '50%',
                background: '#b8bec8', border: '2px solid #8a90a0', zIndex: 3,
              }} />
              {/* Screen */}
              <div style={{
                position: 'absolute',
                top: '12px', left: '32px', right: '60px', bottom: '12px',
                background: '#f5f7fa', borderRadius: '6px', overflow: 'hidden',
              }}>
                {chart}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
