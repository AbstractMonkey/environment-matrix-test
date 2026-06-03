import { useRef, useState } from 'react'
import { POINTS_OF_SAIL, classifyPointOfSail } from '../data/pointsOfSail'

const SIZE = 380
const CX = 190
const CY = 200
const R = 150

const rad = (deg: number) => (deg * Math.PI) / 180

/** Off-wind angle (0–180) for a boat bearing β (clockwise from the eye of the wind). */
function offWindAngle(beta: number): number {
  const a = ((beta % 360) + 360) % 360
  return a <= 180 ? a : 360 - a
}

/** Representative bearing for each point-of-sail button (starboard tack). */
const PRESET_BETA: Record<string, number> = {
  'no-go': 20,
  'close-hauled': 48,
  'close-reach': 70,
  'beam-reach': 90,
  'broad-reach': 130,
  running: 176,
}

export default function PointsOfSailDial() {
  const [beta, setBeta] = useState(90) // start on a beam reach
  const dragging = useRef(false)
  const stageRef = useRef<SVGSVGElement>(null)

  const off = offWindAngle(beta)
  const pos = classifyPointOfSail(off)
  const luffing = !!pos.noGo

  // Boom trim angle off the centreline, and which side it swings to (leeward).
  const t = rad(Math.min(88, Math.max(6, off * 0.47)))
  const s = Math.sin(rad(beta)) >= 0 ? 1 : -1

  // Local-frame downwind direction (for the sail's camber bulge).
  const wx = Math.sin(rad(beta))
  const wy = Math.cos(rad(beta))

  const BL = 58 // boom length
  const mast = { x: 0, y: -12 }
  const boomEnd = { x: mast.x + BL * s * Math.sin(t), y: mast.y + BL * Math.cos(t) }
  const mainMid = { x: (mast.x + boomEnd.x) / 2, y: (mast.y + boomEnd.y) / 2 }
  const camber = luffing ? 2 : 16
  const mainCtrl = { x: mainMid.x + wx * camber, y: mainMid.y + wy * camber }

  const jibTack = { x: 0, y: -52 }
  const JL = 34
  const jibClew = { x: jibTack.x + JL * s * Math.sin(t), y: jibTack.y + JL * Math.cos(t) }
  const jibMid = { x: (jibTack.x + jibClew.x) / 2, y: (jibTack.y + jibClew.y) / 2 }
  const jibCtrl = { x: jibMid.x + wx * camber * 0.8, y: jibMid.y + wy * camber * 0.8 }

  function pointerToBeta(clientX: number, clientY: number) {
    const svg = stageRef.current
    if (!svg) return
    const r = svg.getBoundingClientRect()
    const scaleX = SIZE / r.width
    const scaleY = SIZE / r.height
    const px = (clientX - r.left) * scaleX
    const py = (clientY - r.top) * scaleY
    const dx = px - CX
    const dy = py - CY
    // atan2(dx, -dy): clockwise angle from straight up.
    let deg = (Math.atan2(dx, -dy) * 180) / Math.PI
    if (deg < 0) deg += 360
    setBeta(deg)
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault(); setBeta((b) => (b + 2) % 360)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault(); setBeta((b) => (b + 358) % 360)
    }
  }

  // No-go wedge (±45° from the top).
  const w1 = { x: CX + R * Math.sin(rad(-45)), y: CY - R * Math.cos(rad(-45)) }
  const w2 = { x: CX + R * Math.sin(rad(45)), y: CY - R * Math.cos(rad(45)) }
  const noGoWedge = `M${CX} ${CY} L${w1.x} ${w1.y} A${R} ${R} 0 0 1 ${w2.x} ${w2.y} Z`

  const labels = [
    { deg: 48, text: 'Close-hauled' },
    { deg: 90, text: 'Beam reach' },
    { deg: 132, text: 'Broad reach' },
    { deg: 180, text: 'Running' },
  ]

  return (
    <div className="dial">
      <div className="dial-stage">
        <svg
          ref={stageRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="dial-svg"
          role="slider"
          tabIndex={0}
          aria-label="Boat heading relative to the wind"
          aria-valuemin={0}
          aria-valuemax={180}
          aria-valuenow={Math.round(off)}
          aria-valuetext={`${pos.name}, ${Math.round(off)} degrees off the wind`}
          onKeyDown={onKey}
          onPointerDown={(e) => {
            dragging.current = true
            ;(e.target as Element).setPointerCapture?.(e.pointerId)
            pointerToBeta(e.clientX, e.clientY)
          }}
          onPointerMove={(e) => {
            if (dragging.current) pointerToBeta(e.clientX, e.clientY)
          }}
          onPointerUp={() => { dragging.current = false }}
        >
          {/* dial face */}
          <circle cx={CX} cy={CY} r={R} className="dial-face" />
          <path d={noGoWedge} className="dial-nogo" />
          <circle cx={CX} cy={CY} r={R * 0.66} className="dial-ring" />

          {/* point-of-sail labels (starboard side) */}
          {labels.map((l) => {
            const lx = CX + (R + 4) * Math.sin(rad(l.deg))
            const ly = CY - (R + 4) * Math.cos(rad(l.deg))
            return (
              <text key={l.deg} x={lx} y={ly} className="dial-label"
                textAnchor={l.deg > 95 ? 'start' : l.deg < 85 ? 'start' : 'middle'}>
                {l.text}
              </text>
            )
          })}
          <text x={CX} y={CY - R - 16} className="dial-wind-label" textAnchor="middle">WIND</text>

          {/* wind arrow from the top */}
          <g className="dial-wind">
            <line x1={CX} y1={CY - R - 8} x2={CX} y2={CY - R + 22} />
            <path d={`M${CX - 6} ${CY - R + 14} L${CX} ${CY - R + 26} L${CX + 6} ${CY - R + 14} Z`} />
          </g>

          {/* the boat, rotated to its bearing */}
          <g transform={`translate(${CX} ${CY}) rotate(${beta})`}>
            <path className="dial-hull"
              d="M0 -60 C18 -30 18 30 0 55 C-18 30 -18 -30 0 -60 Z" />
            {/* boom */}
            <line className="dial-boom" x1={mast.x} y1={mast.y} x2={boomEnd.x} y2={boomEnd.y} />
            {/* mainsail */}
            <path className={'dial-sail' + (luffing ? ' luffing' : '')}
              d={`M${mast.x} ${mast.y} Q${mainCtrl.x} ${mainCtrl.y} ${boomEnd.x} ${boomEnd.y}`} />
            {/* jib */}
            <path className={'dial-sail jib' + (luffing ? ' luffing' : '')}
              d={`M${jibTack.x} ${jibTack.y} Q${jibCtrl.x} ${jibCtrl.y} ${jibClew.x} ${jibClew.y}`} />
            {/* mast dot */}
            <circle className="dial-mast" cx={mast.x} cy={mast.y} r={3} />
          </g>
        </svg>
      </div>

      <div className="dial-side">
        <div className={'dial-readout' + (luffing ? ' is-nogo' : '')}>
          <span className="tag">{Math.round(off)}° off the wind</span>
          <h3>{pos.name}</h3>
          <p className="dial-trim"><strong>Trim:</strong> {pos.trim}</p>
          <p className="muted">{pos.blurb}</p>
        </div>

        <p className="small muted">Drag the boat, use the arrow keys, or pick a point of sail:</p>
        <div className="dial-buttons">
          {POINTS_OF_SAIL.map((p) => (
            <button
              key={p.id}
              className={'chip' + (p.id === pos.id ? ' is-active' : '')}
              onClick={() => setBeta(PRESET_BETA[p.id])}
            >
              {p.name.replace(' (In Irons)', '').replace(' (No-Go)', '')}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
