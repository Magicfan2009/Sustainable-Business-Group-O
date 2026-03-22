import { useState, useRef } from 'react'
import './PasswordScreen.css'

// Update this before submission — agree with group first
const PASSWORD = 'groupO2026'

export default function PasswordScreen({ onSuccess }) {
  const [value, setValue] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  function handleSubmit() {
    if (value === PASSWORD) {
      onSuccess()
    } else {
      setShake(true)
      setTimeout(() => {
        setShake(false)
        setValue('')
        inputRef.current?.focus()
      }, 350)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="password-screen">
      <span className="password-screen__label">Restricted Access</span>
      <h1 className="password-screen__title">VW Sustainability Advisory — Group O</h1>
      <p className="password-screen__institution">Imperial College London · 2026</p>
      <input
        ref={inputRef}
        className={`password-screen__input${shake ? ' password-screen__input--shake' : ''}`}
        type="password"
        placeholder="Enter access code"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKey}
        autoFocus
      />
      <button
        className={`password-screen__btn${value.length > 0 ? ' password-screen__btn--visible' : ''}`}
        onClick={handleSubmit}
      >
        Enter →
      </button>
    </div>
  )
}
