/* Pixel-art-style paperclip — block rectangle style, amber + black outlines */
export default function Paperclip({ width = 28, height = 52 }) {
  const sw = 5
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Outer loop — top bar */}
      <rect x="2.5" y="2.5" width="23" height="5" fill="#e8a020" stroke="#000" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
      {/* Outer loop — right side */}
      <rect x="20.5" y="2.5" width="5" height="38" fill="#e8a020" stroke="#000" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
      {/* Outer loop — bottom bar */}
      <rect x="2.5" y="35.5" width="23" height="5" fill="#e8a020" stroke="#000" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
      {/* Inner left side */}
      <rect x="2.5" y="2.5" width="5" height="46" fill="#e8a020" stroke="#000" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
      {/* Inner bottom bar */}
      <rect x="2.5" y="43.5" width="14" height="5" fill="#e8a020" stroke="#000" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
      {/* Inner right side (short) */}
      <rect x="11.5" y="12.5" width="5" height="36" fill="#e8a020" stroke="#000" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
      {/* Inner top bar */}
      <rect x="2.5" y="12.5" width="14" height="5" fill="#e8a020" stroke="#000" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  )
}
