import type { ReactNode } from 'react'

// Per-knot diagrams for the KnotAnimator.
//
// Each knot gets its OWN art so the picture actually distinguishes one knot
// from another (the previous version drew one generic squiggle for all of
// them). The art is two layers:
//   • `scaffold` — the static thing the knot is tied to or with (a post, ring,
//     cleat, spar, boom+sail, or a second rope). Built from simple SVG
//     primitives so it is reliably recognisable.
//   • `rope`     — the working line as a single path, which the animator
//     "draws on" progressively as the learner advances through the steps.
//
// These are deliberately STYLISED schematics, not photoreal tying frames; the
// authoritative tying detail lives in each knot's written steps. The animator
// labels them as diagrams accordingly.

export interface KnotArt {
  /** Optional viewBox override; defaults to '0 0 240 200'. */
  viewBox?: string
  /** Static context drawn behind the working rope. */
  scaffold?: ReactNode
  /** The working-rope path, revealed progressively across the steps. */
  rope: string
}

// Reused as the fallback if a knot has no bespoke art yet.
const GENERIC_ROPE =
  'M30 150 C 70 40, 170 40, 150 110 C 135 165, 70 150, 105 95 C 135 48, 205 85, 205 155'

export const GENERIC_ART: KnotArt = { rope: GENERIC_ROPE }

export const KNOT_ART: Record<string, KnotArt> = {
  // A clean figure "8" with a tail — the stopper's signature shape.
  'figure-eight': {
    rope:
      'M120 100 C 84 82, 84 44, 120 44 C 156 44, 156 82, 120 100 ' +
      'C 84 118, 84 156, 120 156 C 156 156, 156 118, 120 100 L 152 174',
  },

  // A horn cleat (base post + capped cross-bar) with the line laid over it.
  'cleat-hitch': {
    scaffold: (
      <>
        <rect className="knot-scaffold" x="108" y="116" width="24" height="40" rx="3" />
        <rect className="knot-scaffold" x="68" y="100" width="104" height="18" rx="9" />
      </>
    ),
    rope:
      'M30 158 C 64 156, 80 146, 96 134 C 118 120, 150 116, 162 106 ' +
      'C 170 100, 154 96, 140 104 C 116 118, 84 118, 74 126 ' +
      'C 66 132, 92 134, 116 124',
  },

  // The fixed loop, with the small "rabbit hole" nip and the tail through it.
  bowline: {
    rope:
      'M120 72 C 72 84, 72 158, 120 166 C 168 158, 168 92, 130 80 ' +
      'C 146 72, 142 54, 122 60 C 108 64, 118 80, 130 76 L 152 52',
  },

  // Two crossing turns over a vertical rail/post — the clove hitch's "X".
  'clove-hitch': {
    scaffold: <rect className="knot-scaffold" x="112" y="28" width="18" height="148" rx="4" />,
    rope:
      'M42 138 C 82 120, 118 96, 150 76 M44 78 C 84 98, 120 122, 152 142',
  },

  // Two interlocking bights — the classic flat square-knot schematic.
  'reef-knot': {
    rope:
      'M24 110 C 70 110, 96 110, 110 95 C 126 78, 120 68, 104 74 ' +
      'C 90 79, 100 96, 122 100 M216 90 C 170 90, 144 90, 130 105 ' +
      'C 114 122, 120 132, 136 126 C 150 121, 140 104, 118 100',
  },

  // The tie around a furled sail sitting on the boom, finished with a
  // quick-release bight that stands proud of the bundle.
  'slip-knot-sail-tie': {
    scaffold: (
      <>
        <rect className="knot-scaffold" x="20" y="120" width="200" height="10" rx="5" />
        <rect className="knot-scaffold-sail" x="44" y="92" width="152" height="30" rx="15" />
      </>
    ),
    rope:
      'M120 80 C 94 80, 94 136, 120 136 C 146 136, 146 80, 120 80 ' +
      'C 132 68, 152 66, 146 82 C 142 93, 126 88, 132 77 L 154 56',
  },

  // A mooring ring with a round turn through it and the half hitches running
  // back along the standing part.
  'round-turn-two-half-hitches': {
    scaffold: <circle className="knot-scaffold" cx="66" cy="100" r="30" />,
    rope:
      'M210 100 L150 100 M150 100 C 156 86, 172 88, 170 102 ' +
      'C 168 114, 152 112, 150 102 M150 100 L116 100 ' +
      'C 92 100, 88 82, 110 80 C 88 78, 88 100, 110 104 ' +
      'C 88 106, 92 122, 114 117',
  },

  // The thinner working rope (gold) threading a bight of a thicker rope
  // (the muted scaffold) — different stroke widths read as different diameters.
  'sheet-bend': {
    scaffold: (
      <path className="knot-scaffold-rope" d="M70 50 C 116 50, 116 150, 70 150" />
    ),
    rope:
      'M208 150 C 152 150, 120 138, 96 118 C 80 106, 96 92, 112 98 ' +
      'C 134 105, 88 90, 72 96 C 56 102, 80 120, 102 116',
  },

  // Riding turns gripping a loaded spar/rope (the vertical scaffold).
  'rolling-hitch': {
    scaffold: <rect className="knot-scaffold" x="150" y="24" width="16" height="152" rx="4" />,
    rope:
      'M34 152 C 90 152, 122 150, 158 134 C 182 123, 150 114, 134 124 ' +
      'C 118 134, 182 118, 160 106 C 144 97, 128 106, 150 98 ' +
      'C 176 86, 150 78, 137 88',
  },
}
