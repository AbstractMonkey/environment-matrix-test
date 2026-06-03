import React from 'react'

export interface EnsignSVGProps {
  activeId: string | null
  exploredIds: string[]
  onActivate: (id: string, el: SVGGElement) => void
  onLeave: () => void
  onSelect: (id: string) => void
}

interface HotspotProps {
  id: string
  label: string
  activeId: string | null
  exploredIds: string[]
  onActivate: (id: string, el: SVGGElement) => void
  onLeave: () => void
  onSelect: (id: string) => void
  children: React.ReactNode
}

function Hotspot({
  id, label, activeId, exploredIds, onActivate, onLeave, onSelect, children,
}: HotspotProps) {
  const active = activeId === id
  const explored = exploredIds.includes(id)
  const cls =
    'hotspot' + (active ? ' is-active' : '') + (explored ? ' is-explored' : '')
  return (
    <g
      className={cls}
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={active}
      onMouseEnter={(e) => onActivate(id, e.currentTarget)}
      onMouseLeave={onLeave}
      onFocus={(e) => onActivate(id, e.currentTarget)}
      onBlur={onLeave}
      onClick={() => onSelect(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(id)
        }
      }}
    >
      <title>{label}</title>
      {children}
    </g>
  )
}

// Static palette kept inline so the schematic renders correctly even before CSS
// loads; the highlight ring is added via CSS on hover/focus/active.
const COL = {
  hull: '#e8eef2', hullStroke: '#9bb0bd',
  keel: '#37505e', rudder: '#26333c',
  alloy: '#b9c4cc', alloyStroke: '#8a97a0',
  sail: 'rgba(255,255,255,0.92)', sailStroke: '#c4d0d8',
  cabin: '#cbb588', cockpit: '#b89b6a', hatch: '#6f5b39',
  deck: '#d7dde1', deckStroke: '#aeb9c0',
  berth: '#e3d9c0', head: '#9bb7c2', plan: '#eef3f6',
  standing: '#7b8a94', running: '#c98a3b', steel: '#9fb0bb',
  water: '#13303d', caption: '#7d8d98', label: '#37505e',
}

// Non-interactive decoration shouldn't intercept pointer events meant for the
// hotspots that sit behind/around it.
const inert = { pointerEvents: 'none' as const }

/**
 * A schematic of a Pearson Ensign drawn to the proportions of Pearson's own
 * line drawing: a tall masthead sloop rig (the rig stands taller than the hull
 * is long), a long low hull with a reverse transom, and a full keel with the
 * rudder hung on its trailing edge. Bow to the LEFT. Below the sail plan sits a
 * top-down deck plan. Every labelled `<g>` is a focusable, clickable hotspot
 * keyed to a part id in data/parts.ts.
 */
