import { useState } from 'react'
import { KNOTS } from '../data/knots'
import KnotAnimator from '../components/KnotAnimator'
import { useProgress } from '../store/progress'

export default function KnotsPage() {
  const [active, setActive] = useState(KNOTS[0].id)
  const tied = useProgress((s) => s.knotsTied)
  const tiedCount = KNOTS.filter((k) => tied.includes(k.id)).length

  return (
    <div className="knotspage">
      <h1>Knot Library</h1>
      <p className="lesson-summary">
        These {KNOTS.length} knots cover the vast majority of beginner-to-intermediate needs, in
        their canonical teaching order — including a quick-release sail tie, plus the rolling hitch
        as a bonus. Step through each diagram (the gaps show what passes over and under), then tie
        it on a real piece of rope.
      </p>
      <p className="knot-progress" aria-live="polite">
        <strong>{tiedCount}</strong> of {KNOTS.length} tied on real rope
      </p>
      <div className="knot-picker">
        {KNOTS.map((k) => (
          <button
            key={k.id}
            className={'chip' + (k.id === active ? ' is-active' : '')}
            onClick={() => setActive(k.id)}
          >
            {tied.includes(k.id) ? '✓ ' : ''}{k.name}
          </button>
        ))}
      </div>
      <KnotAnimator knotId={active} />
    </div>
  )
}
