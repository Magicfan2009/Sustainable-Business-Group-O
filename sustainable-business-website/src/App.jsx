import { useState } from 'react'
import PasswordScreen from './screens/PasswordScreen'
import CabinetScreen from './screens/CabinetScreen'
import ReadingScreen from './screens/ReadingScreen'
import AIScreen from './screens/AIScreen'

const SCREENS = { PASSWORD: 'password', CABINET: 'cabinet', READING: 'reading', AI: 'ai' }

function App() {
  const [screen, setScreen] = useState(SCREENS.PASSWORD)
  const [fadeOut, setFadeOut] = useState(false)
  const [fadeDuration, setFadeDuration] = useState(400)
  const [activeFile, setActiveFile] = useState(null)

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
    transition(800, () => setScreen(SCREENS.CABINET))
  }

  function openFile(code) {
    setActiveFile(code)
    setScreen(SCREENS.READING)
  }

  function goBack() {
    transition(400, () => setScreen(SCREENS.CABINET))
  }

  function openAI() {
    transition(300, () => setScreen(SCREENS.AI))
  }

  function closeAI() {
    transition(300, () => setScreen(SCREENS.CABINET))
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
        <CabinetScreen onOpenFile={openFile} onOpenAI={openAI} onHome={() => transition(600, () => setScreen(SCREENS.PASSWORD))} />
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
