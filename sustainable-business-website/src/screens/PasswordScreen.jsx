import { useState, useRef } from 'react'
import './PasswordScreen.css'

const PASSWORD = 'groupO2026'

const KEYS = [
  { num: '1', sub: '' },
  { num: '2', sub: 'ABC' },
  { num: '3', sub: 'DEF' },
  { num: '4', sub: 'GHI' },
  { num: '5', sub: 'JKL' },
  { num: '6', sub: 'MNO' },
  { num: '7', sub: 'PQRS' },
  { num: '8', sub: 'TUV' },
  { num: '9', sub: 'WXYZ' },
  { num: '*', sub: '', symbol: true },
  { num: '0', sub: '+' },
  { num: '#', sub: '', symbol: true },
]

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
      <div className="keypad">
        <div className="keypad__label">Access Control</div>

        {/* LED display / text input */}
        <div className="keypad__display">
          <input
            ref={inputRef}
            className={`keypad__input${shake ? ' keypad__input--shake' : ''}`}
            type="password"
            placeholder="Enter password"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
          />
        </div>

        {/* Number grid — decorative, clicking focuses input */}
        <div className="keypad__grid">
          {KEYS.map(k => (
            <button
              key={k.num}
              className={`keypad__key${k.symbol ? ' keypad__key--symbol' : ''}`}
              onClick={() => inputRef.current?.focus()}
              tabIndex={-1}
            >
              {k.num}
              {k.sub && <span className="keypad__key-sub">{k.sub}</span>}
            </button>
          ))}
        </div>

        {/* Confirm — appears once typing starts */}
        <button
          className={`keypad__btn${value.length > 0 ? ' keypad__btn--visible' : ''}`}
          onClick={handleSubmit}
        >
          Confirm →
        </button>

        <div className="keypad__restricted">Restricted Access</div>
      </div>
    </div>
  )
}
