import { Link, useParams } from 'react-router-dom'
import {
  LESSON_BY_ID, TIER_BY_ID, nextLessonId, prevLessonId,
} from '../data/curriculum'
import { RichText } from '../components/RichText'
import InteractiveMount from '../components/InteractiveMount'
import VideoEmbed from '../components/VideoEmbed'
import { useGate } from '../logic/gating'
import { useProgress } from '../store/progress'
import type { CSSProperties } from 'react'

export default function LessonPage() {
  const { lessonId } = useParams()
  const gate = useGate()
  const completed = useProgress((s) => s.completedLessons)
  const markLessonComplete = useProgress((s) => s.markLessonComplete)

  const lesson = lessonId ? LESSON_BY_ID[lessonId] : undefined
  if (!lesson) {
    return (
      <div className="locked-screen">
        <h1>Lesson not found</h1>
        <Link className="btn" to="/">Back to course home</Link>
      </div>
    )
  }

  const tier = TIER_BY_ID[lesson.tier]

  if (!gate.unlocked[lesson.tier]) {
    return (
      <div className="locked-screen">
        <span className="locked-emoji">🔒</span>
        <h1>This lesson is in a locked tier</h1>
        <p>Complete the earlier tiers to unlock {tier.name}.</p>
        <Link className="btn" to={`/tier/${lesson.tier}`}>Go to Tier {lesson.tier}</Link>
      </div>
    )
  }

  const isComplete = completed.includes(lesson.id)
  const next = nextLessonId(lesson.id)
  const nextSameTier = next && LESSON_BY_ID[next].tier === lesson.tier ? next : null
  const prev = prevLessonId(lesson.id)

  return (
    <article className="lesson" style={{ '--accent': tier.accent } as CSSProperties}>
      <p className="lesson-kicker">
        <Link to={`/tier/${tier.id}`}>Tier {tier.id} · {tier.name}</Link> · {lesson.minutes} min
      </p>
      <h1>{lesson.title}</h1>
      <p className="lesson-summary">{lesson.summary}</p>

      <RichText blocks={lesson.body} />

      {lesson.interactive && (
        <div className="lesson-interactive">
          <InteractiveMount interactive={lesson.interactive} />
        </div>
      )}

      {lesson.video && <VideoEmbed video={lesson.video} />}

      <div className="lesson-nav">
        <div className="lesson-nav-left">
          {prev && <Link className="btn btn-ghost" to={`/lesson/${prev}`}>← Previous</Link>}
        </div>
        <button
          className={'btn btn-ghost mark-btn' + (isComplete ? ' is-complete' : '')}
          onClick={() => markLessonComplete(lesson.id)}
          disabled={isComplete}
        >
          {isComplete ? '✓ Completed' : 'Mark complete'}
        </button>
        <div className="lesson-nav-right">
          {nextSameTier ? (
            <Link
              className="btn"
              to={`/lesson/${nextSameTier}`}
              onClick={() => markLessonComplete(lesson.id)}
            >
              Next lesson →
            </Link>
          ) : (
            <Link
              className="btn"
              to={`/tier/${tier.id}/quiz`}
              onClick={() => markLessonComplete(lesson.id)}
            >
              Finish: Tier {tier.id} quiz →
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
