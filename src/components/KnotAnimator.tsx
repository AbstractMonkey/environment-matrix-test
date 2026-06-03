import { useState } from 'react'
import { KNOT_BY_ID } from '../data/knots'
import { KNOT_ART, GENERIC_ART } from './knotArt'
import { useProgress } from '../store/progress'

export default function KnotAnimator({ knotId }: { knotId: string }) {
  const knot = KNOT_BY_ID[knotId]
  const art = KNOT_ART[knotId] ?? GENERIC_ART
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
        <svg viewBox={art.viewBox ?? '0 0 240 200'} className="knot-svg" role="img"
          aria-label={`Stylised diagram of the ${knot.name} (step ${step + 1} of ${total})`}>
          {art.scaffold}
          <path d={art.rope} className="knot-rope-bg" />
          <path
            d={art.rope}
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
