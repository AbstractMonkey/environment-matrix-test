import type { ReactNode } from 'react'

// Step-by-step knot diagrams for the KnotAnimator.
//
// Each knot is drawn as an ordered set of rope SEGMENTS on a 240×200 canvas.
// A segment carries:
//   • `step` — the 0-based instruction step at which it appears, so the picture
//     builds up in lockstep with the written steps;
//   • `z`    — stacking order. Every segment is painted as a wide "casing"
//     stroke in the stage background colour underneath its coloured core, so a
//     higher-z segment visibly crosses OVER a lower-z one with the classic
//     knot-book gap. Getting over/under right is the entire point of a knot
//     diagram, so z is chosen per crossing, and a single run of rope is split
//     into several segments wherever its depth changes.
//   • `tint` — 'a' (gold, the working line) or 'b' (blue, a second rope or the
//     opposite end), and `w`, a width multiplier for thicker rope.
//   • `tip`  — draws a direction arrowhead at the segment's end so the learner
//     can see which way the working end is travelling on the current step.
//
// `fixtures` are the static things a knot is tied around (post, ring, cleat,
// boom + sail, …). They also carry a z — a rail the rope passes behind simply
// sits at a higher z than the rope's back passes.
//
// All colours are set inline (not via CSS classes) so the diagrams render
// correctly anywhere — including the headless renderer in scripts/render-art.tsx
// used to proof this artwork.

export interface RopeSeg {
  /** SVG path data for this run of rope. */
  d: string
  /** 0-based instruction step at which this segment appears. */
  step: number
  /** Stacking order: higher z paints later and crosses OVER lower z. */
  z: number
  /** Rope tint: working line 'a' (gold) or second rope/end 'b' (blue). */
  tint?: 'a' | 'b'
  /** Width multiplier (thicker rope for e.g. the sheet bend's big bight). */
  w?: number
  /** Draw a direction arrowhead at the end of this segment. */
  tip?: boolean
}

export interface Fixture {
  node: ReactNode
  z: number
  /** Optional: only show from this step on (e.g. "pull to set" arrows). */
  step?: number
}

export interface KnotArt {
  segs: RopeSeg[]
  fixtures?: Fixture[]
  /** Optional transform applied to the whole drawing (layout nudges). */
  transform?: string
}

export const VIEW_W = 240
export const VIEW_H = 200

/** Solid stage colour — the rope casing strokes must match it exactly. */
export const STAGE_BG = '#0b2130'

export const ROPE_COLOR = { a: '#e9b64a', b: '#5fa8c7' } as const
const CORE_W = 8
const CASING_W = 13.5

// Muted palette for fixtures.
const FIX = {
  wood: '#33505f',
  woodEdge: '#4f7387',
  metal: '#5a7383',
  metalEdge: '#7e98a8',
  sail: 'rgba(233, 182, 74, 0.28)',
  sailEdge: 'rgba(233, 182, 74, 0.55)',
  hint: '#8fb3c4',
}

