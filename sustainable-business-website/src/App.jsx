import { useState, useRef } from 'react'
import gsap from 'gsap'
import PasswordScreen from './screens/PasswordScreen'
import CabinetScreen from './screens/CabinetScreen'
import ReadingScreen from './screens/ReadingScreen'
import AIScreen from './screens/AIScreen'
import TabletScreen from './screens/TabletScreen'
import MonitorScreen from './screens/MonitorScreen'

const SCREENS = { PASSWORD: 'password', ROOMS: 'rooms', READING: 'reading', AI: 'ai' }

function App() {
  const [screen, setScreen] = useState(SCREENS.PASSWORD)
  const [fadeOut, setFadeOut] = useState(false)
  const [fadeDuration, setFadeDuration] = useState(400)
  const [activeFile, setActiveFile] = useState(null)
  const [room, setRoom] = useState('cabinet') // 'cabinet' | 'tablet' | 'monitor'
  const roomRef = useRef('cabinet') // mirrors room state, always fresh in closures
  const panningRef = useRef(false)
  const bgRef = useRef(null)

  function transition(ms, callback) {
    setFadeDuration(ms)
    setFadeOut(true)
    setTimeout(() => {
      callback()
      setFadeDuration(400)
      setFadeOut(false)
    }, ms + 100)
  }

  function handlePasswordSuccess() {
    transition(800, () => setScreen(SCREENS.ROOMS))
  }

  function openFile(code) {
    setActiveFile(code)
    setScreen(SCREENS.READING)
  }

  function goBack() {
    transition(400, () => setScreen(SCREENS.ROOMS))
  }

  function openAI() {
    transition(300, () => setScreen(SCREENS.AI))
  }

  function closeAI() {
    transition(300, () => setScreen(SCREENS.ROOMS))
  }

  // dir: 'right' | 'left' — advances or retreats through the loop
  // ROOM_ORDER going right: cabinet → monitor → tablet → cabinet
  const ROOM_RIGHT = { cabinet: 'monitor', monitor: 'tablet', tablet: 'cabinet' }
  const ROOM_LEFT  = { cabinet: 'tablet',  tablet:  'monitor', monitor: 'cabinet' }

  function panToRoom(dir) {
    if (panningRef.current) return
    panningRef.current = true

    const currentRoom = roomRef.current
    const targetRoom  = dir === 'right' ? ROOM_RIGHT[currentRoom] : ROOM_LEFT[currentRoom]
    const exitX  = dir === 'right' ? '-120vw' : '120vw'
    const enterX = dir === 'right' ? '120vw'  : '-120vw'

    const currentEl = document.querySelector(`[data-room="${currentRoom}"]`)
    const targetEl = document.querySelector(`[data-room="${targetRoom}"]`)
    if (!currentEl || !targetEl) { panningRef.current = false; return }

    gsap.set(targetEl, { x: enterX, zIndex: 2, visibility: 'visible' })
    gsap.set(currentEl, { zIndex: 1, visibility: 'visible' })

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentEl, { x: 0, zIndex: 1, visibility: 'hidden' })
        roomRef.current = targetRoom
        setRoom(targetRoom)
        panningRef.current = false
      }
    })

    tl.to(currentEl, { x: exitX, duration: 0.55, ease: 'power2.inOut' }, 0)
    tl.to(bgRef.current, { x: dir === 'right' ? '-48vw' : '48vw', duration: 0.55, ease: 'power2.inOut' }, 0)
    tl.to(targetEl, { x: 0, duration: 0.5, ease: 'back.out(1.15)' }, 0.05)
    tl.set(bgRef.current, { x: 0 })
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      opacity: fadeOut ? 0 : 1,
      transition: `opacity ${fadeDuration}ms ease`,
    }}>
      {/* Parallax background */}
      <div ref={bgRef} style={{
        position: 'fixed', inset: 0, background: 'var(--color-bg)', zIndex: -1,
      }} />

      {screen === SCREENS.PASSWORD && (
        <PasswordScreen onSuccess={handlePasswordSuccess} />
      )}

      {screen === SCREENS.ROOMS && (
        <div style={{ width: '100%', height: '100%', position: 'relative', isolation: 'isolate' }}>
          {/* Picture frame — hung on wall, visible across all rooms */}
          <div style={{ position: 'absolute', left: '2%', top: '50%', transform: 'translateY(-50%)', zIndex: 4, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '6px', height: '10px', background: '#8a8a7a', borderRadius: '1px 1px 3px 3px', boxShadow: '0 2px 2px rgba(0,0,0,0.4)' }} />
            <svg width="192" height="28" style={{ display: 'block', marginBottom: '-2px' }}>
              <line x1="96" y1="0" x2="4" y2="26" stroke="#5a4a2a" strokeWidth="1.2" />
              <line x1="96" y1="0" x2="188" y2="26" stroke="#5a4a2a" strokeWidth="1.2" />
            </svg>
            <div style={{ width: '180px', height: '62px', background: '#2a1f0f', border: '6px solid #4a3520', boxShadow: '3px 3px 0 #000, inset 0 0 0 2px #6a5030', overflow: 'hidden' }}>
              <img src="/images/circula.jpg" alt="Circula Partners" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          {/* Office decorations — background layer */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
            {/* Left floor: cactus on stool */}
            <div style={{ position: 'absolute', bottom: '8%', left: '3%' }}>
              <svg width="70" height="90" viewBox="0 0 70 90" fill="none">
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
            {/* Right floor: leafy plant in pot */}
            <div style={{ position: 'absolute', bottom: '8%', right: '3%' }}>
              <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
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
          <div data-room="cabinet" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', visibility: 'visible' }}>
            <CabinetScreen
              onOpenFile={openFile}
              onOpenAI={openAI}
              onHome={() => transition(600, () => setScreen(SCREENS.PASSWORD))}
              onPanLeft={() => panToRoom('left')}
              onPanRight={() => panToRoom('right')}
              panning={panningRef}
            />
          </div>
          <div data-room="tablet" style={{ position: 'absolute', inset: 0, visibility: 'hidden' }}>
            <TabletScreen
              onPanLeft={() => panToRoom('left')}
              onPanRight={() => panToRoom('right')}
              onPanToMonitor={() => panToRoom('left')}
              panning={panningRef}
            />
          </div>
          <div data-room="monitor" style={{ position: 'absolute', inset: 0, visibility: 'hidden' }}>
            <MonitorScreen
              onPanLeft={() => panToRoom('left')}
              onPanRight={() => panToRoom('right')}
              panning={panningRef}
            />
          </div>
        </div>
      )}

      {screen === SCREENS.READING && (
        <ReadingScreen sectionCode={activeFile} onBack={goBack} onSectionChange={openFile} />
      )}
      {screen === SCREENS.AI && (
        <AIScreen onBack={closeAI} />
      )}
    </div>
  )
}

export default App
