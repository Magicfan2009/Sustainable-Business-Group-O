import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './FolderTab.css'

export default function FolderTab({ code, label, index, drawerOpen, onClick }) {
  const tabRef = useRef(null)

  useGSAP(() => {
    if (drawerOpen) {
      gsap.from(tabRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        delay: index * 0.06,
        ease: 'back.out(1.7)',
      })
    }
  }, { dependencies: [drawerOpen], scope: tabRef })

  return (
    <button
      ref={tabRef}
      className="folder-tab"
      onClick={onClick}
      style={{ marginTop: index === 0 ? 0 : 6 }}
    >
      <span className="folder-tab__code">{code}</span>
      <span className="folder-tab__sep">·</span>
      <span className="folder-tab__label">{label}</span>
      <span className="folder-tab__arrow">›</span>
    </button>
  )
}
