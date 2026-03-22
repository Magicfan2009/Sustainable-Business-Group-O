import { useState } from 'react'
import PasswordScreen from './screens/PasswordScreen'

const SCREENS = { PASSWORD: 'password', CABINET: 'cabinet', READING: 'reading', AI: 'ai' }

function App() {
  const [screen, setScreen] = useState(SCREENS.PASSWORD)
  const [fadeOut, setFadeOut] = useState(false)
  const [fadeDuration, setFadeDuration] = useState(400)
  const [activeFile, setActiveFile] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  function handlePasswordSuccess() {
    setFadeDuration(800)
    setFadeOut(true)
    setTimeout(() => {
      setScreen(SCREENS.CABINET)
      setFadeDuration(400)
      setFadeOut(false)
    }, 900)
  }

  function openFile(code) {
    setFadeOut(true)
    setTimeout(() => {
      setActiveFile(code)
      setScreen(SCREENS.READING)
      setFadeOut(false)
    }, 400)
  }

  function goBack() {
    setFadeOut(true)
    setTimeout(() => {
      setScreen(SCREENS.CABINET)
      setFadeOut(false)
    }, 400)
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      opacity: fadeOut ? 0 : 1,
      transition: `opacity ${fadeDuration}ms ease`,
    }}>
      {screen === SCREENS.PASSWORD && (
        <PasswordScreen onSuccess={handlePasswordSuccess} />
      )}
      {screen === SCREENS.CABINET && (
        <div style={{ color: 'var(--color-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontFamily: 'var(--font-mono)' }}>
          Cabinet coming next…
        </div>
      )}
      {screen === SCREENS.READING && (
        <div style={{ color: 'var(--color-cream)', padding: '2rem', fontFamily: 'var(--font-mono)' }}>
          Reading: {activeFile}
        </div>
      )}
      {screen === SCREENS.AI && (
        <div style={{ color: 'var(--color-cream)', padding: '2rem', fontFamily: 'var(--font-mono)' }}>
          AI Disclosure coming soon
        </div>
      )}
    </div>
  )
}

export default App
