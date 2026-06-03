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
  standing: '#7b8a94', running: '#c98a3b', steel: '#9fb0bb',
  water: '#13303d',
}

/**
 * A schematic side profile of a Pearson Ensign (bow to the right). Every
 * labelled `<g>` is a focusable, clickable hotspot keyed to a part id in
 * data/parts.ts.
 */
export default function EnsignSVG(props: EnsignSVGProps) {
  const h = (id: string, label: string, children: React.ReactNode) => (
    <Hotspot id={id} label={label} {...props}>{children}</Hotspot>
  )

  return (
    <svg
      className="ensign-svg"
      viewBox="0 0 900 520"
      role="group"
      aria-label="Interactive diagram of a Pearson Ensign sailboat"
    >
      {/* Water (decorative) */}
      <rect x="0" y="398" width="900" height="122" fill={COL.water} />

      {/* Waterline */}
      {h('waterline', 'Waterline', (
        <>
          <rect x="40" y="392" width="820" height="12" fill="transparent" />
          <line x1="40" y1="398" x2="860" y2="398" stroke="#cfe4ee" strokeWidth="2" strokeDasharray="6 5" />
        </>
      ))}

      {/* Hull */}
      {h('hull', 'Hull', (
        <path
          className="ps"
          d="M100 350 C260 358 470 362 650 356 C730 351 800 343 845 330 L840 392 C690 400 460 402 250 398 L102 392 Z"
          fill={COL.hull} stroke={COL.hullStroke} strokeWidth="2"
        />
      ))}

      {/* Keel */}
      {h('keel', 'Keel (full keel)', (
        <path className="ps" d="M300 394 L560 394 L545 472 C480 490 360 490 320 472 Z"
          fill={COL.keel} />
      ))}

      {/* Rudder */}
      {h('rudder', 'Rudder', (
        <path className="ps" d="M300 396 L300 470 L285 468 L290 398 Z" fill={COL.rudder} />
      ))}

      {/* Mainsail */}
      {h('mainsail', 'Mainsail', (
        <path className="ps" d="M558 92 L558 322 L340 330 Z" fill={COL.sail} stroke={COL.sailStroke} strokeWidth="1.5" />
      ))}

      {/* Jib */}
      {h('jib', 'Jib / Headsail', (
        <path className="ps" d="M566 118 L806 350 L648 316 Z" fill={COL.sail} stroke={COL.sailStroke} strokeWidth="1.5" />
      ))}

      {/* Foredeck */}
      {h('foredeck', 'Foredeck', (
        <path className="ps" d="M566 358 L800 346 L806 360 L566 366 Z" fill={COL.deck} stroke={COL.deckStroke} strokeWidth="1" />
      ))}

      {/* Cockpit */}
      {h('cockpit', 'Cockpit (8 ft 8 in)', (
        <path className="ps" d="M150 360 L350 360 L345 386 L156 386 Z" fill={COL.cockpit} stroke="#9c8557" strokeWidth="1" />
      ))}

      {/* Coachroof / cabin top */}
      {h('coachroof', 'Coachroof / Cabin top', (
        <rect className="ps" x="360" y="332" width="205" height="30" rx="10" fill={COL.cabin} stroke="#a8965f" strokeWidth="1" />
      ))}

      {/* Companionway */}
      {h('companionway', 'Companionway', (
        <rect className="ps" x="364" y="338" width="26" height="22" rx="3" fill={COL.hatch} />
      ))}

      {/* Stern / transom */}
      {h('stern', 'Stern / Transom', (
        <path className="ps" d="M98 348 L142 352 L142 392 L100 392 Z" fill={COL.hull} stroke={COL.hullStroke} strokeWidth="2" />
      ))}

      {/* Bow */}
      {h('bow', 'Bow', (
        <path className="ps" d="M800 343 L845 330 L840 392 L806 392 Z" fill={COL.hull} stroke={COL.hullStroke} strokeWidth="2" />
      ))}

      {/* Backstay */}
      {h('backstay', 'Backstay', (
        <>
          <line x1="560" y1="72" x2="118" y2="350" stroke="transparent" strokeWidth="14" />
          <line className="ps-line" x1="560" y1="72" x2="118" y2="350" stroke={COL.standing} strokeWidth="2" />
        </>
      ))}

      {/* Forestay */}
      {h('forestay', 'Forestay (Headstay)', (
        <>
          <line x1="566" y1="112" x2="810" y2="350" stroke="transparent" strokeWidth="14" />
          <line className="ps-line" x1="566" y1="112" x2="810" y2="350" stroke={COL.standing} strokeWidth="2" />
        </>
      ))}

      {/* Shrouds */}
      {h('shrouds', 'Shrouds (upper & lower)', (
        <>
          <line x1="558" y1="165" x2="520" y2="360" stroke="transparent" strokeWidth="12" />
          <line x1="558" y1="165" x2="600" y2="360" stroke="transparent" strokeWidth="12" />
          <line className="ps-line" x1="558" y1="165" x2="520" y2="360" stroke={COL.standing} strokeWidth="1.6" />
          <line className="ps-line" x1="558" y1="165" x2="600" y2="360" stroke={COL.standing} strokeWidth="1.6" />
        </>
      ))}

      {/* Spreaders */}
      {h('spreaders', 'Spreaders', (
        <line className="ps-line" x1="536" y1="166" x2="584" y2="166" stroke={COL.alloy} strokeWidth="4" strokeLinecap="round" />
      ))}

      {/* Main halyard (running rigging) */}
      {h('main-halyard', 'Main halyard', (
        <>
          <line x1="571" y1="80" x2="571" y2="352" stroke="transparent" strokeWidth="12" />
          <line className="ps-line" x1="571" y1="80" x2="571" y2="352" stroke={COL.running} strokeWidth="1.6" strokeDasharray="2 3" />
        </>
      ))}

      {/* Mast */}
      {h('mast', 'Mast', (
        <rect className="ps" x="556" y="70" width="8" height="292" rx="3" fill={COL.alloy} stroke={COL.alloyStroke} strokeWidth="1" />
      ))}

      {/* Boom */}
      {h('boom', 'Boom', (
        <rect className="ps" x="335" y="322" width="225" height="9" rx="4" fill={COL.alloy} stroke={COL.alloyStroke} strokeWidth="1" />
      ))}

      {/* Boom vang */}
      {h('boom-vang', 'Boom vang', (
        <>
          <line x1="470" y1="330" x2="556" y2="360" stroke="transparent" strokeWidth="12" />
          <line className="ps-line" x1="470" y1="330" x2="556" y2="360" stroke={COL.running} strokeWidth="1.8" />
        </>
      ))}

      {/* Mainsheet */}
      {h('mainsheet', 'Mainsheet', (
        <>
          <line x1="352" y1="330" x2="322" y2="376" stroke="transparent" strokeWidth="12" />
          <line className="ps-line" x1="352" y1="330" x2="322" y2="376" stroke={COL.running} strokeWidth="1.8" />
          <rect x="316" y="374" width="14" height="6" rx="2" fill={COL.alloy} />
        </>
      ))}

      {/* Bow pulpit */}
      {h('bow-pulpit', 'Bow pulpit', (
        <>
          <line x1="804" y1="330" x2="830" y2="330" stroke="transparent" strokeWidth="12" />
          <path className="ps-line" d="M806 348 L808 330 L830 330 L828 346" fill="none" stroke={COL.steel} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ))}

      {/* Tiller (drawn last so it sits over the cockpit) */}
      {h('tiller', 'Tiller', (
        <>
          <line x1="300" y1="392" x2="165" y2="360" stroke="transparent" strokeWidth="16" />
          <line className="ps-line" x1="300" y1="392" x2="165" y2="360" stroke="#7a5a2a" strokeWidth="6" strokeLinecap="round" />
        </>
      ))}
    </svg>
  )
}
