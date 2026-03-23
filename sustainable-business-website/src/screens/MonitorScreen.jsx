import PanArrow from '../components/PanArrow'
import './MonitorScreen.css'

const YT_ID = 'Y-VoPkpcchs'

// SVG viewBox dimensions
const W = 480, H = 420
// Screen area within the bezel
const SX = 48, SY = 36, SW = 384, SH = 260

export default function MonitorScreen({ onPanLeft, onPanRight, panning, deskRef }) {
  return (
    <div className="monitor-screen" style={{ position: 'relative' }}>
      <PanArrow direction="left" onClick={onPanLeft} panning={panning} label="Filing Cabinet" />
      <PanArrow direction="right" onClick={onPanRight} panning={panning} label="Chart Tablet" />

      <div className="monitor-scene">
        <div className="monitor-nametag">EXECUTIVE BRIEFING</div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="min(560px, 90vw)"
          style={{ display: 'block', overflow: 'visible' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── Outer bezel ── */}
          <rect x="8" y="8" width="464" height="340" rx="14" ry="14"
            fill="#b0b8c4" stroke="#000" strokeWidth="3" />
          {/* Inner bezel bevel — top/left highlight */}
          <rect x="12" y="12" width="456" height="332" rx="11" ry="11"
            fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          {/* Inner bezel bevel — bottom/right shadow */}
          <rect x="14" y="14" width="452" height="328" rx="10" ry="10"
            fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />

          {/* ── Screen recess ── */}
          <rect x={SX - 4} y={SY - 4} width={SW + 8} height={SH + 8} rx="4" ry="4"
            fill="#1a1a22" stroke="#000" strokeWidth="2" />
          {/* Screen background + scanline texture via pattern */}
          <defs>
            <pattern id="scanlines" x="0" y="0" width="1" height="4" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="1" height="2" fill="rgba(255,255,255,0.018)" />
            </pattern>
          </defs>
          <rect x={SX} y={SY} width={SW} height={SH} fill="#050508" />
          <rect x={SX} y={SY} width={SW} height={SH} fill="url(#scanlines)" />

          {/* YouTube iframe inside screen via foreignObject */}
          <foreignObject x={SX} y={SY} width={SW} height={SH}>
            <iframe
              xmlns="http://www.w3.org/1999/xhtml"
              src={`https://www.youtube.com/embed/${YT_ID}?rel=0&modestbranding=1`}
              title="Executive Briefing"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </foreignObject>

          {/* Screen glare overlay */}
          <rect x={SX} y={SY} width={SW} height={SH}
            fill="url(#glare)" pointerEvents="none" />
          <defs>
            <linearGradient id="glare" x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="40%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* ── Bottom bezel controls ── */}
          {/* Power LED */}
          <circle cx="240" cy="362" r="4" fill="#4ade80">
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Decorative pixel buttons */}
          <rect x="180" y="354" width="14" height="6" rx="1" fill="#9aa0aa" stroke="#6a7080" strokeWidth="0.5" />
          <rect x="200" y="354" width="14" height="6" rx="1" fill="#9aa0aa" stroke="#6a7080" strokeWidth="0.5" />
          <rect x="286" y="354" width="14" height="6" rx="1" fill="#9aa0aa" stroke="#6a7080" strokeWidth="0.5" />
          <rect x="306" y="354" width="14" height="6" rx="1" fill="#9aa0aa" stroke="#6a7080" strokeWidth="0.5" />

          {/* ── Stand neck ── */}
          <rect x="218" y="348" width="44" height="28" fill="#9aa0aa" stroke="#000" strokeWidth="1.5" />
          {/* Stand base */}
          <rect x="168" y="376" width="144" height="14" rx="4" ry="4"
            fill="#b0b8c4" stroke="#000" strokeWidth="2" />
          {/* Stand base shadow */}
          <rect x="172" y="388" width="140" height="4" rx="2"
            fill="rgba(0,0,0,0.18)" />

          {/* ── Pixel shadow under whole unit ── */}
          <rect x="16" y="348" width="448" height="6" rx="2"
            fill="rgba(0,0,0,0.12)" />
        </svg>
        {/* Desk surface under monitor */}
        <div ref={deskRef} style={{ width: '1459px', height: '340px', lineHeight: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 480 60" preserveAspectRatio="none" style={{ display: 'block', marginTop: '-4px' }}>
          {/* Desk surface */}
          <rect x="0" y="0" width="480" height="18" rx="3" fill="#9a7048" stroke="#5a3a1a" strokeWidth="2"/>
          {/* Desk front face */}
          <rect x="0" y="16" width="480" height="10" fill="#7a5230" stroke="#4a2e10" strokeWidth="1.5"/>
          {/* Left leg */}
          <rect x="20" y="24" width="18" height="36" fill="#8a6038" stroke="#4a2e10" strokeWidth="1.5"/>
          {/* Right leg */}
          <rect x="442" y="24" width="18" height="36" fill="#8a6038" stroke="#4a2e10" strokeWidth="1.5"/>
          {/* Cactus pot on desk right */}
          <rect x="400" y="-28" width="18" height="22" rx="2" fill="#8B5E3C" stroke="#5a3a1a" strokeWidth="1.2"/>
          <rect x="397" y="-30" width="24" height="5" rx="1" fill="#a06a40" stroke="#5a3a1a" strokeWidth="1.2"/>
          <rect x="406" y="-54" width="8" height="26" rx="4" fill="#4a8c4a" stroke="#2d5e2d" strokeWidth="1"/>
          <line x1="410" y1="-52" x2="410" y2="-58" stroke="#c8d0a0" strokeWidth="1"/>
          <rect x="399" y="-44" width="6" height="4" rx="2" fill="#4a8c4a" stroke="#2d5e2d" strokeWidth="1"/>
          <rect x="415" y="-42" width="6" height="4" rx="2" fill="#4a8c4a" stroke="#2d5e2d" strokeWidth="1"/>
        </svg>
        </div>
      </div>
    </div>
  )
}
