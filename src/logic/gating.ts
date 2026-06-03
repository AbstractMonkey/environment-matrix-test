import { useProgress, type QuizAttempt } from '../store/progress'
import { SVG_PART_IDS } from '../data/parts'
import { QUIZ_BY_TIER } from '../data/quizzes'
import { LESSONS, TIERS } from '../data/curriculum'

export interface GateInfo {
  anatomyComplete: boolean
  /** Best score fraction (0–1) per tier, or null if never attempted. */
  bestScore: Record<number, number | null>
  passed: Record<number, boolean>
  complete: Record<number, boolean>
  unlocked: Record<number, boolean>
}

function bestFraction(attempts: QuizAttempt[] | undefined): number | null {
  if (!attempts || attempts.length === 0) return null
  return Math.max(...attempts.map((a) => a.score / a.total))
}

/** Pure computation so we can keep hook usage flat and predictable. */
export function computeGate(
  exploredParts: string[],
  quizAttempts: Record<string, QuizAttempt[]>,
): GateInfo {
  const anatomyComplete = SVG_PART_IDS.every((id) => exploredParts.includes(id))

  const bestScore: Record<number, number | null> = {}
  const passed: Record<number, boolean> = {}
  for (const tier of TIERS) {
    const best = bestFraction(quizAttempts[String(tier.id)])
    bestScore[tier.id] = best
    const threshold = QUIZ_BY_TIER[tier.id]?.passThreshold ?? 0.8
    passed[tier.id] = best !== null && best >= threshold
  }

  const complete: Record<number, boolean> = {}
  const unlocked: Record<number, boolean> = {}
  for (const tier of TIERS) {
    // Tier 0 additionally requires the anatomy explorer to be fully explored.
    complete[tier.id] =
      tier.id === 0 ? anatomyComplete && passed[0] : passed[tier.id]
  }
  for (const tier of TIERS) {
    unlocked[tier.id] = tier.id === 0 ? true : complete[tier.id - 1]
  }

  return { anatomyComplete, bestScore, passed, complete, unlocked }
}

export function useGate(): GateInfo {
  const exploredParts = useProgress((s) => s.exploredParts)
  const quizAttempts = useProgress((s) => s.quizAttempts)
  return computeGate(exploredParts, quizAttempts)
}

export interface ProgressStats {
  lessonsComplete: number
  lessonsTotal: number
  pct: number
}

export function useProgressStats(): ProgressStats {
  const completed = useProgress((s) => s.completedLessons)
  const lessonsTotal = LESSONS.length
  const lessonsComplete = completed.filter((id) =>
    LESSONS.some((l) => l.id === id),
  ).length
  return {
    lessonsComplete,
    lessonsTotal,
    pct: lessonsTotal ? Math.round((lessonsComplete / lessonsTotal) * 100) : 0,
  }
}
