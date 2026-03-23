import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import PanArrow from '../components/PanArrow'
import './CabinetScreen.css'

const DRAWERS = [
  { code: 'SEC-01', label: 'OVERVIEW' },
  { code: 'SEC-02', label: 'CARBON ACCOUNTING' },
  { code: 'SEC-03', label: 'TRIPLE BOTTOM LINE' },
  { code: 'SEC-04', label: 'BENCHMARKING' },
  { code: 'SEC-05', label: 'STRATEGY 2035' },
  { code: 'SEC-06', label: 'EXECUTIVE SUMMARY' },
]

export default function CabinetScreen({ onOpenFile, onOpenAI, onHome, onPanLeft, onPanRight, panning }) {
  const sceneRef = useRef(null)

  useGSAP(() => {
    gsap.from(sceneRef.current, {
      y: 60,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.4)',
    })
  }, { scope: sceneRef })

  return (
    <div className="cabinet-screen" style={{ position: 'relative' }}>
      <PanArrow direction="left" onClick={onPanLeft} panning={panning} />
      <PanArrow direction="right" onClick={onPanRight} panning={panning} />

      <div className="cabinet-scene" ref={sceneRef}>

        {/* ── Isometric cabinet shell ── */}
        <div className="cabinet-iso">

          {/* Top face */}
          <div className="cabinet-iso__top" />

          {/* Nametag — floats above the cabinet */}
          <div className="cabinet-nametag">
            GROUP O · SUSTAINABILITY ADVISORY · VW GROUP
          </div>

          {/* Right side face */}
          <div className="cabinet-iso__side" />

          {/* Front face — all drawers live here */}
          <div className="cabinet-iso__front">
            {DRAWERS.map((drawer, i) => (
              <button
                key={drawer.code}
                className="cabinet-drawer"
                onClick={() => onOpenFile(drawer.code)}
              >
                {/* Drawer inset shadow line at top */}
                <div className="cabinet-drawer__inset" />

                {/* Handle bar */}
                <div className="cabinet-drawer__handle-wrap">
                  <div className="cabinet-drawer__handle" />
                </div>

                {/* Metal nametag */}
                <div className="cabinet-drawer__tag">
                  <span className="cabinet-drawer__tag-screw cabinet-drawer__tag-screw--tl" />
                  <span className="cabinet-drawer__tag-screw cabinet-drawer__tag-screw--tr" />
                  <span className="cabinet-drawer__tag-screw cabinet-drawer__tag-screw--bl" />
                  <span className="cabinet-drawer__tag-screw cabinet-drawer__tag-screw--br" />
                  <div className="cabinet-drawer__labels">
                    <span className="cabinet-drawer__code">{drawer.code}</span>
                    <span className="cabinet-drawer__name">{drawer.label}</span>
                  </div>
                </div>

                {/* Arrow */}
                <span className="cabinet-drawer__arrow">›</span>
              </button>
            ))}
          </div>

        </div>

        {/* Floor shadow */}
        <div className="cabinet-shadow" />

      </div>

      {/* Bottom links */}
      <div className="cabinet-screen__links">
        <button className="cabinet-screen__home-btn" onClick={onHome}>
          ← HOME
        </button>
        <button className="cabinet-screen__ai-link" onClick={onOpenAI}>
          AI USE STATEMENT
        </button>
      </div>
    </div>
  )
}
