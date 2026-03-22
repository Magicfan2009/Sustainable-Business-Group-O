import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FolderTab from '../components/FolderTab'
import './CabinetScreen.css'

const FOLDERS = [
  { code: 'SEC-01', label: 'OVERVIEW' },
  { code: 'SEC-02', label: 'CARBON ACCOUNTING' },
  { code: 'SEC-03', label: 'TRIPLE BOTTOM LINE' },
  { code: 'SEC-04', label: 'BENCHMARKING' },
  { code: 'SEC-05', label: 'STRATEGY 2035' },
  { code: 'SEC-06', label: 'EXECUTIVE SUMMARY' },
]

export default function CabinetScreen({ onOpenFile, onOpenAI }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const cabinetRef = useRef(null)

  useGSAP(() => {
    gsap.from(cabinetRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
    })
  }, { scope: cabinetRef })

  function toggleDrawer() {
    setDrawerOpen(prev => !prev)
  }

  return (
    <div className="cabinet-screen">
      <div className="cabinet" ref={cabinetRef}>
        {/* Label plate */}
        <div className="cabinet__label">
          GROUP O · SUSTAINABILITY ADVISORY · VW GROUP
        </div>

        {/* Cabinet body */}
        <div className="cabinet__body">
          {/* Drawer */}
          <div className={`cabinet__drawer${drawerOpen ? ' cabinet__drawer--open' : ''}`}>
            {/* Drawer face */}
            <div className="cabinet__drawer-face">
              <button
                className="cabinet__handle"
                onClick={toggleDrawer}
                aria-label={drawerOpen ? 'Close drawer' : 'Open drawer'}
              />
            </div>

            {/* Drawer interior — folder tabs */}
            <div className="cabinet__interior">
              {FOLDERS.map((folder, i) => (
                <FolderTab
                  key={folder.code}
                  code={folder.code}
                  label={folder.label}
                  index={i}
                  drawerOpen={drawerOpen}
                  onClick={() => onOpenFile(folder.code)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI disclosure link */}
      <button className="cabinet-screen__ai-link" onClick={onOpenAI}>
        AI USE STATEMENT
      </button>
    </div>
  )
}
