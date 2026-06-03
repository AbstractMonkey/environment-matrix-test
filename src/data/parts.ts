import type { Part } from '../types'

// The full anatomy list. `onSvg: true` parts have a clickable hotspot on the
// boat illustration and together make up the Tier 0 "explore all parts" gate.
// Every part — on the SVG or not — appears in the accessible list view.
export const PARTS: Part[] = [
  // ----- Hull & Foils -----
  { id: 'hull', name: 'Hull', group: 'Hull & Foils', onSvg: true,
    description: "The Ensign's solid hand-laid fiberglass body, with a balsa-cored deck above." },
  { id: 'keel', name: 'Keel (full keel)', group: 'Hull & Foils', onSvg: true,
    description: 'A long fixed underwater fin holding 1,200 lb of ballast; it resists sideways slip (leeway) and provides righting moment.' },
  { id: 'rudder', name: 'Rudder', group: 'Hull & Foils', onSvg: true,
    description: 'The hinged blade aft, attached to the trailing edge of the keel and steered by the tiller.' },
  { id: 'tiller', name: 'Tiller', group: 'Hull & Foils', onSvg: true,
    description: 'The wooden steering lever in the cockpit — push it left to turn right, and vice versa.' },
  { id: 'bow', name: 'Bow', group: 'Hull & Foils', onSvg: true,
    description: 'The pointy front end of the boat.' },
  { id: 'stern', name: 'Stern / Transom', group: 'Hull & Foils', onSvg: true,
    description: 'The back end of the boat; the Ensign has a distinctive raised reverse transom.' },
  { id: 'port-starboard', name: 'Port / Starboard', group: 'Hull & Foils', onSvg: false,
    description: 'Left / right when you face forward. Port is red, starboard is green.' },
  { id: 'waterline', name: 'Waterline', group: 'Hull & Foils', onSvg: true,
    description: 'The line where the hull meets the water at rest.' },

  // ----- Spars & Standing Rigging -----
  { id: 'mast', name: 'Mast', group: 'Spars & Standing Rigging', onSvg: true,
    description: 'The vertical anodized aluminum spar; on the Ensign it is keel-stepped.' },
  { id: 'boom', name: 'Boom', group: 'Spars & Standing Rigging', onSvg: true,
    description: 'The horizontal aluminum spar that holds the foot of the mainsail.' },
  { id: 'spreaders', name: 'Spreaders', group: 'Spars & Standing Rigging', onSvg: true,
    description: 'Short horizontal struts on the mast that push the shrouds outboard for support.' },
  { id: 'forestay', name: 'Forestay (Headstay)', group: 'Spars & Standing Rigging', onSvg: true,
    description: "Wire from near the masthead to the bow; the jib's luff hanks onto it." },
  { id: 'backstay', name: 'Backstay', group: 'Spars & Standing Rigging', onSvg: true,
    description: 'Wire from the masthead to the transom — the only rig adjustment Ensign class rules allow underway.' },
  { id: 'shrouds', name: 'Shrouds (upper & lower)', group: 'Spars & Standing Rigging', onSvg: true,
    description: 'Side wires that hold the mast up laterally; the lowers attach below the spreaders.' },
  { id: 'chainplates', name: 'Chainplates', group: 'Spars & Standing Rigging', onSvg: false,
    description: 'Stainless fittings on deck where the shrouds and stays anchor to the hull.' },

  // ----- Sails -----
  { id: 'mainsail', name: 'Mainsail', group: 'Sails', onSvg: true,
    description: 'The big sail set aft of the mast — about 141 sq ft on the Ensign.' },
  { id: 'jib', name: 'Jib / Headsail', group: 'Sails', onSvg: true,
    description: 'The forward sail; the Ensign carries a working jib, blade, genoas and a symmetric spinnaker.' },
  { id: 'sail-corners', name: 'Head / Tack / Clew', group: 'Sails', onSvg: false,
    description: 'The three corners of any sail: top / forward-bottom / aft-bottom.' },
  { id: 'sail-edges', name: 'Luff / Leech / Foot', group: 'Sails', onSvg: false,
    description: 'The three edges of any sail: forward / aft / bottom.' },
  { id: 'battens', name: 'Battens', group: 'Sails', onSvg: false,
    description: 'Stiffeners in the leech of the mainsail that help it hold shape.' },
  { id: 'telltales', name: 'Telltales', group: 'Sails', onSvg: false,
    description: 'Short yarn strips on the sail that reveal the airflow — your primary trim instrument.' },

  // ----- Running Rigging & Hardware -----
  { id: 'main-halyard', name: 'Main halyard', group: 'Running Rigging & Hardware', onSvg: true,
    description: 'The line that hoists the mainsail up the mast.' },
  { id: 'jib-halyard', name: 'Jib halyard', group: 'Running Rigging & Hardware', onSvg: false,
    description: 'The line that hoists the jib.' },
  { id: 'mainsheet', name: 'Mainsheet', group: 'Running Rigging & Hardware', onSvg: true,
    description: 'Controls how far the boom — and therefore the mainsail — is let out.' },
  { id: 'jib-sheets', name: 'Jib sheets (port & starboard)', group: 'Running Rigging & Hardware', onSvg: false,
    description: 'Control jib trim; only the leeward one is loaded at a time.' },
  { id: 'outhaul', name: 'Outhaul', group: 'Running Rigging & Hardware', onSvg: false,
    description: 'Tensions the foot of the mainsail to flatten it.' },
  { id: 'cunningham', name: 'Cunningham / Downhaul', group: 'Running Rigging & Hardware', onSvg: false,
    description: 'Tensions the luff of the mainsail.' },
  { id: 'topping-lift', name: 'Topping lift', group: 'Running Rigging & Hardware', onSvg: false,
    description: 'Holds the boom up when the mainsail is lowered.' },
  { id: 'boom-vang', name: 'Boom vang', group: 'Running Rigging & Hardware', onSvg: true,
    description: 'Pulls down on the boom to flatten the main and control leech twist.' },
  { id: 'winches', name: 'Winches', group: 'Running Rigging & Hardware', onSvg: false,
    description: 'Two on the cockpit coaming give you mechanical advantage on the jib sheets.' },
  { id: 'cleats', name: 'Cleats', group: 'Running Rigging & Hardware', onSvg: false,
    description: 'Horn cleats secure halyards at the mast and dock lines at the bow and stern.' },

  // ----- Deck & Cockpit -----
  { id: 'foredeck', name: 'Foredeck', group: 'Deck & Cockpit', onSvg: true,
    description: 'The deck area forward of the mast where headsail work happens.' },
  { id: 'coachroof', name: 'Coachroof / Cabin top', group: 'Deck & Cockpit', onSvg: true,
    description: 'The raised top of the cuddy cabin.' },
  { id: 'coaming', name: 'Coaming', group: 'Deck & Cockpit', onSvg: false,
    description: 'The raised teak edge around the cockpit that keeps water out and gives you something to brace against.' },
  { id: 'cockpit', name: 'Cockpit (8 ft 8 in)', group: 'Deck & Cockpit', onSvg: true,
    description: "The Ensign's famously generous seating area, with a teak sole and seats." },
  { id: 'companionway', name: 'Companionway', group: 'Deck & Cockpit', onSvg: true,
    description: 'The opening from the cockpit into the cuddy cabin.' },
  { id: 'bow-pulpit', name: 'Bow pulpit', group: 'Deck & Cockpit', onSvg: true,
    description: 'A stainless safety railing at the bow — note the Ensign has no lifelines aft of it.' },
  { id: 'stemhead', name: 'Stemhead fitting', group: 'Deck & Cockpit', onSvg: false,
    description: 'The bow fitting where the forestay anchors to the hull.' },
  { id: 'cuddy-cabin', name: 'Cuddy cabin', group: 'Deck & Cockpit', onSvg: true,
    description: 'A small forward cabin with sitting headroom under the raised coachroof — seen in plan, it holds the berths and head.' },
  { id: 'berths', name: 'Berths', group: 'Deck & Cockpit', onSvg: true,
    description: 'Two settee berths in the cuddy cabin, port and starboard; enough to sleep aboard for an overnight or a weekend of gunkholing.' },
  { id: 'head', name: 'Head (W.C.)', group: 'Deck & Cockpit', onSvg: true,
    description: 'A portable marine toilet — the "head," or W.C. — tucked forward in the cuddy cabin, between the two berths.' },
]

export const SVG_PART_IDS = PARTS.filter((p) => p.onSvg).map((p) => p.id)

export const PART_BY_ID: Record<string, Part> = Object.fromEntries(
  PARTS.map((p) => [p.id, p]),
)

export const PART_GROUPS = [
  'Hull & Foils',
  'Spars & Standing Rigging',
  'Sails',
  'Running Rigging & Hardware',
  'Deck & Cockpit',
] as const
