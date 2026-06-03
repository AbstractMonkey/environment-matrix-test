import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { QUIZ_BY_TIER } from '../data/quizzes'
import { TIER_BY_ID } from '../data/curriculum'
import { useProgress } from '../store/progress'
import type { TierId } from '../types'

interface BuiltChoice { text: string; correct: boolean }
interface BuiltQ { id: string; prompt: string; choices: BuiltChoice[]; explain?: string }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function build(tier: TierId): BuiltQ[] {
  const quiz = QUIZ_BY_TIER[tier]
  return shuffle(quiz.questions).map((q) => ({
    id: q.id,
    prompt: q.prompt,
    explain: q.explain,
    choices: shuffle(q.choices.map((text, i) => ({ text, correct: i === q.answer }))),
  }))
}

export default function Quiz({ tier }: { tier: TierId }) {
  const quiz = QUIZ_BY_TIER[tier]
  const [version, setVersion] = useState(0)
  const built = useMemo(() => build(tier), [tier, version])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const recordQuizAttempt = useProgress((s) => s.recordQuizAttempt)

  if (!quiz) return <p className="muted">No quiz for this tier.</p>

  const total = built.length
  const answeredCount = Object.keys(answers).length
  const score = built.reduce(
    (n, q) => n + (answers[q.id] != null && q.choices[answers[q.id]]?.correct ? 1 : 0),
    0,
  )
  const frac = total ? score / total : 0
  const passed = frac >= quiz.passThreshold
  const nextTier = TIER_BY_ID[tier + 1]

  function submit() {
    if (answeredCount < total) return
    setSubmitted(true)
    recordQuizAttempt(tier, { score, total, passed, at: Date.now() })
  }

  function retry() {
    setAnswers({})
    setSubmitted(false)
    setVersion((v) => v + 1)
  }

  return (
    <div className="quiz">
      {submitted && (
        <div className={'quiz-result ' + (passed ? 'pass' : 'fail')} role="status">
          <h3>{passed ? '✅ Passed!' : '🌀 Not quite yet'}</h3>
          <p>
            You scored <strong>{score} / {total}</strong> ({Math.round(frac * 100)}%).
            {' '}Passing needs {Math.round(quiz.passThreshold * 100)}%.
          </p>
          {passed ? (
            nextTier ? (
              <p>Tier {nextTier.id} — <strong>{nextTier.name}</strong> is now unlocked.{' '}
                <Link className="btn btn-small" to={`/tier/${nextTier.id}`}>Continue →</Link></p>
            ) : (
              <p>🎉 That was the final exam. You’ve completed the whole course!</p>
            )
          ) : (
            <button className="btn btn-small" onClick={retry}>Try again (new shuffle)</button>
          )}
        </div>
      )}

      <ol className="quiz-questions">
        {built.map((q, qi) => {
          const chosen = answers[q.id]
          return (
            <li key={q.id} className="quiz-q">
              <p className="quiz-prompt"><span className="quiz-n">{qi + 1}</span>{q.prompt}</p>
              <div className="quiz-choices">
                {q.choices.map((c, ci) => {
                  const isChosen = chosen === ci
                  let cls = 'quiz-choice'
                  if (submitted) {
                    if (c.correct) cls += ' correct'
                    else if (isChosen) cls += ' wrong'
                  } else if (isChosen) cls += ' chosen'
                  return (
                    <label key={ci} className={cls}>
                      <input
                        type="radio"
                        name={q.id}
                        checked={isChosen}
                        disabled={submitted}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: ci }))}
                      />
                      <span>{c.text}</span>
                    </label>
                  )
                })}
              </div>
              {submitted && q.explain && (
                <p className="quiz-explain">{q.explain}</p>
              )}
            </li>
          )
        })}
      </ol>

      {!submitted && (
        <div className="quiz-actions">
          <button className="btn" disabled={answeredCount < total} onClick={submit}>
            Submit ({answeredCount}/{total} answered)
          </button>
          {answeredCount < total && (
            <span className="small muted">Answer every question to submit.</span>
          )}
        </div>
      )}
    </div>
  )
}
