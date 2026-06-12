// Core domain types for the Ensign Sailing Course.

export type TierId = 0 | 1 | 2 | 3 | 4 | 5

export interface Tier {
  id: TierId
  slug: string
  /** Short rank name, e.g. "Deckhand". */
  name: string
  /** One-word theme, e.g. "Orientation". */
  subtitle: string
  blurb: string
  /** Ordered lesson ids belonging to this tier. */
  lessonIds: string[]
  /** Accent colour (CSS) used for the tier's chrome. */
  accent: string
}

/** A single screen of instruction (3–7 minutes). */
export interface Lesson {
  id: string
  tier: TierId
  title: string
  minutes: number
  summary: string
  body: ContentBlock[]
  /** Optional interactive mounted at the foot of the lesson. */
  interactive?: InteractiveRef
  video?: VideoRef
}

export interface VideoRef {
  title: string
  channel: string
  url: string
}

/** Names of the interactive widgets a lesson can embed. */
export type InteractiveRef =
  | { kind: 'anatomy' }
  | { kind: 'points-of-sail' }
  | { kind: 'knot'; knotId: string }
  | { kind: 'tack-jibe' }

/** A tiny typed subset of "rich text" so content stays data, not markup. */
export type ContentBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'list'; items: string[]; ordered?: boolean }
  | { kind: 'steps'; title?: string; items: string[] }
  | { kind: 'callout'; tone: CalloutTone; title?: string; text: string }
  | { kind: 'table'; head: string[]; rows: string[][] }

export type CalloutTone = 'tip' | 'warning' | 'key' | 'rule'

// ----- Boat anatomy -----

export type PartGroup =
  | 'Hull & Foils'
  | 'Spars & Standing Rigging'
  | 'Sails'
  | 'Running Rigging & Hardware'
  | 'Deck & Cockpit'

export interface Part {
  id: string
  name: string
  group: PartGroup
  description: string
  /** True when the part has a clickable hotspot on the boat SVG. */
  onSvg: boolean
}

// ----- Knots -----

export interface Knot {
  id: string
  name: string
  nickname?: string
  tier: TierId
  use: string
  steps: string[]
  /** How to verify the finished knot is tied correctly. */
  check?: string
  /** The most common way this knot goes wrong. */
  mistake?: string
}

// ----- Points of sail -----

export interface PointOfSail {
  id: string
  name: string
  /** Absolute angle band (degrees) between the boat's heading and the eye of the wind. */
  min: number
  max: number
  trim: string
  blurb: string
  noGo?: boolean
}

// ----- Quizzes -----

export interface QuizQuestion {
  id: string
  prompt: string
  choices: string[]
  answer: number
  explain?: string
}

export interface Quiz {
  tier: TierId
  passThreshold: number
  questions: QuizQuestion[]
}
