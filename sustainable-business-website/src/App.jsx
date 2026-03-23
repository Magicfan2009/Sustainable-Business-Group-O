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
  const [screen, setScreen] = useState(SCREENS.ROOMS)
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

  function panToRoom(targetRoom) {
    if (panningRef.current) return
    panningRef.current = true

    const ROOM_ORDER = ['cabinet', 'tablet', 'monitor']
    const currentRoom = roomRef.current
    const currentIdx = ROOM_ORDER.indexOf(currentRoom)
    const targetIdx = ROOM_ORDER.indexOf(targetRoom)
    // Determine direction: +1 = right (exit left), -1 = left (exit right)
    let direction = targetIdx > currentIdx ? 1 : -1
    // Handle wrap: if distance > 1 in one direction, it's a loop wrap
    const dist = Math.abs(targetIdx - currentIdx)
    if (dist > 1) direction = -direction

    const exitX = direction > 0 ? '-120vw' : '120vw'
    const enterX = direction > 0 ? '120vw' : '-120vw'

    const currentEl = document.querySelector(`[data-room="${currentRoom}"]`)
    const targetEl = document.querySelector(`[data-room="${targetRoom}"]`)
    if (!currentEl || !targetEl) { panningRef.current = false; return }

    gsap.set(targetEl, { x: enterX, zIndex: 2 })
    gsap.set(currentEl, { zIndex: 1 })

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentEl, { x: 0, zIndex: 1 })
        roomRef.current = targetRoom
        setRoom(targetRoom)
        panningRef.current = false
      }
    })

    tl.to(currentEl, { x: exitX, duration: 0.55, ease: 'power2.inOut' }, 0)
    tl.to(bgRef.current, { x: direction > 0 ? '-48vw' : '48vw', duration: 0.55, ease: 'power2.inOut' }, 0)
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
        position: 'fixed', inset: 0, background: '#0f0f0f', zIndex: -1,
      }} />

      {screen === SCREENS.PASSWORD && (
        <PasswordScreen onSuccess={handlePasswordSuccess} />
      )}

      {screen === SCREENS.ROOMS && (
        <div style={{ width: '100%', height: '100%', position: 'relative', isolation: 'isolate' }}>
          <div data-room="cabinet" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CabinetScreen
              onOpenFile={openFile}
              onOpenAI={openAI}
              onHome={() => transition(600, () => setScreen(SCREENS.PASSWORD))}
              onPanLeft={() => panToRoom('monitor')}
              onPanRight={() => panToRoom('tablet')}
              panning={panningRef}
            />
          </div>
          <div data-room="tablet" style={{ position: 'absolute', inset: 0 }}>
            <TabletScreen
              onPanLeft={() => panToRoom('cabinet')}
              onPanRight={() => panToRoom('monitor')}
              onPanToMonitor={() => panToRoom('monitor')}
              panning={panningRef}
            />
          </div>
          <div data-room="monitor" style={{ position: 'absolute', inset: 0 }}>
            <MonitorScreen
              onPanLeft={() => panToRoom('tablet')}
              onPanRight={() => panToRoom('cabinet')}
              panning={panningRef}
            />
          </div>
        </div>
      )}

      {screen === SCREENS.READING && (
        <ReadingScreen sectionCode={activeFile} onBack={goBack} />
      )}
      {screen === SCREENS.AI && (
        <AIScreen onBack={closeAI} />
      )}
    </div>
  )
}

export default App
