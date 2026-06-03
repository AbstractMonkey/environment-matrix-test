import type { Knot } from '../types'

// Seven core knots in canonical teaching order, plus the rolling hitch bonus.
export const KNOTS: Knot[] = [
  {
    id: 'figure-eight',
    name: 'Figure-Eight',
    nickname: 'Stopper Knot',
    tier: 1,
    use: 'The end of every sheet and halyard, so the line cannot run out through a block.',
    steps: [
      'Make a loop near the end of the line, with the working end crossing OVER the standing part.',
      'Wrap the working end behind the standing part.',
      'Tuck the working end DOWN through the original loop.',
      'Pull both ends to set — it should look like a figure "8".',
    ],
  },
  {
    id: 'cleat-hitch',
    name: 'Cleat Hitch',
    tier: 1,
    use: 'Securing a line to a horn cleat — dock lines and halyards.',
    steps: [
      'Approach the cleat from the side opposite the load and take ONE full turn around the base.',
      'Form a figure-8 across the top of the horns — over one, under the other.',
      'On the final pass, make a small loop and flip it (a locking under-hitch) over the horn.',
      'Pull tight. You should see two parallel lines on top with one crossing line.',
    ],
  },
  {
    id: 'bowline',
    name: 'Bowline',
    nickname: 'King of Knots',
    tier: 2,
    use: "A fixed loop that won't slip or jam — sheet-to-clew, a mooring loop, a rescue loop.",
    steps: [
      'Make a small overhand loop in the standing part — "the rabbit hole".',
      'Pass the working end UP through the hole — "the rabbit comes out".',
      'Around the back of the standing part — "around the tree".',
      'Back DOWN through the hole — "and back down".',
      'Pull the standing part and the loop to set. It unties easily after any load.',
    ],
  },
  {
    id: 'clove-hitch',
    name: 'Clove Hitch',
    tier: 2,
    use: 'Temporary work — fenders on a rail, hanging coils. It works loose if the line rotates, so never use it for permanent mooring.',
    steps: [
      'Wrap once around the rail or post.',
      'Cross over the first wrap and wrap a second time.',
      'Tuck the working end UNDER the second wrap.',
      'Pull tight.',
    ],
  },
  {
    id: 'reef-knot',
    name: 'Reef (Square) Knot',
    tier: 3,
    use: 'Tying two ends of the SAME line together — reef points, sail ties. Not for joining two separate lines under load.',
    steps: [
      'Cross the right end OVER the left and tuck UNDER — a half knot.',
      'Cross what is now the left end OVER the right and tuck UNDER — a second half knot.',
      'Remember: "right over left, left over right." Both ends exit on the same side of each loop.',
    ],
  },
  {
    id: 'round-turn-two-half-hitches',
    name: 'Round Turn & Two Half Hitches',
    tier: 3,
    use: 'Securing a line to a ring, piling, or mooring permanently and under load.',
    steps: [
      'Pass the working end completely around the object TWICE — the "round turn" carries the load while you tie.',
      'Bring the working end across the standing part and tuck under itself — a half hitch.',
      'Repeat in the same direction — a second half hitch.',
      'Pull tight.',
    ],
  },
  {
    id: 'sheet-bend',
    name: 'Sheet Bend',
    tier: 4,
    use: 'Joining two ropes, especially of different diameters.',
    steps: [
      'Form a bight (a U-shape) in the thicker rope.',
      'Pass the working end of the thinner rope UP through the bight.',
      'Around behind both legs of the bight.',
      'Tuck the working end UNDER itself on the front — not through. Both free ends exit on the same side.',
      'Pull all four ends to set. Double the tuck for slippery line.',
    ],
  },
  {
    id: 'rolling-hitch',
    name: 'Rolling Hitch',
    nickname: 'Bonus',
    tier: 5,
    use: 'Taking the load off a jammed sheet; it grips a rope or spar against a pull in one direction.',
    steps: [
      'Wrap twice around the object, both wraps crossing OVER the standing part on the same side — these grip.',
      'Take a third wrap on the OTHER side of the original wraps — a half hitch in the opposite direction.',
      'Tuck the end under and pull.',
    ],
  },
]

export const KNOT_BY_ID: Record<string, Knot> = Object.fromEntries(
  KNOTS.map((k) => [k.id, k]),
)
