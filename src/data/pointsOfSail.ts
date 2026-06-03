import type { PointOfSail } from '../types'

// Bands are the absolute angle (degrees) between the boat's heading and the eye
// of the wind: 0° = pointing straight into the wind, 180° = dead downwind.
export const POINTS_OF_SAIL: PointOfSail[] = [
  {
    id: 'no-go',
    name: 'No-Go Zone (In Irons)',
    min: 0,
    max: 45,
    noGo: true,
    trim: 'Sails luff uselessly and flap. There is no drive — the boat stalls and drifts.',
    blurb: 'Roughly 45° either side of the true wind. You cannot sail here; you must bear away onto a close-hauled course to get moving.',
  },
  {
    id: 'close-hauled',
    name: 'Close-Hauled',
    min: 45,
    max: 60,
    trim: 'Sheets in hard, sails close to the centreline. This is as close to the wind as the boat will sail.',
    blurb: 'Sailing upwind at the edge of the no-go zone. To reach a point dead upwind you must tack — zig-zag in a series of close-hauled legs.',
  },
  {
    id: 'close-reach',
    name: 'Close Reach',
    min: 60,
    max: 80,
    trim: 'Sheets eased a little from close-hauled. Fast and comfortable.',
    blurb: 'Between close-hauled and a beam reach — an efficient, easy point of sail.',
  },
  {
    id: 'beam-reach',
    name: 'Beam Reach',
    min: 80,
    max: 100,
    trim: 'Sheets about halfway out; wind across the beam (the side) of the boat.',
    blurb: 'The wind is at roughly 90°. Usually the fastest and most comfortable point of sail.',
  },
  {
    id: 'broad-reach',
    name: 'Broad Reach',
    min: 100,
    max: 160,
    trim: 'Sheets well eased; wind over the aft quarter.',
    blurb: 'Wind coming from behind and to the side. Fast and stable, but stay alert for an accidental jibe.',
  },
  {
    id: 'running',
    name: 'Running',
    min: 160,
    max: 180,
    trim: 'Sheets all the way out, sails square to the wind. Consider wing-on-wing.',
    blurb: 'Sailing dead downwind. The slowest point of sail and the one with the highest accidental-jibe risk — watch the boom.',
  },
]

/** Classify an absolute wind angle (0–180°) into a point of sail. */
export function classifyPointOfSail(absAngleDeg: number): PointOfSail {
  const a = Math.min(180, Math.max(0, absAngleDeg))
  return (
    POINTS_OF_SAIL.find((p) => a >= p.min && a < p.max) ??
    POINTS_OF_SAIL[POINTS_OF_SAIL.length - 1]
  )
}
