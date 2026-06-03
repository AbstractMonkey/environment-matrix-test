import { Link } from 'react-router-dom'
import { LESSONS, TIERS } from '../data/curriculum'
import { useGate, useProgressStats } from '../logic/gating'
import { useProgress } from '../store/progress'
import type { CSSProperties } from 'react'

export default function Home() {
  const gate = useGate()
  const stats = useProgressStats()
  const completed = useProgress((s) => s.completedLessons)

  const resume =
    LESSONS.find((l) => gate.unlocked[l.tier] && !completed.includes(l.id)) ??
    LESSONS[LESSONS.length - 1]
  const started = completed.length > 0

  return (
    <div className="home">
      <section className="hero">
        <p className="hero-kicker">Learn to sail · Pearson Ensign one-design</p>
        <h1>From never-touched-a-tiller to confident skipper.</h1>
        <p className="hero-lede">
          A six-tier, mastery-gated course built around the Pearson Ensign — a 22½-foot,
          full-keel Carl Alberg classic so stable and forgiving it was the first boat ever
          inducted into the American Sailboat Hall of Fame. Explore the boat, learn the wind,
          and unlock each tier by passing a short quiz.
        </p>
        <div className="hero-cta">
          <Link className="btn btn-large" to={`/lesson/${resume.id}`}>
            {started ? `Resume → ${resume.title}` : 'Start the course →'}
          </Link>
          <Link className="btn btn-large btn-ghost" to="/anatomy">Explore the boat</Link>
        </div>
        {started && (
          <p className="hero-progress">
            {stats.lessonsComplete} of {stats.lessonsTotal} lessons complete ({stats.pct}%).
          </p>
        )}
      </section>

      <section className="tier-grid">
        {TIERS.map((t) => {
          const locked = !gate.unlocked[t.id]
          const complete = gate.complete[t.id]
          const best = gate.bestScore[t.id]
          const status = complete ? 'Complete' : locked ? 'Locked' : 'Available'
          return (
            <Link
              key={t.id}
              to={`/tier/${t.id}`}
              className={'tier-card' + (locked ? ' is-locked' : '') + (complete ? ' is-complete' : '')}
              style={{ '--accent': t.accent } as CSSProperties}
            >
              <div className="tier-card-top">
                <span className="tier-card-num">{complete ? '✓' : locked ? '🔒' : t.id}</span>
                <span className="tier-card-status">{status}</span>
              </div>
              <h2>{t.name}</h2>
              <p className="tier-card-sub">{t.subtitle}</p>
              <p className="tier-card-blurb">{t.blurb}</p>
              <div className="tier-card-foot">
                <span>{t.lessonIds.length} lessons</span>
                {best != null && <span>Best quiz {Math.round(best * 100)}%</span>}
              </div>
            </Link>
          )
        })}
      </section>

      <section className="home-tools">
        <h2>Keystone interactives</h2>
        <div className="home-tools-grid">
          <Link to="/anatomy" className="tool-link">🚢 <span>Boat anatomy explorer</span></Link>
          <Link to="/points-of-sail" className="tool-link">🧭 <span>Points-of-sail dial</span></Link>
          <Link to="/knots" className="tool-link">🪢 <span>Knot library</span></Link>
        </div>
      </section>
    </div>
  )
}
