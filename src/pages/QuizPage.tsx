import { Link, useParams } from 'react-router-dom'
import { TIER_BY_ID, TIERS } from '../data/curriculum'
import Quiz from '../components/Quiz'
import { useGate } from '../logic/gating'
import type { TierId } from '../types'

function parseTier(s?: string): TierId | null {
  const n = Number(s)
  return [0, 1, 2, 3, 4, 5].includes(n) ? (n as TierId) : null
}

export default function QuizPage() {
  const { tierId } = useParams()
  const id = parseTier(tierId)
  const gate = useGate()

  if (id == null) return <p className="muted">Unknown tier.</p>
  const tier = TIER_BY_ID[id]

  if (!gate.unlocked[id]) {
    const prev = TIERS[id - 1]
    return (
      <div className="locked-screen">
        <span className="locked-emoji">🔒</span>
        <h1>Tier {tier.id} quiz is locked</h1>
        <p>Complete Tier {prev.id} — {prev.name} first.</p>
        <Link className="btn" to={`/tier/${prev.id}`}>Go to Tier {prev.id}</Link>
      </div>
    )
  }

  return (
    <div className="quizpage">
      <p className="lesson-kicker">
        <Link to={`/tier/${tier.id}`}>Tier {tier.id} · {tier.name}</Link>
      </p>
      <h1>Tier {tier.id} Quiz</h1>
      <p className="lesson-summary">
        Retrieval practice isn’t just a test — recalling the answers is itself how the learning
        sticks. Score 80%+ to {tier.id < 5 ? `unlock Tier ${tier.id + 1}` : 'complete the course'}.
        Unlimited retries, re-shuffled each time.
      </p>

      {id === 0 && !gate.anatomyComplete && (
        <aside className="callout callout-warning" role="note">
          <span className="callout-icon" aria-hidden="true">⚠️</span>
          <div>
            <p>You can take this quiz now, but Tier 1 also requires exploring every part in the{' '}
              <Link to="/lesson/0-2">Parts of the Boat</Link> lesson.</p>
          </div>
        </aside>
      )}

      <Quiz tier={id} />
    </div>
  )
}
