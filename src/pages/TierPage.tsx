import { Link, useParams } from 'react-router-dom'
import { LESSON_BY_ID, TIER_BY_ID, TIERS } from '../data/curriculum'
import { useGate } from '../logic/gating'
import { useProgress } from '../store/progress'
import type { CSSProperties } from 'react'
import type { TierId as Tier } from '../types'

function parseTier(s?: string): Tier | null {
  const n = Number(s)
  return [0, 1, 2, 3, 4, 5].includes(n) ? (n as Tier) : null
}

export default function TierPage() {
  const { tierId } = useParams()
  const id = parseTier(tierId)
  const gate = useGate()
  const completed = useProgress((s) => s.completedLessons)

  if (id == null) return <p className="muted">Unknown tier.</p>
  const tier = TIER_BY_ID[id]

  if (!gate.unlocked[id]) {
    const prev = TIERS[id - 1]
    return (
      <div className="locked-screen">
        <span className="locked-emoji">🔒</span>
        <h1>Tier {tier.id} — {tier.name} is locked</h1>
        <p>
          Finish <strong>Tier {prev.id} — {prev.name}</strong> first: complete its lessons and
          pass the tier quiz with {Math.round(0.8 * 100)}% or better.
        </p>
        <div className="hero-cta">
          <Link className="btn" to={`/tier/${prev.id}`}>Go to Tier {prev.id} →</Link>
          <Link className="btn btn-ghost" to={`/tier/${prev.id}/quiz`}>Take the Tier {prev.id} quiz</Link>
        </div>
      </div>
    )
  }

  const best = gate.bestScore[id]
  const quizPassed = gate.passed[id]

  return (
    <div className="tierpage" style={{ '--accent': tier.accent } as CSSProperties}>
      <header className="tierpage-head">
        <p className="tierpage-kicker">Tier {tier.id} · {tier.subtitle}</p>
        <h1>{tier.name}</h1>
        <p className="tierpage-blurb">{tier.blurb}</p>
      </header>

      {id === 0 && !gate.anatomyComplete && (
        <aside className="callout callout-key" role="note">
          <span className="callout-icon" aria-hidden="true">🧭</span>
          <div>
            <p className="callout-title">Tier 0 gate</p>
            <p>Explore every part in the <Link to="/lesson/0-2">Parts of the Boat</Link> lesson and
              pass this tier’s quiz to unlock Tier 1.</p>
          </div>
        </aside>
      )}

      <ol className="lesson-list">
        {tier.lessonIds.map((lid) => {
          const lesson = LESSON_BY_ID[lid]
          const done = completed.includes(lid)
          return (
            <li key={lid} className={done ? 'is-done' : ''}>
              <Link to={`/lesson/${lid}`}>
                <span className="lesson-check">{done ? '✓' : '○'}</span>
                <span className="lesson-info">
                  <strong>{lesson.title}</strong>
                  <small>{lesson.summary}</small>
                </span>
                <span className="lesson-meta">
                  {lesson.interactive && <span className="pill">interactive</span>}
                  <span className="lesson-min">{lesson.minutes} min</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ol>

      <div className={'quiz-card' + (quizPassed ? ' is-passed' : '')}>
        <div>
          <h2>{quizPassed ? '✓ ' : ''}Tier {tier.id} Quiz</h2>
          <p className="muted">
            Score 80% or better to {tier.id < 5 ? `unlock Tier ${tier.id + 1}` : 'complete the course'}.
            {best != null && ` Your best: ${Math.round(best * 100)}%.`}
          </p>
        </div>
        <Link className="btn" to={`/tier/${tier.id}/quiz`}>
          {best != null ? 'Retake quiz' : 'Take the quiz'} →
        </Link>
      </div>
    </div>
  )
}
