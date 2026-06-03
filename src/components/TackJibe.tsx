import { useEffect, useRef, useState } from 'react'

interface Phase { caption: string; beta: number }

const TACK: Phase[] = [
  { caption: '“Ready about?” — crew prepares the jib sheets.', beta: 48 },
  { caption: '“Helm’s a-lee!” — push the tiller to leeward.', beta: 28 },
  { caption: 'The bow swings through the eye of the wind…', beta: 0 },
  { caption: 'Release the old sheet, trim the new one.', beta: -28 },
  { caption: 'Settled on the new close-hauled course. ✔', beta: -48 },
]

const JIBE: Phase[] = [
  { caption: '“Ready to jibe?” — sheet the main toward centre.', beta: 130 },
  { caption: 'Main centred — the boom has little distance to travel.', beta: 168 },
  { caption: '“Jibe-ho!” — steer the stern through the wind.', beta: 192 },
  { caption: 'Boom crosses — ease the mainsheet out smoothly.', beta: 220 },
  { caption: 'Settled on the new broad reach. ✔', beta: 230 },
]

export default function TackJibe() {
  const [phases, setPhases] = useState<Phase[]>(TACK)
  const [idx, setIdx] = useState(0)
  const [running, setRunning] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current) }, [])

  function run(which: Phase[]) {
    if (timer.current) window.clearTimeout(timer.current)
    setPhases(which)
    setIdx(0)
    setRunning(true)
    let i = 0
    const tick = () => {
      i += 1
      if (i >= which.length) { setRunning(false); return }
      setIdx(i)
      timer.current = window.setTimeout(tick, 1100)
    }
    timer.current = window.setTimeout(tick, 1100)
  }

  const beta = phases[idx].beta

  return (
    <div className="tackjibe">
      <div className="tackjibe-stage">
        <svg viewBox="0 0 300 300" className="tackjibe-svg" role="img"
          aria-label="Tacking and jibing simulator">
          <circle cx="150" cy="150" r="120" className="dial-face" />
          {/* no-go wedge */}
          <path d="M150 150 L65 65 A120 120 0 0 1 235 65 Z" className="dial-nogo" />
          <text x="150" y="26" textAnchor="middle" className="dial-wind-label">WIND</text>
          <g className="dial-wind">
            <line x1="150" y1="34" x2="150" y2="60" />
            <path d="M144 52 L150 64 L156 52 Z" />
          </g>
          <g transform={`translate(150 150) rotate(${beta})`} style={{ transition: 'transform 0.9s ease-in-out' }}>
            <path className="dial-hull" d="M0 -48 C15 -24 15 24 0 44 C-15 24 -15 -24 0 -48 Z" />
            <line className="dial-boom" x1="0" y1="-8" x2={beta >= 0 && beta <= 180 ? 30 : -30} y2="34" />
            <circle className="dial-mast" cx="0" cy="-8" r="3" />
          </g>
        </svg>
      </div>

      <div className="tackjibe-side">
        <div className="tackjibe-caption" aria-live="polite">{phases[idx].caption}</div>
        <div className="tackjibe-buttons">
          <button className="btn" disabled={running} onClick={() => run(TACK)}>▶ Run a Tack</button>
          <button className="btn" disabled={running} onClick={() => run(JIBE)}>▶ Run a Jibe</button>
        </div>
        <p className="small muted">
          A tack turns the bow through the wind; a jibe turns the stern. Watch how
          the boom’s travel differs between them.
        </p>
      </div>
    </div>
  )
}
