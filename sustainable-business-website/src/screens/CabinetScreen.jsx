import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import PanArrow from '../components/PanArrow'
import './CabinetScreen.css'

export const DRAWERS = [
  { code: 'SEC-01', label: 'OVERVIEW' },
  { code: 'SEC-02', label: 'CARBON ACCOUNTING' },
  { code: 'SEC-03', label: 'TRIPLE BOTTOM LINE' },
  { code: 'SEC-04', label: 'BENCHMARKING' },
  { code: 'SEC-05', label: 'STRATEGY 2035' },
  { code: 'SEC-06', label: 'EXECUTIVE SUMMARY' },
]

export default function CabinetScreen({ onOpenFile, onOpenAI, onHome, onPanLeft, onPanRight, panning, nametagRef, frameRef, cactusRef, plantRef }) {
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
      <PanArrow direction="left" onClick={onPanLeft} panning={panning} label="Chart Tablet" />
      <PanArrow direction="right" onClick={onPanRight} panning={panning} label="Exec. Monitor" />

      <div className="cabinet-scene" ref={sceneRef}>

        {/* Decorations — inside scene so they scale with it on mobile */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
          {/* Picture frame — right of cabinet */}
          <div ref={frameRef} style={{ position: 'absolute', left: 'calc(100% + 70px)', top: '-10px', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '319px', height: '154px' }}>
            <div style={{ width: '6px', height: '10px', background: '#8a8a7a', borderRadius: '1px 1px 3px 3px', boxShadow: '0 2px 2px rgba(0,0,0,0.4)', flexShrink: 0 }} />
            <svg width="100%" height="28" viewBox="0 0 192 28" preserveAspectRatio="none" style={{ display: 'block', marginBottom: '-2px', flexShrink: 0 }}>
              <line x1="96" y1="0" x2="4" y2="26" stroke="#5a4a2a" strokeWidth="1.2" />
              <line x1="96" y1="0" x2="188" y2="26" stroke="#5a4a2a" strokeWidth="1.2" />
            </svg>
            <div style={{ width: '100%', flex: 1, minHeight: '40px', background: '#2a1f0f', border: '6px solid #4a3520', boxShadow: '3px 3px 0 #000, inset 0 0 0 2px #6a5030', overflow: 'hidden', boxSizing: 'border-box' }}>
              <img src="/images/circula.jpg" alt="Circula Partners" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
          {/* Left cactus on stool */}
          <div ref={cactusRef} style={{ position: 'absolute', left: '-345px', bottom: '20px', width: '239px', height: '346px' }}>
            <svg width="100%" height="100%" viewBox="0 0 70 90" fill="none">
              <rect x="22" y="52" width="26" height="22" rx="3" fill="#8B5E3C" stroke="#5a3a1a" strokeWidth="1.5"/>
              <rect x="18" y="50" width="34" height="6" rx="2" fill="#a06a40" stroke="#5a3a1a" strokeWidth="1.5"/>
              <ellipse cx="35" cy="53" rx="13" ry="3" fill="#3d2b1a"/>
              <rect x="30" y="18" width="10" height="34" rx="5" fill="#4a8c4a" stroke="#2d5e2d" strokeWidth="1.2"/>
              <rect x="22" y="30" width="8" height="6" rx="3" fill="#4a8c4a" stroke="#2d5e2d" strokeWidth="1.2"/>
              <rect x="22" y="20" width="6" height="14" rx="3" fill="#4a8c4a" stroke="#2d5e2d" strokeWidth="1.2"/>
              <rect x="40" y="34" width="8" height="6" rx="3" fill="#4a8c4a" stroke="#2d5e2d" strokeWidth="1.2"/>
              <rect x="42" y="24" width="6" height="14" rx="3" fill="#4a8c4a" stroke="#2d5e2d" strokeWidth="1.2"/>
              <line x1="35" y1="22" x2="35" y2="16" stroke="#c8d0a0" strokeWidth="1"/>
              <line x1="32" y1="28" x2="28" y2="26" stroke="#c8d0a0" strokeWidth="0.8"/>
              <line x1="38" y1="28" x2="42" y2="26" stroke="#c8d0a0" strokeWidth="0.8"/>
              <rect x="14" y="74" width="6" height="16" fill="#7a5230" stroke="#4a2e10" strokeWidth="1"/>
              <rect x="50" y="74" width="6" height="16" fill="#7a5230" stroke="#4a2e10" strokeWidth="1"/>
              <rect x="10" y="70" width="50" height="6" rx="2" fill="#9a6840" stroke="#5a3a1a" strokeWidth="1.5"/>
            </svg>
          </div>
          {/* Right leafy plant in pot */}
          <div ref={plantRef} style={{ position: 'absolute', left: 'calc(100% + 4px)', bottom: '20px', width: '227px', height: '395px' }}>
            <svg width="100%" height="100%" viewBox="0 0 60 80" fill="none">
              <rect x="17" y="50" width="26" height="22" rx="3" fill="#8B5E3C" stroke="#5a3a1a" strokeWidth="1.5"/>
              <rect x="13" y="48" width="34" height="6" rx="2" fill="#a06a40" stroke="#5a3a1a" strokeWidth="1.5"/>
              <ellipse cx="30" cy="51" rx="13" ry="3" fill="#3d2b1a"/>
              <line x1="30" y1="50" x2="30" y2="28" stroke="#4a7a30" strokeWidth="2"/>
              <ellipse cx="20" cy="30" rx="12" ry="6" fill="#3a8a3a" stroke="#2a5e2a" strokeWidth="1" transform="rotate(-30 20 30)"/>
              <ellipse cx="40" cy="26" rx="12" ry="6" fill="#4a9a4a" stroke="#2a5e2a" strokeWidth="1" transform="rotate(25 40 26)"/>
              <ellipse cx="24" cy="16" rx="10" ry="5" fill="#3a8a3a" stroke="#2a5e2a" strokeWidth="1" transform="rotate(-45 24 16)"/>
              <ellipse cx="38" cy="14" rx="10" ry="5" fill="#4a9a4a" stroke="#2a5e2a" strokeWidth="1" transform="rotate(40 38 14)"/>
              <ellipse cx="30" cy="10" rx="8" ry="4" fill="#5aaa5a" stroke="#2a5e2a" strokeWidth="1"/>
            </svg>
          </div>
        </div>

        {/* Nametag — floats above the cabinet, centred in scene */}
        <div className="cabinet-nametag" ref={nametagRef}>
          GROUP O · SUSTAINABILITY ADVISORY · VW GROUP
        </div>

        {/* ── Isometric cabinet shell ── */}
        <div className="cabinet-iso">

          {/* Top face */}
          <div className="cabinet-iso__top" />

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
