import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface QuizAttempt {
  score: number
  total: number
  passed: boolean
  /** Epoch millis. */
  at: number
}

interface ProgressState {
  exploredParts: string[]
  completedLessons: string[]
  knotsTied: string[]
  /** Keyed by tier id (as string). */
  quizAttempts: Record<string, QuizAttempt[]>

  markPartExplored: (id: string) => void
  markLessonComplete: (id: string) => void
  toggleKnotTied: (id: string) => void
  recordQuizAttempt: (tier: number, attempt: QuizAttempt) => void
  reset: () => void
}

const empty = {
  exploredParts: [] as string[],
  completedLessons: [] as string[],
  knotsTied: [] as string[],
  quizAttempts: {} as Record<string, QuizAttempt[]>,
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      ...empty,

      markPartExplored: (id) =>
        set((s) =>
          s.exploredParts.includes(id)
            ? s
            : { exploredParts: [...s.exploredParts, id] },
        ),

      markLessonComplete: (id) =>
        set((s) =>
          s.completedLessons.includes(id)
            ? s
            : { completedLessons: [...s.completedLessons, id] },
        ),

      toggleKnotTied: (id) =>
        set((s) => ({
          knotsTied: s.knotsTied.includes(id)
            ? s.knotsTied.filter((k) => k !== id)
            : [...s.knotsTied, id],
        })),

      recordQuizAttempt: (tier, attempt) =>
        set((s) => {
          const key = String(tier)
          const prior = s.quizAttempts[key] ?? []
          return {
            quizAttempts: { ...s.quizAttempts, [key]: [...prior, attempt] },
          }
        }),

      reset: () => set({ ...empty }),
    }),
    {
      name: 'ensign-course-v1',
      version: 1,
      // When the schema changes, bump `version` and migrate here so existing
      // learners keep their progress instead of silently losing it.
      migrate: (persisted) => persisted as ProgressState,
    },
  ),
)
