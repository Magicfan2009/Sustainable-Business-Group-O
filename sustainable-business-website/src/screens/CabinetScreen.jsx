import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './CabinetScreen.css'

const DRAWERS = [
  { code: 'SEC-01', label: 'OVERVIEW' },
  { code: 'SEC-02', label: 'CARBON ACCOUNTING' },
  { code: 'SEC-03', label: 'TRIPLE BOTTOM LINE' },
  { code: 'SEC-04', label: 'BENCHMARKING' },
  { code: 'SEC-05', label: 'STRATEGY 2035' },
  { code: 'SEC-06', label: 'EXECUTIVE SUMMARY' },
]

export default function CabinetScreen({ onOpenFile, onOpenAI }) {
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
    <div className="cabinet-screen">
      <div className="cabinet-scene" ref={sceneRef}>
        <div className="cabinet-iso">

          {/* Front face — drawers */}
          <div className="cabinet-iso__front">
            {DRAWERS.map((drawer) => (
              <button
                key={drawer.code}
                className="cabinet-drawer"
                onClick={() => onOpenFile(drawer.code)}
              >
                <div className="cabinet-drawer__handle-wrap">
                  <div className="cabinet-drawer__handle" />
                </div>
                <div className="cabinet-drawer__labels">
                  <span className="cabinet-drawer__code">{drawer.code}</span>
                  <span className="cabinet-drawer__name">{drawer.label}</span>
                </div>
                <span className="cabinet-drawer__arrow">›</span>
              </button>
            ))}
          </div>

          {/* Back face */}
          <div className="cabinet-iso__back" />

          {/* Top face */}
          <div className="cabinet-iso__top" />

          {/* Bottom face */}
          <div className="cabinet-iso__bottom-face" />

          {/* Right side */}
          <div className="cabinet-iso__right" />

          {/* Left side */}
          <div className="cabinet-iso__left" />

        </div>
      </div>

      <button className="cabinet-screen__ai-link" onClick={onOpenAI}>
        AI USE STATEMENT
      </button>
    </div>
  )
}