/** Small double-chevron "pull" arrow used on set/tighten steps. */
function pull(x: number, y: number, angleDeg: number): ReactNode {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angleDeg})`} key={`${x}-${y}`}>
      <path
        d="M0 -7 L7 0 L0 7 M-7 -7 L0 0 L-7 7"
        fill="none"
        stroke={FIX.hint}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  )
}

/**
 * Pure renderer for one knot at one step. Shared by the interactive
 * KnotAnimator and the headless artwork proofing script.
 */
export function KnotDiagram({
  art,
  step,
  ariaLabel,
}: {
  art: KnotArt
  step: number
  ariaLabel?: string
}) {
  type Layer =
    | { kind: 'seg'; z: number; i: number; seg: RopeSeg }
    | { kind: 'fix'; z: number; i: number; fix: Fixture }

  const layers: Layer[] = [
    ...(art.fixtures ?? []).map((fix, i): Layer => ({ kind: 'fix', z: fix.z, i, fix })),
    ...art.segs.map((seg, i): Layer => ({ kind: 'seg', z: seg.z, i, seg })),
  ].sort((p, q) => p.z - q.z || p.i - q.i)

  // The arrow tip belongs on the newest visible tipped segment only.
  const tipStep = Math.max(
    -1,
    ...art.segs.filter((s) => s.tip && s.step <= step).map((s) => s.step),
  )

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="knot-svg"
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        {(['a', 'b'] as const).map((t) => (
          <marker
            key={t}
            id={`knot-tip-${t}`}
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="2.1"
            markerHeight="2.1"
            orient="auto-start-reverse"
          >
            <path d="M0.5 0.5 L9.5 5 L0.5 9.5 Z" fill={ROPE_COLOR[t]} />
          </marker>
        ))}
      </defs>

      <rect x="0" y="0" width={VIEW_W} height={VIEW_H} rx="10" fill={STAGE_BG} />

      <g transform={art.transform}>
      {layers.map((layer) => {
        if (layer.kind === 'fix') {
          const visible = (layer.fix.step ?? 0) <= step
          return (
            <g key={`f${layer.i}`} className="knot-layer" opacity={visible ? 1 : 0}>
              {layer.fix.node}
            </g>
          )
        }
        const s = layer.seg
        const tint = s.tint ?? 'a'
        const w = s.w ?? 1
        const visible = s.step <= step
        const showTip = s.tip && s.step === tipStep
        return (
          <g key={`s${layer.i}`} className="knot-layer" opacity={visible ? 1 : 0}>
            <path
              d={s.d}
              fill="none"
              stroke={STAGE_BG}
              strokeWidth={CASING_W * w}
              strokeLinecap="round"
            />
            <path
              d={s.d}
              fill="none"
              stroke={ROPE_COLOR[tint]}
              strokeWidth={CORE_W * w}
              strokeLinecap="round"
              markerEnd={showTip ? `url(#knot-tip-${tint})` : undefined}
            />
            {/* a thin sheen line gives the rope a hint of roundness */}
            <path
              d={s.d}
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={1.6 * w}
              strokeLinecap="round"
            />
          </g>
        )
      })}
      </g>
    </svg>
  )
}

// ---------------------------------------------------------------------------
// The artwork
// ---------------------------------------------------------------------------

