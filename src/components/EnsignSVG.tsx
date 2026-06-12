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
  wood: '#7a5a2a',
}

// Non-interactive decoration shouldn't intercept pointer events meant for the
// hotspots that sit behind/around it.
const inert = { pointerEvents: 'none' as const }

/**
 * A three-view schematic of a Pearson Ensign drawn to the layout and
 * proportions of Pearson's own line drawing — sail plan, hull profile, and
 * deck plan, bow to the RIGHT (naval-architecture convention, as in the
 * original): a 7/8 fractional sloop (the forestay meets the mast at the
 * hounds, below the masthead), a long low hull with gentle sheer and short
 * overhangs, and a cut-away full keel with the rudder hung on its trailing
 * edge. Every labelled `<g>` is a focusable, clickable hotspot keyed to a
 * part id in data/parts.ts.
 */
export default function EnsignSVG(props: EnsignSVGProps) {
  const h = (id: string, label: string, children: React.ReactNode) => (
    <Hotspot id={id} label={label} {...props}>{children}</Hotspot>
  )

  // Rig geometry (sail plan): mast at x=350, masthead y=48, deck y≈518.
  // 7/8 fractional: the forestay hounds sit 1/8 of the span below the head.
  const HOUNDS_Y = 108

  return (
    <svg
      className="ensign-svg"
      viewBox="40 10 600 990"
      role="group"
      aria-label="Interactive three-view diagram of a Pearson Ensign sailboat: sail plan, hull profile, and deck plan, bow to the right"
    >
      {/* =================== SAIL PLAN (bow to the right) ================ */}
      <text x="58" y="34" fill={COL.caption} fontSize="14" fontWeight="600"
        letterSpacing="1.5" style={inert} aria-hidden="true">SAIL PLAN</text>

      {/* Water band (decorative) */}
      <rect x="40" y="558" width="600" height="40" fill={COL.water} style={inert} />
      <line x1="40" y1="558" x2="640" y2="558" stroke="#cfe4ee" strokeWidth="1.5"
        strokeDasharray="6 5" opacity="0.6" style={inert} />

      {/* Mainsail — tall, high-aspect; slight roach in the leech */}
      {h('mainsail', 'Mainsail', (
        <path className="ps"
          d="M 353 64 L 355 472 L 178 474 C 236 340 298 172 353 64 Z"
          fill={COL.sail} stroke={COL.sailStroke} strokeWidth="1.5" />
      ))}
      {/* Battens (decorative) */}
      <g stroke={COL.sailStroke} strokeWidth="1" opacity="0.7" style={inert} aria-hidden="true">
        <line x1="305" y1="160" x2="340" y2="166" />
        <line x1="270" y1="260" x2="316" y2="268" />
        <line x1="234" y1="360" x2="296" y2="368" />
        <line x1="200" y1="452" x2="280" y2="460" />
      </g>

      {/* Jib — hanked on the forestay, clew just abaft the mast */}
      {h('jib', 'Jib / Headsail', (
        <path className="ps"
          d="M 357 124 C 400 254 446 390 478 506 L 366 486 C 362 366 358 242 357 124 Z"
          fill={COL.sail} stroke={COL.sailStroke} strokeWidth="1.5" />
      ))}

      {/* Backstay — masthead to the transom */}
      {h('backstay', 'Backstay', (
        <>
          <line x1="350" y1="48" x2="134" y2="518" stroke="transparent" strokeWidth="14" />
          <line className="ps-line" x1="350" y1="48" x2="134" y2="518" stroke={COL.standing} strokeWidth="2" />
        </>
      ))}

      {/* Forestay — from the HOUNDS (7/8 height) to the stemhead */}
      {h('forestay', 'Forestay (Headstay)', (
        <>
          <line x1="350" y1={HOUNDS_Y} x2="490" y2="512" stroke="transparent" strokeWidth="14" />
          <line className="ps-line" x1="350" y1={HOUNDS_Y} x2="490" y2="512" stroke={COL.standing} strokeWidth="2" />
        </>
      ))}

      {/* Shrouds — uppers over the spreaders, lowers beneath them */}
      {h('shrouds', 'Shrouds (upper & lower)', (
        <>
          <line x1="350" y1="116" x2="338" y2="514" stroke="transparent" strokeWidth="12" />
          <line x1="350" y1="320" x2="362" y2="514" stroke="transparent" strokeWidth="12" />
          <polyline points="350,116 328,300 338,514" fill="none" className="ps-line" stroke={COL.standing} strokeWidth="1.6" />
          <polyline points="350,116 372,300 362,514" fill="none" className="ps-line" stroke={COL.standing} strokeWidth="1.6" />
          <line className="ps-line" x1="350" y1="320" x2="340" y2="514" stroke={COL.standing} strokeWidth="1.3" />
          <line className="ps-line" x1="350" y1="320" x2="360" y2="514" stroke={COL.standing} strokeWidth="1.3" />
        </>
      ))}

      {/* Spreaders */}
      {h('spreaders', 'Spreaders', (
        <>
          <line x1="328" y1="300" x2="372" y2="300" stroke="transparent" strokeWidth="12" />
          <line className="ps-line" x1="328" y1="300" x2="372" y2="300" stroke={COL.alloy} strokeWidth="4" strokeLinecap="round" />
        </>
      ))}

      {/* Main halyard (running rigging, dashed, aft side of the mast) */}
      {h('main-halyard', 'Main halyard', (
        <>
          <line x1="345" y1="54" x2="345" y2="516" stroke="transparent" strokeWidth="10" />
          <line className="ps-line" x1="345" y1="54" x2="345" y2="516" stroke={COL.running} strokeWidth="1.6" strokeDasharray="2 3" />
        </>
      ))}

      {/* Mast — keel-stepped; the head stands proud above the hounds */}
      {h('mast', 'Mast', (
        <rect className="ps" x="348" y="46" width="8" height="474" rx="3"
          fill={COL.alloy} stroke={COL.alloyStroke} strokeWidth="1" />
      ))}

      {/* Boom — foot of the main, reaching nearly to the backstay */}
      {h('boom', 'Boom', (
        <rect className="ps" x="172" y="470" width="184" height="9" rx="4"
          fill={COL.alloy} stroke={COL.alloyStroke} strokeWidth="1" />
      ))}

      {/* Boom vang */}
      {h('boom-vang', 'Boom vang', (
        <>
          <line x1="306" y1="477" x2="350" y2="516" stroke="transparent" strokeWidth="12" />
          <line className="ps-line" x1="306" y1="477" x2="350" y2="516" stroke={COL.running} strokeWidth="1.8" />
        </>
      ))}

      {/* Mainsheet — boom end down to the traveler at the transom */}
      {h('mainsheet', 'Mainsheet', (
        <>
          <line x1="176" y1="478" x2="146" y2="524" stroke="transparent" strokeWidth="12" />
          <line className="ps-line" x1="176" y1="478" x2="146" y2="524" stroke={COL.running} strokeWidth="1.8" />
          <rect x="138" y="522" width="16" height="6" rx="2" fill={COL.alloy} style={inert} />
        </>
      ))}

      {/* Hull above the waterline (sail plan) */}
      {h('hull', 'Hull', (
        <path className="ps"
          d="M 133 522 C 220 534 360 530 470 516 L 498 512
             C 492 526 486 540 482 554
             C 380 560 250 562 198 558
             C 178 552 152 545 130 538 Z"
          fill={COL.hull} stroke={COL.hullStroke} strokeWidth="2" />
      ))}

      {/* Foredeck */}
      {h('foredeck', 'Foredeck', (
        <path className="ps"
          d="M 414 512 C 438 510 462 506 484 502 L 490 512 C 466 516 440 518 414 520 Z"
          fill={COL.deck} stroke={COL.deckStroke} strokeWidth="1" />
      ))}

      {/* Coachroof / cabin top */}
      {h('coachroof', 'Coachroof / Cabin top', (
        <path className="ps"
          d="M 292 514 L 296 496 C 298 492 302 490 308 490 L 400 488
             C 406 488 410 490 411 494 L 414 512 Z"
          fill={COL.cabin} stroke="#a8965f" strokeWidth="1" />
      ))}

      {/* Companionway */}
      {h('companionway', 'Companionway', (
        <rect className="ps" x="288" y="492" width="14" height="22" rx="3" fill={COL.hatch} />
      ))}

      {/* Cockpit */}
      {h('cockpit', 'Cockpit (8 ft 8 in)', (
        <path className="ps" d="M 150 518 L 286 514 L 288 526 L 152 528 Z"
          fill={COL.cockpit} stroke="#9c8557" strokeWidth="1" />
      ))}

      {/* Tiller */}
      {h('tiller', 'Tiller', (
        <>
          <line x1="148" y1="518" x2="216" y2="512" stroke="transparent" strokeWidth="16" />
          <line className="ps-line" x1="148" y1="518" x2="216" y2="512" stroke={COL.wood} strokeWidth="6" strokeLinecap="round" />
        </>
      ))}

      {/* Chainplates — where the shrouds anchor to the hull */}
      {h('chainplates', 'Chainplates', (
        <>
          <rect x="332" y="508" width="40" height="14" fill="transparent" />
          <rect className="ps" x="335" y="510" width="6" height="12" rx="1" fill={COL.steel} stroke={COL.alloyStroke} strokeWidth="0.8" />
          <rect className="ps" x="359" y="510" width="6" height="12" rx="1" fill={COL.steel} stroke={COL.alloyStroke} strokeWidth="0.8" />
        </>
      ))}

      {/* Bow pulpit */}
      {h('bow-pulpit', 'Bow pulpit', (
        <>
          <line x1="466" y1="504" x2="502" y2="508" stroke="transparent" strokeWidth="16" />
          <path className="ps-line" d="M 468 514 L 470 500 L 494 498 L 500 510"
            fill="none" stroke={COL.steel} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ))}

      {/* =================== HULL PROFILE ================================ */}
      <line x1="60" y1="612" x2="620" y2="612" stroke={COL.deckStroke} strokeWidth="1" strokeDasharray="2 6" opacity="0.5" style={inert} />
      <text x="58" y="638" fill={COL.caption} fontSize="14" fontWeight="600"
        letterSpacing="1.5" style={inert} aria-hidden="true">HULL PROFILE</text>

      {/* Cabin profile (decorative) */}
      <path style={inert}
        d="M 294 664 L 298 650 L 404 644 L 410 658 Z"
        fill={COL.cabin} stroke="#a8965f" strokeWidth="1" opacity="0.9" />

      {/* Hull (canoe body) — gentle sheer, spoon bow, counter stern */}
      {h('hull', 'Hull', (
        <path className="ps"
          d="M 128 662 C 220 674 360 670 472 656 L 500 650
             C 492 666 484 682 478 700
             C 440 710 380 716 320 718
             C 280 719 248 716 226 710
             C 196 700 160 684 134 674 Z"
          fill={COL.hull} stroke={COL.hullStroke} strokeWidth="2" />
      ))}

      {/* Bow (the stem) */}
      {h('bow', 'Bow', (
        <path className="ps"
          d="M 472 656 L 500 650 C 492 666 484 682 478 700 C 472 702 466 703 460 704
             C 464 688 468 671 472 656 Z"
          fill={COL.hull} stroke={COL.hullStroke} strokeWidth="1.5" />
      ))}

      {/* Stern / transom — small, slightly reversed */}
      {h('stern', 'Stern / Transom', (
        <path className="ps"
          d="M 128 662 L 134 674 C 152 682 168 689 184 694 L 178 668 C 160 666 143 664 128 662 Z"
          fill={COL.hull} stroke={COL.hullStroke} strokeWidth="1.5" />
      ))}

      {/* Keel — full keel, cut away forward, deepest aft */}
      {h('keel', 'Keel (full keel)', (
        <path className="ps"
          d="M 460 704 C 426 722 386 738 340 745 C 310 749 274 750 250 748
             L 240 705 C 300 711 392 711 460 704 Z"
          fill={COL.keel} />
      ))}

      {/* Rudder — hung on the keel's trailing edge */}
      {h('rudder', 'Rudder', (
        <path className="ps"
          d="M 222 702 L 246 747 L 208 742 L 206 700 Z"
          fill={COL.rudder} />
      ))}

      {/* Rudder hinge line (decorative, as in Pearson's drawing) */}
      <line x1="221" y1="701" x2="242" y2="746" stroke="#cfe4ee" strokeWidth="1"
        strokeDasharray="4 3" opacity="0.55" style={inert} />

      {/* Waterline */}
      {h('waterline', 'Waterline', (
        <>
          <rect x="120" y="690" width="400" height="12" fill="transparent" />
          <line className="ps-line" x1="124" y1="696" x2="516" y2="696" stroke="#cfe4ee" strokeWidth="2" strokeDasharray="6 5" />
        </>
      ))}

      {/* =================== DECK PLAN (top-down) ======================== */}
      <line x1="60" y1="786" x2="620" y2="786" stroke={COL.deckStroke} strokeWidth="1" strokeDasharray="2 6" opacity="0.5" style={inert} />
      <text x="58" y="812" fill={COL.caption} fontSize="14" fontWeight="600"
        letterSpacing="1.5" style={inert} aria-hidden="true">DECK PLAN</text>

      {/* Deck outline (decorative) */}
      <path style={inert}
        d="M 503 896 C 466 864 412 848 352 842 C 290 836 210 840 162 854
           C 140 860 128 870 128 896 C 128 922 140 932 162 938
           C 210 952 290 956 352 950 C 412 944 466 928 503 896 Z"
        fill={COL.plan} stroke={COL.hullStroke} strokeWidth="2" />

      {/* Centerline */}
      <line x1="134" y1="896" x2="498" y2="896" stroke={COL.hullStroke} strokeWidth="1" strokeDasharray="5 5" opacity="0.7" style={inert} />

      {/* Bow pulpit footprint (decorative) */}
      <path style={inert} d="M 478 870 C 496 878 502 888 502 896 C 502 904 496 914 478 922"
        fill="none" stroke={COL.steel} strokeWidth="2" opacity="0.8" />

      {/* Forehatch (decorative) */}
      <rect x="434" y="884" width="22" height="24" rx="3" fill={COL.deck} stroke={COL.deckStroke} strokeWidth="1" style={inert} />

      {/* Cockpit footprint with well (decorative; hotspot in the sail plan) */}
      <g style={inert}>
        <rect x="142" y="866" width="148" height="60" rx="10" fill={COL.cockpit} stroke="#9c8557" strokeWidth="1" opacity="0.9" />
        <rect x="154" y="878" width="124" height="36" rx="7" fill="#a8895a" stroke="#9c8557" strokeWidth="1" />
      </g>

      {/* Tiller footprint (decorative) */}
      <line x1="132" y1="896" x2="212" y2="896" stroke={COL.wood} strokeWidth="4" strokeLinecap="round" style={inert} />

      {/* Cuddy cabin (coachroof footprint) */}
      {h('cuddy-cabin', 'Cuddy cabin', (
        <path className="ps"
          d="M 300 852 L 404 852 C 419 852 426 868 426 896 C 426 924 419 940 404 940
             L 300 940 C 294 940 292 924 292 896 C 292 868 294 852 300 852 Z"
          fill={COL.cabin} stroke="#a8965f" strokeWidth="1.5" opacity="0.85" />
      ))}

      {/* Companionway footprint */}
      {h('companionway', 'Companionway', (
        <rect className="ps" x="292" y="880" width="14" height="32" rx="3" fill={COL.hatch} />
      ))}

      {/* Berths (port & starboard) */}
      {h('berths', 'Berths', (
        <>
          <rect className="ps" x="308" y="858" width="84" height="22" rx="7" fill={COL.berth} stroke="#c4b489" strokeWidth="1" />
          <rect className="ps" x="308" y="912" width="84" height="22" rx="7" fill={COL.berth} stroke="#c4b489" strokeWidth="1" />
        </>
      ))}
      <text x="350" y="873" fill={COL.label} fontSize="10" fontWeight="600"
        textAnchor="middle" letterSpacing="0.5" style={inert} aria-hidden="true">BERTH</text>
      <text x="350" y="927" fill={COL.label} fontSize="10" fontWeight="600"
        textAnchor="middle" letterSpacing="0.5" style={inert} aria-hidden="true">BERTH</text>

      {/* Head / W.C. — forward, between the berths */}
      {h('head', 'Head (W.C.)', (
        <rect className="ps" x="396" y="884" width="26" height="24" rx="4" fill={COL.head} stroke="#7e9aa6" strokeWidth="1" />
      ))}
      <text x="409" y="900" fill={COL.label} fontSize="8.5" fontWeight="600"
        textAnchor="middle" style={inert} aria-hidden="true">W.C.</text>

      {/* Mast partner */}
      <circle cx="350" cy="896" r="5" fill={COL.alloy} stroke={COL.alloyStroke} strokeWidth="1" style={inert} />

      {/* Winches — one each side, on the cockpit coamings */}
      {h('winches', 'Winches', (
        <>
          <circle cx="298" cy="854" r="11" fill="transparent" />
          <circle cx="298" cy="938" r="11" fill="transparent" />
          <circle className="ps" cx="298" cy="854" r="7" fill={COL.alloy} stroke={COL.alloyStroke} strokeWidth="1.2" />
          <circle className="ps" cx="298" cy="938" r="7" fill={COL.alloy} stroke={COL.alloyStroke} strokeWidth="1.2" />
          <circle cx="298" cy="854" r="2.4" fill={COL.alloyStroke} style={inert} />
          <circle cx="298" cy="938" r="2.4" fill={COL.alloyStroke} style={inert} />
        </>
      ))}

      {/* Cleats — bow and stern */}
      {h('cleats', 'Cleats', (
        <>
          <rect x="456" y="886" width="26" height="20" fill="transparent" />
          <rect x="130" y="864" width="22" height="14" fill="transparent" />
          <rect x="130" y="914" width="22" height="14" fill="transparent" />
          <path className="ps" d="M 462 892 h 14 m -7 -4 v 8" stroke={COL.steel} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path className="ps" d="M 134 870 h 12 m -6 -3 v 6" stroke={COL.steel} strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <path className="ps" d="M 134 922 h 12 m -6 -3 v 6" stroke={COL.steel} strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </>
      ))}
    </svg>
  )
}
