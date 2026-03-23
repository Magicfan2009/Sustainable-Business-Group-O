/* Paperclip — single stroked path, amber, rounded ends */
export default function Paperclip({ width = 24, height = 52 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/*
        A paperclip is two nested U-shapes sharing the top edge.
        Outer U: wide, goes from top-left down to bottom, curves right, up to top-right
        Inner tongue: narrower, starts lower, curves back up
        Drawn as one continuous stroke path.
      */}
      <path
        d="
          M 18 3
          Q 21 3 21 6
          L 21 40
          Q 21 49 12 49
          Q 3 49 3 40
          L 3 6
          Q 3 3 6 3
          L 18 3
        "
        stroke="#e8a020"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="
          M 8 14
          L 8 40
          Q 8 44 12 44
          Q 16 44 16 40
          L 16 10
        "
        stroke="#e8a020"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