export default function EnsignSVG(props: EnsignSVGProps) {
  const h = (id: string, label: string, children: React.ReactNode) => (
    <Hotspot id={id} label={label} {...props}>{children}</Hotspot>
  )

  return (
    <svg
      className="ensign-svg"
      viewBox="40 10 600 880"
      role="group"
      aria-label="Interactive diagram of a Pearson Ensign sailboat: side sail plan and top-down deck plan"
    >
      {/* ---------------- SIDE PROFILE / SAIL PLAN (bow to the left) ------- */}
      <text x="58" y="30" fill={COL.caption} fontSize="14" fontWeight="600"
        letterSpacing="1.5" style={inert} aria-hidden="true">SAIL PLAN</text>

      {/* Water (decorative) */}
      <rect x="40" y="586" width="600" height="118" fill={COL.water} style={inert} />

      {/* Waterline */}
      {h('waterline', 'Waterline', (
        <>
          <rect x="118" y="580" width="442" height="12" fill="transparent" />
          <line x1="118" y1="586" x2="560" y2="586" stroke="#cfe4ee" strokeWidth="2" strokeDasharray="6 5" />
        </>
      ))}

      {/* Hull (canoe body) */}
      {h('hull', 'Hull', (
        <path
          className="ps"
          d="M134 540 C240 552 430 558 556 546 L546 586 C470 600 320 604 206 590 C172 585 150 566 134 540 Z"
          fill={COL.hull} stroke={COL.hullStroke} strokeWidth="2"
        />
      ))}

      {/* Keel (full keel) */}
      {h('keel', 'Keel (full keel)', (
        <path className="ps" d="M252 584 C246 612 258 644 296 652 L444 650 L470 590 Z"
          fill={COL.keel} />
      ))}

      {/* Rudder — hung on the keel's trailing edge, aft */}
      {h('rudder', 'Rudder', (
        <path className="ps" d="M470 590 L482 592 L460 652 L444 650 Z" fill={COL.rudder} />
      ))}

      {/* Bow (accent at the stem) */}
      {h('bow', 'Bow', (
        <path className="ps" d="M134 540 C150 564 168 580 192 588 L184 598 C152 592 130 566 134 540 Z"
          fill={COL.hull} stroke={COL.hullStroke} strokeWidth="2" />
      ))}

      {/* Stern / transom (reverse transom, aft) */}
      {h('stern', 'Stern / Transom', (
        <path className="ps" d="M556 546 L546 586 L532 584 L540 545 Z"
          fill={COL.hull} stroke={COL.hullStroke} strokeWidth="2" />
      ))}

      {/* Foredeck */}
      {h('foredeck', 'Foredeck', (
        <path className="ps" d="M150 540 C190 546 226 550 252 552 L252 560 C226 558 190 554 150 548 Z"
          fill={COL.deck} stroke={COL.deckStroke} strokeWidth="1" />
      ))}

      {/* Coachroof / cabin top */}
      {h('coachroof', 'Coachroof / Cabin top', (
        <path className="ps"
          d="M252 556 L252 540 C252 534 258 532 268 532 L420 532 C428 532 432 536 432 542 L432 556 Z"
          fill={COL.cabin} stroke="#a8965f" strokeWidth="1" />
      ))}

      {/* Companionway */}
      {h('companionway', 'Companionway', (
        <rect className="ps" x="412" y="536" width="20" height="20" rx="3" fill={COL.hatch} />
      ))}

      {/* Cockpit */}
      {h('cockpit', 'Cockpit (8 ft 8 in)', (
        <path className="ps" d="M436 548 L540 548 L544 560 L440 560 Z" fill={COL.cockpit} stroke="#9c8557" strokeWidth="1" />
      ))}

      {/* Mainsail */}
      {h('mainsail', 'Mainsail', (
        <path className="ps" d="M304 60 L308 506 L522 512 Z" fill={COL.sail} stroke={COL.sailStroke} strokeWidth="1.5" />
      ))}

      {/* Jib / genoa */}
      {h('jib', 'Jib / Headsail', (
        <path className="ps" d="M300 66 L134 536 L332 498 Z" fill={COL.sail} stroke={COL.sailStroke} strokeWidth="1.5" />
      ))}

      {/* Backstay */}
      {h('backstay', 'Backstay', (
        <>
          <line x1="300" y1="48" x2="554" y2="548" stroke="transparent" strokeWidth="14" />
          <line className="ps-line" x1="300" y1="48" x2="554" y2="548" stroke={COL.standing} strokeWidth="2" />
        </>
      ))}

      {/* Forestay */}
      {h('forestay', 'Forestay (Headstay)', (
        <>
          <line x1="300" y1="48" x2="134" y2="536" stroke="transparent" strokeWidth="14" />
          <line className="ps-line" x1="300" y1="48" x2="134" y2="536" stroke={COL.standing} strokeWidth="2" />
        </>
      ))}

      {/* Shrouds */}
      {h('shrouds', 'Shrouds (upper & lower)', (
        <>
          <line x1="300" y1="250" x2="264" y2="554" stroke="transparent" strokeWidth="12" />
          <line x1="300" y1="250" x2="336" y2="554" stroke="transparent" strokeWidth="12" />
          <line className="ps-line" x1="300" y1="250" x2="264" y2="554" stroke={COL.standing} strokeWidth="1.6" />
          <line className="ps-line" x1="300" y1="250" x2="336" y2="554" stroke={COL.standing} strokeWidth="1.6" />
        </>
      ))}

      {/* Spreaders */}
      {h('spreaders', 'Spreaders', (
        <line className="ps-line" x1="282" y1="250" x2="318" y2="250" stroke={COL.alloy} strokeWidth="4" strokeLinecap="round" />
      ))}

      {/* Main halyard (running rigging) */}
      {h('main-halyard', 'Main halyard', (
        <>
          <line x1="309" y1="52" x2="309" y2="552" stroke="transparent" strokeWidth="12" />
          <line className="ps-line" x1="309" y1="52" x2="309" y2="552" stroke={COL.running} strokeWidth="1.6" strokeDasharray="2 3" />
        </>
      ))}

      {/* Mast (keel-stepped, tall masthead rig) */}
      {h('mast', 'Mast', (
        <rect className="ps" x="296" y="44" width="8" height="512" rx="3" fill={COL.alloy} stroke={COL.alloyStroke} strokeWidth="1" />
      ))}

      {/* Boom */}
      {h('boom', 'Boom', (
        <rect className="ps" x="304" y="508" width="222" height="9" rx="4" fill={COL.alloy} stroke={COL.alloyStroke} strokeWidth="1" />
      ))}

      {/* Boom vang */}
      {h('boom-vang', 'Boom vang', (
        <>
          <line x1="372" y1="512" x2="306" y2="552" stroke="transparent" strokeWidth="12" />
          <line className="ps-line" x1="372" y1="512" x2="306" y2="552" stroke={COL.running} strokeWidth="1.8" />
        </>
      ))}

      {/* Mainsheet */}
      {h('mainsheet', 'Mainsheet', (
        <>
          <line x1="522" y1="514" x2="540" y2="556" stroke="transparent" strokeWidth="12" />
          <line className="ps-line" x1="522" y1="514" x2="540" y2="556" stroke={COL.running} strokeWidth="1.8" />
          <rect x="532" y="554" width="14" height="6" rx="2" fill={COL.alloy} />
        </>
      ))}

      {/* Bow pulpit */}
      {h('bow-pulpit', 'Bow pulpit', (
        <>
          <line x1="118" y1="534" x2="150" y2="534" stroke="transparent" strokeWidth="14" />
          <path className="ps-line" d="M122 540 L120 528 L142 526 L150 534" fill="none" stroke={COL.steel} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ))}

      {/* Tiller (drawn over the cockpit) */}
      {h('tiller', 'Tiller', (
        <>
          <line x1="498" y1="557" x2="440" y2="560" stroke="transparent" strokeWidth="16" />
          <line className="ps-line" x1="498" y1="557" x2="440" y2="560" stroke="#7a5a2a" strokeWidth="6" strokeLinecap="round" />
        </>
      ))}

      {/* ---------------- DECK PLAN (top-down, bow to the left) ----------- */}
      <line x1="60" y1="716" x2="620" y2="716" stroke={COL.deckStroke} strokeWidth="1" strokeDasharray="2 6" opacity="0.5" style={inert} />
      <text x="58" y="744" fill={COL.caption} fontSize="14" fontWeight="600"
        letterSpacing="1.5" style={inert} aria-hidden="true">DECK PLAN</text>

      {/* Hull outline (decorative — the deck edge seen from above) */}
      <path style={inert}
        d="M138 800 C232 748 330 744 470 750 L552 760 L552 840 L470 850 C330 856 232 852 138 800 Z"
        fill={COL.plan} stroke={COL.hullStroke} strokeWidth="2" />

      {/* Centerline */}
      <line x1="150" y1="800" x2="548" y2="800" stroke={COL.hullStroke} strokeWidth="1" strokeDasharray="5 5" opacity="0.7" style={inert} />

      {/* Mast partner (decorative) */}
      <circle cx="300" cy="800" r="5" fill={COL.alloy} stroke={COL.alloyStroke} strokeWidth="1" style={inert} />

      {/* Cockpit footprint (decorative; the cockpit hotspot lives in the sail plan) */}
      <path style={inert} d="M446 776 L548 776 L548 824 L446 824 Z"
        fill={COL.cockpit} stroke="#9c8557" strokeWidth="1" opacity="0.85" />

      {/* Tiller footprint (decorative) */}
      <line x1="544" y1="800" x2="470" y2="800" stroke="#7a5a2a" strokeWidth="4" strokeLinecap="round" style={inert} />

      {/* Cuddy cabin (coachroof footprint) */}
      {h('cuddy-cabin', 'Cuddy cabin', (
        <path className="ps"
          d="M262 768 L430 768 C438 768 440 774 440 800 C440 826 438 832 430 832 L262 832 C252 832 246 822 246 800 C246 778 252 768 262 768 Z"
          fill={COL.cabin} stroke="#a8965f" strokeWidth="1.5" opacity="0.85" />
      ))}

      {/* Berths (port & starboard) */}
      {h('berths', 'Berths', (
        <>
          <rect className="ps" x="300" y="772" width="120" height="20" rx="6" fill={COL.berth} stroke="#c4b489" strokeWidth="1" />
          <rect className="ps" x="300" y="808" width="120" height="20" rx="6" fill={COL.berth} stroke="#c4b489" strokeWidth="1" />
        </>
      ))}
      <text x="360" y="786" fill={COL.label} fontSize="10" fontWeight="600"
        textAnchor="middle" letterSpacing="0.5" style={inert} aria-hidden="true">BERTH</text>
      <text x="360" y="822" fill={COL.label} fontSize="10" fontWeight="600"
        textAnchor="middle" letterSpacing="0.5" style={inert} aria-hidden="true">BERTH</text>

      {/* Head / W.C. (forward, between the berths) */}
      {h('head', 'Head (W.C.)', (
        <rect className="ps" x="258" y="790" width="34" height="20" rx="3" fill={COL.head} stroke="#7e9aa6" strokeWidth="1" />
      ))}
      <text x="275" y="804" fill={COL.label} fontSize="9" fontWeight="600"
        textAnchor="middle" style={inert} aria-hidden="true">W.C.</text>
    </svg>
  )
}