export const KNOT_ART: Record<string, KnotArt> = {
  // Loose, open figure-eight: standing part exits bottom, the weave
  // alternates over/under at every crossing.
  'figure-eight': {
    transform: 'translate(30 -10)',
    segs: [
      // Standing part rising from the bottom edge.
      { d: 'M 112 196 C 112 184 111 172 108 158', step: 0, z: 3 },
      // The loop: around to the left and back, crossing OVER the standing part.
      {
        d:
          'M 108 158 C 102 138 84 128 68 134 C 50 141 46 162 60 172 ' +
          'C 72 181 92 178 104 168 C 114 159 122 148 128 136',
        step: 0, z: 4, tip: true,
      },
      // Wrap: up and around, passing BEHIND the standing part above the loop.
      {
        d: 'M 128 136 C 134 120 128 104 112 100 C 96 96 78 106 72 138',
        step: 1, z: 2, tip: true,
      },
      // Tuck down through the original loop…
      { d: 'M 72 138 C 70 148 72 158 78 168', step: 2, z: 3 },
      // …emerging OVER its bottom rim.
      { d: 'M 78 168 C 82 178 90 186 100 190', step: 2, z: 5, tip: true },
      // Set: the short tail passes under the standing part and exits.
      { d: 'M 100 190 C 108 193 118 192 128 188', step: 3, z: 1, tip: true },
    ],
    fixtures: [
      { node: pull(100, 206, 90), z: 0, step: 3 },
      { node: pull(146, 184, 5), z: 0, step: 3 },
    ],
  },

  // A horn cleat seen from above: base turns disappear beneath the cleat,
  // figure-8s cross over the top, locking flip traps the tail.
  'cleat-hitch': {
    fixtures: [
      {
        node: (
          <g>
            <path
              d={
                'M 38 100 C 38 91 48 87 60 89 L 100 94 C 113 90 127 90 140 94 ' +
                'L 180 89 C 192 87 202 91 202 100 C 202 109 192 113 180 111 ' +
                'L 140 106 C 127 110 113 110 100 106 L 60 111 C 48 113 38 109 38 100 Z'
              }
              fill={FIX.metal}
              stroke={FIX.metalEdge}
              strokeWidth="1.5"
            />
            <circle cx="108" cy="100" r="3" fill={STAGE_BG} opacity="0.7" />
            <circle cx="132" cy="100" r="3" fill={STAGE_BG} opacity="0.7" />
          </g>
        ),
        z: 5,
      },
    ],
    segs: [
      // Load line arrives from bottom-left…
      { d: 'M 18 178 C 44 168 64 152 76 132', step: 0, z: 2 },
      // …takes a full turn around the base (passes beneath the cleat).
      { d: 'M 76 132 C 84 116 110 112 134 116 C 158 120 174 116 182 106', step: 0, z: 1 },
      { d: 'M 182 106 C 188 96 182 86 168 84 C 150 82 120 86 96 84', step: 0, z: 1 },
      { d: 'M 96 84 C 80 82 70 88 66 98', step: 0, z: 1, tip: true },
      // Figure-8 across the top: over the near horn, diagonal over the body.
      { d: 'M 66 98 C 62 110 70 120 84 122 C 110 126 150 84 172 80', step: 1, z: 6 },
      { d: 'M 172 80 C 186 78 192 86 188 96', step: 1, z: 6, tip: true },
      // Second diagonal of the 8, back across the body.
      { d: 'M 188 96 C 184 108 172 116 156 112 C 132 106 96 78 74 76', step: 2, z: 7 },
      // Locking flip: small hitch over the left horn, tail tucked UNDER.
      { d: 'M 74 76 C 58 74 50 82 52 92', step: 2, z: 7 },
      { d: 'M 52 92 C 54 102 64 106 76 102 C 88 98 102 92 118 94', step: 3, z: 4, tip: true },
    ],
  },

  // The classic vertical bowline, drawn to match the canonical tying diagram:
  // rabbit hole at centre, big loop below, tail finishing INSIDE the loop.
  // The classic vertical bowline, drawn to match the canonical tying diagram:
  // rabbit hole at centre, big loop below, tail finishing INSIDE the loop.
  bowline: {
    segs: [
      // Standing part from the top edge.
      { d: 'M 98 2 C 98 18 99 32 102 44', step: 0, z: 3 },
      // The rabbit hole: an overhand loop. The strand sweeps the bottom rim
      // first (this rim lies OVER everything that later passes through)…
      { d: 'M 102 44 C 98 56 102 72 116 80 C 132 88 152 82 158 66', step: 0, z: 6 },
      // …then the top rim, whose left end crosses back over the entry.
      { d: 'M 158 66 C 164 50 152 34 134 32 C 124 31 112 33 105 38', step: 0, z: 2 },
      { d: 'M 105 38 C 97 44 90 54 87 66', step: 0, z: 4, tip: true },
      // The big loop — the rest of the rope, hanging below.
      {
        d:
          'M 87 66 C 74 92 68 124 78 150 C 90 180 132 190 158 172 ' +
          'C 180 156 188 130 180 108 C 175 94 168 88 160 84',
        step: 0, z: 1,
      },
      // Up through the hole — UNDER the near rim ("the rabbit comes out").
      { d: 'M 160 84 C 152 94 138 98 127 92 C 118 87 112 74 114 62', step: 1, z: 5, tip: true },
      // Around the back of the standing part ("around the tree"):
      // out over the standing…
      { d: 'M 114 62 C 114 46 112 30 104 20 C 98 12 88 8 80 14', step: 2, z: 7 },
      // …and back behind it.
      { d: 'M 80 14 C 74 22 76 32 86 36 C 94 39 104 38 110 32', step: 2, z: 1, tip: true },
      // Back down through the hole: over the far rim, under the near rim.
      { d: 'M 110 32 C 117 42 121 52 121 62 C 121 74 123 84 128 94', step: 3, z: 5, tip: true },
      // Set: the tail lies INSIDE the loop, alongside the standing part.
      { d: 'M 128 94 C 131 102 132 110 131 120', step: 4, z: 5, tip: true },
    ],
    fixtures: [
      { node: pull(84, 10, -90), z: 0, step: 4 },
      { node: pull(122, 196, 90), z: 0, step: 4 },
    ],
  },

  // Clove hitch on a horizontal rail: two turns whose connecting diagonal
  // forms the X, with the working end tucked under it.
  'clove-hitch': {
    fixtures: [
      {
        node: (
          <rect x="16" y="62" width="208" height="26" rx="12" fill={FIX.wood} stroke={FIX.woodEdge} strokeWidth="1.5" />
        ),
        z: 3,
      },
    ],
    segs: [
      // Standing part (holding the fender) up to the rail.
      { d: 'M 74 196 C 80 168 88 132 96 102', step: 0, z: 2 },
      // First turn: straight over the front of the rail…
      { d: 'M 96 102 C 99 90 101 76 101 64 C 101 58 100 54 99 50', step: 0, z: 4 },
      // …and around behind it.
      { d: 'M 99 50 C 112 45 123 53 123 66 C 123 78 119 90 113 99', step: 0, z: 1, tip: true },
      // Cross the face diagonally — over the rail — to start the second turn.
      { d: 'M 113 99 C 124 88 140 70 152 56 C 154 53 157 51 160 50', step: 1, z: 6 },
      // Second turn around behind the rail.
      { d: 'M 160 50 C 173 46 183 54 183 67 C 183 79 179 91 172 100', step: 1, z: 1, tip: true },
      // Tuck the end under the diagonal: it exits up between the turns.
      { d: 'M 172 100 C 163 107 150 109 141 103 C 133 98 130 88 132 78', step: 2, z: 5 },
      { d: 'M 132 78 C 133 70 134 60 133 50', step: 2, z: 5, tip: true },
      // Set.
      { d: 'M 133 50 C 132 42 131 34 130 26', step: 3, z: 5, tip: true },
    ],
  },

  // The flat square knot, drawn to match the canonical diagram exactly:
  // gold and blue bights interlock; perfectly symmetric when correct.
  'reef-knot': {
    segs: [
      // ----- first half knot (the lower interlock) -----
      // Gold long end, in from the left, OVER the blue column.
      { d: 'M 8 128 L 96 128', step: 0, z: 6 },
      // Gold dips through the bottom lobe (under blue's lobe).
      { d: 'M 96 128 C 118 128 124 136 134 152 C 142 166 152 172 160 166 C 166 162 168 148 168 138', step: 0, z: 2, tip: true },
      // Blue long end, in from the right, UNDER the gold column.
      { d: 'M 232 128 L 144 128', step: 0, z: 3, tint: 'b' },
      // Blue dips through the bottom lobe (over gold's lobe).
      { d: 'M 144 128 C 122 128 116 136 106 152 C 98 166 88 172 80 166 C 74 162 72 148 72 138', step: 0, z: 4, tint: 'b', tip: true },
      // Columns rising out of the first half knot.
      { d: 'M 168 138 L 168 96', step: 0, z: 7 },
      { d: 'M 72 138 L 72 96', step: 0, z: 3, tint: 'b' },
      // ----- second half knot (the upper interlock) -----
      { d: 'M 168 96 L 168 54', step: 1, z: 7 },
      { d: 'M 72 96 L 72 54', step: 1, z: 3, tint: 'b' },
      // Gold arcs over the top lobe (under blue's arc), down to the left line.
      { d: 'M 168 54 C 168 38 158 24 141 24 C 127 24 116 36 107 50 C 101 58 93 64 84 64', step: 1, z: 2 },
      // Gold short end finishes OVER the blue column.
      { d: 'M 84 64 L 30 64', step: 1, z: 6, tip: true },
      // Blue arcs over the top lobe (over gold's arc), down to the right line.
      { d: 'M 72 54 C 72 38 82 24 99 24 C 113 24 124 36 133 50 C 139 58 147 64 156 64', step: 1, z: 4, tint: 'b' },
      // Blue short end finishes UNDER the gold column.
      { d: 'M 156 64 L 210 64', step: 1, z: 3, tint: 'b', tip: true },
    ],
    fixtures: [
      { node: pull(22, 140, 180), z: 0, step: 2 },
      { node: pull(218, 116, 0), z: 0, step: 2 },
    ],
  },

  // Sail tie around a furled sail on the boom (seen end-on), finished as a
  // slipped reef knot — one bow of a shoelace.
  'slip-knot-sail-tie': {
    fixtures: [
      {
        node: (
          <g>
            <rect x="102" y="86" width="36" height="28" rx="7" fill={FIX.metal} stroke={FIX.metalEdge} strokeWidth="1.5" />
            <ellipse cx="120" cy="60" rx="42" ry="28" fill={FIX.sail} stroke={FIX.sailEdge} strokeWidth="1.5" />
            <path d="M 88 48 C 104 38 136 38 152 48 M 84 62 C 104 52 136 52 156 62" fill="none" stroke={FIX.sailEdge} strokeWidth="1" opacity="0.6" />
          </g>
        ),
        z: 1,
      },
    ],
    segs: [
      // The tie passes around sail AND boom; both ends meet below the boom.
      {
        d:
          'M 106 116 C 72 106 60 80 66 58 C 73 32 94 22 120 22 ' +
          'C 146 22 167 32 174 58 C 180 80 168 106 134 116',
        step: 0, z: 2, tip: true,
      },
      // First half knot: right end over left, tucked under.
      { d: 'M 106 116 C 102 130 110 142 128 148', step: 1, z: 3 },
      { d: 'M 134 116 C 138 130 130 142 112 148', step: 1, z: 4, tip: true },
      // Second half begun — push a BIGHT through, not the bare end.
      {
        d:
          'M 128 148 C 144 154 160 150 166 138 C 171 128 164 118 152 120 ' +
          'C 142 122 138 132 144 140',
        step: 2, z: 5, tip: true,
      },
      // Snug it down: the bow is set, the free tail hangs ready.
      { d: 'M 112 148 C 100 152 88 154 76 152', step: 3, z: 2 },
      // Cast off: one pull on the tail spills the whole knot.
      { d: 'M 76 152 C 62 150 48 146 38 138', step: 4, z: 2, tip: true },
    ],
  },

  // A mooring ring: a full round turn through it, then two half hitches that
  // together form a clove hitch on the standing part.
  'round-turn-two-half-hitches': {
    fixtures: [
      {
        node: <rect x="40" y="40" width="26" height="16" rx="3" fill={FIX.metal} stroke={FIX.metalEdge} strokeWidth="1" />,
        z: 0,
      },
      {
        node: <circle cx="56" cy="88" r="28" fill="none" stroke={FIX.metal} strokeWidth="11" />,
        z: 3,
      },
    ],
    segs: [
      // Load line from the right; first pass through the ring.
      { d: 'M 228 124 C 190 122 152 118 122 110', step: 0, z: 4 },
      { d: 'M 122 110 C 104 105 90 100 80 96', step: 0, z: 4 },
      // Around the ring's bar: behind, then out the front.
      { d: 'M 80 96 C 64 90 52 96 52 108 C 52 118 62 124 74 120', step: 0, z: 2 },
      // Second pass — completing the full round turn.
      { d: 'M 74 120 C 82 117 88 110 86 102 C 84 92 70 86 60 92 C 50 98 50 110 58 116', step: 0, z: 5, tip: true },
      // First half hitch: over the standing part, tucked under itself.
      { d: 'M 58 116 C 74 128 100 136 124 138', step: 1, z: 5 },
      { d: 'M 124 138 C 136 139 142 130 136 122 C 130 114 118 114 114 122', step: 1, z: 6 },
      { d: 'M 114 122 C 112 128 117 134 126 134', step: 1, z: 1, tip: true },
      // Second half hitch, same direction.
      { d: 'M 126 134 C 138 134 150 134 160 136', step: 2, z: 5 },
      { d: 'M 160 136 C 172 138 178 130 172 122 C 166 114 154 114 150 122', step: 2, z: 6 },
      { d: 'M 150 122 C 148 128 153 134 162 133', step: 2, z: 1, tip: true },
      // Set.
      { d: 'M 162 133 C 174 132 186 132 198 133', step: 3, z: 1, tip: true },
    ],
  },

  // Sheet bend: a bight in the thick blue rope; the thin gold line comes up
  // through it, around behind both legs, and tucks under itself.
  'sheet-bend': {
    segs: [
      // The thick rope's bight: standing leg, the bend, and the short end.
      { d: 'M 12 60 L 110 60', step: 0, z: 2, tint: 'b', w: 1.4 },
      { d: 'M 110 60 C 136 60 148 75 148 92 C 148 109 136 124 110 124', step: 0, z: 3, tint: 'b', w: 1.4 },
      { d: 'M 110 124 L 42 124', step: 0, z: 2, tint: 'b', w: 1.4 },
      // Thin line rises from below and passes UP THROUGH the bight
      // (under the near rim as it enters).
      { d: 'M 208 184 C 180 168 154 152 136 136', step: 1, z: 2.5 },
      { d: 'M 136 136 C 124 126 116 114 112 102', step: 1, z: 2.5, tip: true },
      // Around behind BOTH legs: over the neck…
      { d: 'M 112 102 C 108 86 112 70 124 62 C 130 58 137 56 143 58', step: 2, z: 4 },
      // …then behind, emerging below.
      { d: 'M 143 58 C 155 66 157 81 149 95 C 143 105 133 120 121 131', step: 2, z: 1, tip: true },
      // Tuck under itself — NOT through the bight.
      { d: 'M 121 131 C 130 133 138 138 142 146', step: 3, z: 2.2, tip: true },
      // Set: the tail exits downward, on the SAME side as the blue short end.
      { d: 'M 142 146 C 145 156 146 168 144 180', step: 4, z: 2.2, tip: true },
    ],
    fixtures: [
      { node: pull(220, 184, 25), z: 0, step: 4 },
      { node: pull(20, 92, 180), z: 0, step: 4 },
    ],
  },

  // Rolling hitch on a loaded rope: two riding turns crossing the standing
  // part on the load side, finished with a half hitch beyond it.
  'rolling-hitch': {
    segs: [
      // The jammed, loaded rope (thick, blue, vertical; load pulls DOWN).
      { d: 'M 96 4 L 96 196', step: 0, z: 3, tint: 'b', w: 1.4 },
      // Working line leads away to the winch, lower right.
      { d: 'M 226 174 C 192 166 158 152 130 134', step: 0, z: 2 },
      // Riding turn one: behind the rope, then across the front — riding
      // OVER the standing part.
      { d: 'M 130 134 C 118 126 104 118 92 116', step: 0, z: 2 },
      { d: 'M 92 116 C 80 114 72 120 74 130', step: 0, z: 1 },
      { d: 'M 74 130 C 76 142 92 148 108 144 C 118 141 128 136 136 130', step: 0, z: 4, tip: true },
      // Riding turn two, just below, again over the standing part.
      { d: 'M 136 130 C 128 138 116 144 104 146', step: 0, z: 4 },
      { d: 'M 104 146 C 88 148 78 156 82 166', step: 0, z: 1 },
      { d: 'M 82 166 C 86 176 102 180 116 174 C 126 170 136 162 144 154', step: 0, z: 5, tip: true },
      // Third turn on the FAR side of the standing part (above the lead).
      { d: 'M 144 154 C 148 142 146 128 138 116 C 132 107 126 100 120 96', step: 1, z: 1.5 },
      { d: 'M 120 96 C 108 88 94 86 86 92', step: 1, z: 1, tip: true },
      // The half hitch: over the rope and tucked under its own pass.
      { d: 'M 86 92 C 76 82 80 70 92 66 C 102 63 112 66 118 74', step: 2, z: 6 },
      { d: 'M 118 74 C 110 78 106 84 106 92', step: 2, z: 1.2 },
      { d: 'M 106 92 C 114 96 124 94 130 86 C 138 76 146 64 152 50', step: 2, z: 1.2, tip: true },
    ],
    fixtures: [
      {
        node: (
          <g>
            {pull(96, 186, 90)}
            <text x="110" y="192" fontSize="11" fill={FIX.hint}>load</text>
          </g>
        ),
        z: 0,
      },
    ],
  },
}

/** Fallback shown if a knot has no artwork (should not happen). */
export const GENERIC_ART: KnotArt = {
  segs: [
    { d: 'M 30 150 C 70 40 170 40 150 110 C 135 165 70 150 105 95 C 135 48 205 85 205 155', step: 0, z: 1, tip: true },
  ],
}
