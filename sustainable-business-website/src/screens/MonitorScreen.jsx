import PanArrow from '../components/PanArrow'
import './MonitorScreen.css'

const YT_ID = 'Y-VoPkpcchs'

export default function MonitorScreen({ onPanLeft, onPanRight, panning }) {
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
            <div className="monitor-iso__screen">
              {YT_ID ? (
                <iframe
                  src={`https://www.youtube.com/embed/${YT_ID}?rel=0&modestbranding=1`}
                  title="Executive Briefing"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
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
