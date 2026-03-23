import { useState, useRef } from 'react'
import PanArrow from '../components/PanArrow'
import './MonitorScreen.css'

// Set VIDEO_SRC to the path of the video when it's ready, e.g. '/video/sec06.mp4'
const VIDEO_SRC = '/video/group-o.mp4'

export default function MonitorScreen({ onPanLeft, onPanRight, panning }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  function togglePlay() {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <div className="monitor-screen" style={{ position: 'relative' }}>
      <PanArrow direction="left" onClick={onPanLeft} panning={panning} label="Filing Cabinet" />
      <PanArrow direction="right" onClick={onPanRight} panning={panning} label="Chart Tablet" />

      <div className="monitor-scene">
        <div className="monitor-iso">
          <div className="monitor-iso__top" />
          <div className="monitor-iso__side" />
          <div className="monitor-nametag">EXECUTIVE BRIEFING</div>

          <div className="monitor-iso__front">
            <div className="monitor-iso__screen" onClick={VIDEO_SRC ? togglePlay : undefined}>
              {VIDEO_SRC ? (
                <>
                  <video
                    ref={videoRef}
                    src={VIDEO_SRC}
                    style={{ width: '100%', height: '100%', objectFit: 'fill', display: 'block' }}
                  />
                  <div className="monitor-play-btn">
                    {playing ? '⏸' : '▶'}
                  </div>
                </>
              ) : (
                <div className="monitor-placeholder">
                  <span>[ VIDEO PENDING ]</span>
                </div>
              )}
            </div>
            <div className="monitor-iso__led" />
          </div>
        </div>

        <div className="monitor-stand">
          <div className="monitor-stand__neck" />
          <div className="monitor-stand__base" />
        </div>
      </div>
    </div>
  )
}
