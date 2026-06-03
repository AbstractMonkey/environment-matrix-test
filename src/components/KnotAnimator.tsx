import { useState } from 'react'
import { KNOT_BY_ID } from '../data/knots'
import { useProgress } from '../store/progress'

// A decorative rope path that we "draw" progressively as the learner steps
// through the knot — an animated scaffold paired with the written steps.
const ROPE_PATH =
  'M30 150 C 70 40, 170 40, 150 110 C 135 165, 70 150, 105 95 C 135 48, 205 85, 205 155'

export default function KnotAnimator({ knotId }: { knotId: string }) {
  const knot = KNOT_BY_ID[knotId]
  const [step, setStep] = useState(0)
  const tied = useProgress((s) => s.knotsTied.includes(knotId))
  const toggleKnotTied = useProgress((s) => s.toggleKnotTied)

  if (!knot) return <p className="muted">Unknown knot: {knotId}</p>

  const total = knot.steps.length
  const frac = (step + 1) / total
  const atEnd = step === total - 1

  return (
    <div className="knot">
      <div className="knot-stage">
        <svg viewBox="0 0 240 200" className="knot-svg" role="img"
          aria-label={`Schematic of tying the ${knot.name}, step ${step + 1} of ${total}`}>
          <path d={ROPE_PATH} className="knot-rope-bg" />
          <path
            d={ROPE_PATH}
            className="knot-rope"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 - frac }}
          />
          <text x="120" y="190" textAnchor="middle" className="knot-stepnum">
            Step {step + 1} / {total}
          </text>
        </svg>
      </div>

      <div className="knot-side">
        <span className="tag">{knot.nickname ? `${knot.name} · ${knot.nickname}` : knot.name}</span>
        <p className="knot-use"><strong>Use:</strong> {knot.use}</p>

        <ol className="knot-steps">
          {knot.steps.map((s, i) => (
            <li key={i} className={i === step ? 'is-current' : i < step ? 'is-done' : ''}>
              <button onClick={() => setStep(i)}>{s}</button>
            </li>
          ))}
        </ol>

        <div className="knot-controls">
          <button className="btn btn-small" disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}>← Prev</button>
          <input
            type="range" min={1} max={total} value={step + 1}
            aria-label="Knot step"
            onChange={(e) => setStep(Number(e.target.value) - 1)}
          />
          <button className="btn btn-small" disabled={atEnd}
            onClick={() => setStep((s) => Math.min(total - 1, s + 1))}>Next →</button>
        </div>

        <label className="knot-done-row">
          <input type="checkbox" checked={tied} onChange={() => toggleKnotTied(knotId)} />
          I’ve tied the {knot.name} on a real piece of rope
        </label>
      </div>
    </div>
  )
}
