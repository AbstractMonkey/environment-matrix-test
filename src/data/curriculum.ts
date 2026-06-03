import type { Lesson, Tier, TierId } from '../types'

// ---------------------------------------------------------------------------
// Tiers
// ---------------------------------------------------------------------------

interface TierMeta {
  id: TierId
  slug: string
  name: string
  subtitle: string
  blurb: string
  accent: string
}

const TIER_META: TierMeta[] = [
  { id: 0, slug: 'deckhand', name: 'Deckhand', subtitle: 'Orientation',
    accent: '#58a6b8',
    blurb: 'Meet the boat. Learn her parts, the language of the water, and how to stay safe aboard.' },
  { id: 1, slug: 'crew', name: 'Crew', subtitle: 'How sailing works',
    accent: '#4a90d9',
    blurb: 'Where the wind comes from, how a sail makes a boat go, and the points of sail.' },
  { id: 2, slug: 'skipper', name: 'Skipper', subtitle: 'Boat handling',
    accent: '#5e72e4',
    blurb: 'Take the helm: tacking, jibing, getting underway, and the rules of the road.' },
  { id: 3, slug: 'sail-trimmer', name: 'Sail Trimmer', subtitle: 'Making it go well',
    accent: '#c98a3b',
    blurb: 'Trim, telltales, weather helm, and reefing — turning motion into good motion.' },
  { id: 4, slug: 'voyager', name: 'Voyager', subtitle: 'Seamanship',
    accent: '#2f9e6f',
    blurb: 'Docking, anchoring, crew-overboard recovery, and reading the weather.' },
  { id: 5, slug: 'racer', name: 'Racer', subtitle: 'Expert',
    accent: '#d05f5f',
    blurb: 'Draft control, the slot, starting strategy, roll-tacking, and the spinnaker.' },
]

// ---------------------------------------------------------------------------
// Lessons
// ---------------------------------------------------------------------------

export const LESSONS: Lesson[] = [
  // ===== Tier 0 — Deckhand =====
  {
    id: '0-1', tier: 0, minutes: 5, title: 'Welcome Aboard the Pearson Ensign',
    summary: 'Why this 22-foot full-keel daysailer is one of the most forgiving boats ever built to learn on.',
    body: [
      { kind: 'p', text: 'Carl Alberg designed the Pearson Ensign in 1962. Pearson Yachts built 1,776 of them through 1983, and Ensign Spars of Dunedin, Florida still builds the "Classic" from the original molds today. It is the largest full-keel one-design class in North America and was the first boat ever inducted into the American Sailboat Hall of Fame, on January 25, 2002.' },
      { kind: 'callout', tone: 'key', title: 'Why she is a great teacher',
        text: 'A long full keel, a heavy 40% ballast ratio (1,200 of her 3,000 lb), and a famously large 8 ft 8 in cockpit make the Ensign stiff, stable, and slow to heel. She forgives small mistakes instead of punishing them — and with foam flotation she is effectively unsinkable.' },
      { kind: 'list', ordered: false, items: [
        'Length overall: 22 ft 6 in — waterline 16 ft 9 in',
        'Displacement: 3,000 lb, with 1,200 lb of ballast in the keel',
        'Rig: 7/8 fractional sloop (per Pearson’s own spec sheet)',
        'Crew: easily daysailed by two; best raced by four; cockpit seats eight',
      ] },
      { kind: 'p', text: 'Over the next six tiers you will go from never having touched a tiller to understanding sail trim, the rules of the road, seamanship, and even racing tactics — all anchored on this one boat.' },
    ],
  },
  {
    id: '0-2', tier: 0, minutes: 7, title: 'Parts of the Boat',
    summary: 'Tour the Ensign hotspot by hotspot. Exploring every part unlocks Tier 1.',
    body: [
      { kind: 'p', text: 'Before you can talk about sailing, you need the names of things. Hover, tap, or tab through every labelled part of the boat below. Click a part to pin its description. When you have explored them all, the gate to Tier 1 opens.' },
      { kind: 'callout', tone: 'tip', title: 'Chunk it',
        text: 'The parts are grouped into five families — Hull & Foils, Spars & Standing Rigging, Sails, Running Rigging & Hardware, and Deck & Cockpit. Learn one family at a time rather than all at once.' },
    ],
    interactive: { kind: 'anatomy' },
    video: { title: 'What are the Parts of a Sailboat?', channel: 'PBS Design Squad', url: 'https://www.youtube.com/watch?v=rFA-Kiewdt0' },
  },
  {
    id: '0-3', tier: 0, minutes: 4, title: 'The Language of the Water',
    summary: 'Port, starboard, windward, leeward, and the rest of the vocabulary you will use constantly.',
    body: [
      { kind: 'p', text: 'Sailors use precise words so that a command is never ambiguous in a hurry. Learn these now and the rest of the course will read like plain English.' },
      { kind: 'list', ordered: false, items: [
        'Port / Starboard — left / right when you face forward. Port is red, starboard is green.',
        'Bow / Stern — the front / back of the boat.',
        'Fore / Aft — toward the bow / toward the stern.',
        'Windward — the side the wind hits first (the upwind side).',
        'Leeward ("loo-ard") — the sheltered, downwind side.',
        'Abeam — off the side, at a right angle to the boat.',
        'Ahead / Astern — in front of / behind the boat.',
      ] },
      { kind: 'callout', tone: 'tip', title: 'A memory hook',
        text: 'Port and "left" both have four letters. The wine "port" is red, and so is the port-side navigation light.' },
    ],
  },
  {
    id: '0-4', tier: 0, minutes: 5, title: 'Safety Basics',
    summary: 'The few habits that keep a good day on the water from becoming a bad one.',
    body: [
      { kind: 'callout', tone: 'warning', title: 'The boom is hazard number one',
        text: 'The boom swings across the cockpit at head height when you tack or jibe. The single most important habit you will build is awareness of where the boom is and where it is about to go. Keep your head below it.' },
      { kind: 'list', ordered: false, items: [
        'Wear your PFD (life jacket). On a boat, the unexpected swim is the one you did not plan for.',
        '"One hand for you, one hand for the boat" — always keep a handhold when you move.',
        'The Ensign has no lifelines aft of the bow pulpit. Do not assume a rail to grab in a fall.',
        'Tell someone ashore your plan and expected return.',
        'Know where the bailer, paddle, and (if fitted) the outboard kill switch are.',
      ] },
      { kind: 'p', text: 'The Ensign is forgiving and carries foam flotation, but respect for the boom and a worn PFD are non-negotiable from your very first sail.' },
    ],
  },

  // ===== Tier 1 — Crew =====
  {
    id: '1-1', tier: 1, minutes: 5, title: 'Where Does the Wind Come From?',
    summary: 'Your first and most important skill: knowing the wind direction without instruments.',
    body: [
      { kind: 'p', text: 'Everything in sailing is measured against the wind, so you must always know where it is coming from. You have several free instruments:' },
      { kind: 'list', ordered: false, items: [
        'Your face — turn your head until the wind feels equal on both ears and cheeks; you are now looking straight into it.',
        'The water — ripples and darker patches show gusts and wind direction.',
        'Flags, smoke, and other boats’ sails and burgees ashore and afloat.',
        'The masthead fly (the little wind vane at the top of the mast) and telltales.',
      ] },
      { kind: 'callout', tone: 'key', title: 'The eye of the wind',
        text: 'The exact direction the wind blows from is called the "eye of the wind". The no-go zone — where you cannot sail — sits about 45° either side of it.' },
    ],
  },
  {
    id: '1-2', tier: 1, minutes: 6, title: 'How a Sail Makes the Boat Go',
    summary: 'Lift like an airplane wing upwind, push downwind, and how the keel converts sideways force into forward motion.',
    body: [
      { kind: 'p', text: 'Sailing downwind is intuitive: the wind simply pushes the sail. Sailing toward the wind is the magic. On upwind points of sail, the sail works like a vertical airplane wing — air flowing around its curved shape generates lift that pulls the boat forward and sideways.' },
      { kind: 'p', text: 'That sideways force would just push the boat over and sideways were it not for the keel. The Ensign’s deep full keel resists sideways slip (leeway) and converts most of that side force into forward drive. Heeling and a little leeway are normal; the keel does the rest.' },
      { kind: 'callout', tone: 'key', title: 'The whole trick in one line',
        text: 'Sail = wing makes side force. Keel = resists side force. What is left over drives the boat forward — even when the destination is partly upwind.' },
    ],
    video: { title: 'How Sailboats Sail Into the Wind', channel: 'Stick Science', url: 'https://www.youtube.com/watch?v=FCcKeOmYHFY' },
  },
  {
    id: '1-3', tier: 1, minutes: 5, title: 'True Wind vs. Apparent Wind',
    summary: 'The wind you feel on a moving boat is not the wind that is actually blowing — and the difference matters.',
    body: [
      { kind: 'p', text: 'True wind is the wind over the water. But your boat is moving, which creates its own "wind" — like the breeze you feel cycling on a calm day. The wind you actually feel and trim to is the vector sum of the two: the apparent wind.' },
      { kind: 'list', ordered: false, items: [
        'Apparent wind is always shifted forward of the true wind and feels stronger when you sail upwind.',
        'Sailing downwind, the apparent wind feels lighter because your speed subtracts from it.',
        'You always trim your sails to the apparent wind, because that is the wind hitting them.',
      ] },
      { kind: 'callout', tone: 'tip', text: 'This is why a fast boat sailing across the wind still feels the breeze coming from ahead — it has "made" its own wind.' },
    ],
    video: { title: 'True Wind / Apparent Wind', channel: 'NauticEd', url: 'https://www.youtube.com/watch?v=FaSnAsJPoOg' },
  },
  {
    id: '1-4', tier: 1, minutes: 7, title: 'The Points of Sail',
    summary: 'The keystone diagram of all sailing. Drag the boat around the wind and watch the sails respond.',
    body: [
      { kind: 'p', text: 'A "point of sail" is your direction relative to the wind. There are six, from dead into the wind to dead downwind. Master this and every later lesson clicks into place. Drag the boat around the dial below — the sails reshape and the correct trim appears as you go.' },
      { kind: 'list', ordered: false, items: [
        'In Irons / No-Go Zone — ~45° either side of the wind; sails just flap.',
        'Close-Hauled — ~45°; sheets in hard, as close to the wind as you can sail.',
        'Close Reach — ~60–80°; sheets eased slightly.',
        'Beam Reach — ~90°; wind on the beam, sheets halfway; usually fastest.',
        'Broad Reach — ~135°; wind over the quarter, sheets well out.',
        'Running — ~180°; dead downwind, sails all the way out.',
      ] },
    ],
    interactive: { kind: 'points-of-sail' },
    video: { title: 'Points of Sail With Respect to the Wind', channel: 'NauticEd', url: 'https://www.youtube.com/watch?v=vUl6nj3EwLI' },
  },
  {
    id: '1-5', tier: 1, minutes: 4, title: 'Tack vs. Jibe — What Changes Sides',
    summary: 'The two ways to turn the boat through the wind, and how to tell them apart.',
    body: [
      { kind: 'p', text: 'To change direction relative to the wind you must eventually swing the bow or stern across it. Which end crosses the wind names the maneuver.' },
      { kind: 'list', ordered: false, items: [
        'Tack — you turn the BOW through the eye of the wind. The sails cross gently. Used to work upwind.',
        'Jibe (gybe) — you turn the STERN through the wind. The sails and boom slam across fast. Used downwind, and demands more care.',
      ] },
      { kind: 'callout', tone: 'key', text: 'Bow through the wind = tack. Stern through the wind = jibe. After either one, the wind — and the sails — are on the other side of the boat.' },
    ],
  },
  {
    id: '1-6', tier: 1, minutes: 4, title: 'Knot: The Figure-Eight',
    summary: 'Your first knot — the stopper that keeps a sheet from running out of its block.',
    body: [
      { kind: 'p', text: 'Tie a figure-eight in the end of every sheet and halyard so the line cannot accidentally run all the way out through a block. Step through it below, then tie it on a real piece of rope and mark it done.' },
    ],
    interactive: { kind: 'knot', knotId: 'figure-eight' },
  },
  {
    id: '1-7', tier: 1, minutes: 5, title: 'Knot: The Cleat Hitch',
    summary: 'How to make a line fast to a horn cleat so it holds — and releases — every time.',
    body: [
      { kind: 'p', text: 'The cleat hitch secures dock lines and halyards. Skip the base wrap or the locking flip and it slips, so get all three moves right.' },
    ],
    interactive: { kind: 'knot', knotId: 'cleat-hitch' },
    video: { title: 'Cleat Hitch', channel: 'American Sailing (TheSailingChannel.TV)', url: 'https://www.youtube.com/watch?v=hPHUScg2tWE' },
  },

  // ===== Tier 2 — Skipper =====
  {
    id: '2-1', tier: 2, minutes: 7, title: 'Tacking, Step by Step',
    summary: 'The choreography and commands of turning the bow through the wind.',
    body: [
      { kind: 'steps', title: 'The tack', items: [
        'Skipper checks for traffic and calls "Ready about?" Crew prepares the jib sheets and answers "Ready."',
        'Skipper calls "Helm’s a-lee!" and pushes the tiller smoothly toward the sail (to leeward).',
        'The bow swings up and through the eye of the wind.',
        'As the jib backs, release the old (now windward) jib sheet and trim the new leeward one.',
        'Settle onto the new close-hauled course and center the tiller.',
      ] },
      { kind: 'callout', tone: 'key', title: 'Turn rate: slow–fast–slow',
        text: 'Begin the turn smoothly, turn briskly through the eye of the wind, then ease off as you settle. Turning too fast drags the rudder like a brake and can stall you head-to-wind — "in irons".' },
    ],
    interactive: { kind: 'tack-jibe' },
    video: { title: 'Tacking and Gybing — Sailing Basics', channel: 'Nautilus Sailing', url: 'https://www.youtube.com/watch?v=SWIX6SUh-nc' },
  },
  {
    id: '2-2', tier: 2, minutes: 6, title: 'Jibing, Step by Step',
    summary: 'Turning the stern through the wind — controlled, because the boom comes across fast.',
    body: [
      { kind: 'steps', title: 'The controlled jibe', items: [
        'Check for traffic. Call "Ready to jibe?" / "Ready."',
        'Sheet the mainsail in to near-center BEFORE you turn, so the boom has little distance to travel.',
        'Call "Jibe-ho!" and steer the stern through the wind.',
        'As the boom crosses, ease the mainsheet smoothly out the new side. Switch jib sheets.',
        'Settle onto the new course.',
      ] },
      { kind: 'callout', tone: 'warning', title: 'Heavy air? Chicken jibe.',
        text: 'In strong wind a jibe can be violent. It is perfectly seamanlike to "chicken jibe" instead: turn the long way around with a tack, keeping the bow — not the stern — through the wind.' },
    ],
  },
  {
    id: '2-3', tier: 2, minutes: 6, title: 'Getting Underway, Stopping, and Heaving-To',
    summary: 'Starting, slowing, and parking the boat using the wind alone.',
    body: [
      { kind: 'p', text: 'A sailboat has no brakes — you stop by turning into the wind so the sails luff and the boat coasts to a halt. To get going, bear away from the wind onto a reach and trim in until the sails fill.' },
      { kind: 'list', ordered: false, items: [
        'To accelerate: bear away to a beam reach, trim, and let speed build before heading up.',
        'To stop: head up into the wind ("shooting" head-to-wind) and let the sails flog.',
        'To pause: heave-to — back the jib, ease the main, and lash the tiller to leeward so the boat sits quietly nearly stationary.',
      ] },
      { kind: 'callout', tone: 'tip', text: 'Heaving-to is the sailor’s "pause button" — perfect for reefing, lunch, or just catching your breath.' },
    ],
  },
  {
    id: '2-4', tier: 2, minutes: 4, title: 'Steering With a Tiller',
    summary: 'The one counter-intuitive control on the boat: push the opposite way you want to go.',
    body: [
      { kind: 'p', text: 'Unlike a wheel, a tiller moves opposite to your turn. Push the tiller to port and the bow swings to starboard. It feels backwards for about ten minutes and then becomes second nature.' },
      { kind: 'list', ordered: false, items: [
        'Push the tiller AWAY from the sail to head up (toward the wind).',
        'Pull the tiller TOWARD the sail to bear away (off the wind).',
        'Make small, smooth movements — the full keel responds steadily, not twitchily.',
        'Sit on the windward side so you can see the sails and feel the boat heel.',
      ] },
      { kind: 'callout', tone: 'tip', text: 'A useful mantra: "tiller toward trouble" steers the bow away from it.' },
    ],
  },
  {
    id: '2-5', tier: 2, minutes: 5, title: 'Knot: The Bowline',
    summary: 'The "King of Knots" — a fixed loop that never slips and always unties.',
    body: [
      { kind: 'p', text: 'The bowline puts a secure, non-slipping loop in the end of a line and unties easily even after heavy load. The rabbit story makes it stick: out of the hole, around the tree, back down the hole.' },
    ],
    interactive: { kind: 'knot', knotId: 'bowline' },
    video: { title: 'How to Tie a Bowline Knot', channel: 'Animated Knots by Grog', url: 'https://www.youtube.com/watch?v=YXRnPES0Qec' },
  },
  {
    id: '2-6', tier: 2, minutes: 4, title: 'Knot: The Clove Hitch',
    summary: 'A fast, temporary hitch for fenders and coils — with one important caveat.',
    body: [
      { kind: 'p', text: 'The clove hitch is quick to tie and adjust, ideal for hanging fenders. Just remember it can work loose if the line rotates, so never trust it alone for a permanent mooring.' },
    ],
    interactive: { kind: 'knot', knotId: 'clove-hitch' },
  },
  {
    id: '2-7', tier: 2, minutes: 7, title: 'Rules of the Road for Sailors',
    summary: 'The give-way rules that prevent collisions — and the exceptions to "sail over power".',
    body: [
      { kind: 'callout', tone: 'rule', title: 'The core give-way rules', text: 'Memorize these four and you handle almost every encounter.' },
      { kind: 'list', ordered: false, items: [
        'Opposite tacks: the boat on PORT tack gives way to the boat on starboard tack.',
        'Same tack: the WINDWARD boat gives way to the leeward boat.',
        'Overtaking: the boat that is catching up always gives way.',
        'Sail generally has right of way over power...',
      ] },
      { kind: 'callout', tone: 'warning', title: '...except when it doesn’t', text: 'A sailboat must give way to a power vessel when the sailboat is overtaking it, in a narrow channel, when the power vessel is restricted in its ability to maneuver (fishing, towing, a large ship), or when the "sailboat" is actually motoring — then it counts as power.' },
      { kind: 'callout', tone: 'rule', text: 'Above all: keep a lookout at all times, and do whatever it takes to avoid a collision — the rules never excuse one.' },
    ],
    video: { title: 'Give-Way Rules', channel: 'NauticEd', url: 'https://www.youtube.com/watch?v=-ZTHL5KXCDU' },
  },

  // ===== Tier 3 — Sail Trimmer =====
  {
    id: '3-1', tier: 3, minutes: 5, title: 'Sail Trim Fundamentals',
    summary: 'The one rule that governs all trimming: ease until it luffs, trim until it stops.',
    body: [
      { kind: 'callout', tone: 'key', title: 'The universal trim rule',
        text: 'For any point of sail, ease the sheet out until the front edge (luff) of the sail just begins to flutter, then trim it back in just until the flutter stops. That is the correct trim for that moment.' },
      { kind: 'list', ordered: false, items: [
        'Trim the jib first, then the main — the jib sets up the airflow over the main.',
        'Re-trim every time you change course or the wind shifts.',
        'When in doubt, let it out: an over-eased sail loses a little power; an over-trimmed sail stalls and heels you.',
      ] },
    ],
  },
  {
    id: '3-2', tier: 3, minutes: 6, title: 'Telltales — Your Trim Instrument',
    summary: 'Those little yarn strips are the most honest gauge on the boat. Here is how to read them.',
    body: [
      { kind: 'p', text: 'Telltales are short yarns taped near the luff of the jib and on the leech of the main. Streaming aft smoothly means the air is flowing cleanly. Fluttering means it is not.' },
      { kind: 'list', ordered: false, items: [
        'Jib luff, BOTH streaming aft = perfect angle of attack.',
        'WINDWARD telltale fluttering = sheet in, or bear away, until it flows smoothly.',
        'LEEWARD telltale fluttering = sheet out, or head up, until it flows smoothly.',
        'Main leech (top batten) telltale streaming = good twist; curling to leeward and stalling = over-trimmed, ease the main.',
      ] },
      { kind: 'callout', tone: 'tip', text: 'Steer to the telltales upwind: nudge the bow toward whichever side is fluttering until both fly straight.' },
    ],
  },
  {
    id: '3-3', tier: 3, minutes: 5, title: 'Sailing Upwind Efficiently',
    summary: 'Finding the groove between pinching and footing.',
    body: [
      { kind: 'p', text: 'Close-hauled, there is a narrow "groove" that balances pointing high against keeping speed. Stray too far either side and you lose ground to where you want to go.' },
      { kind: 'list', ordered: false, items: [
        'Pinching = sailing too close to the wind; the boat slows and makes more leeway.',
        'Footing = bearing off a few degrees for speed; sometimes faster overall even though you point lower.',
        'The groove is where the jib telltales both stream and the boat feels "light" and quick.',
      ] },
      { kind: 'callout', tone: 'tip', text: 'In puffs, feather up (head up slightly) to stay flat; in lulls, foot off to keep speed.' },
    ],
  },
  {
    id: '3-4', tier: 3, minutes: 5, title: 'Sailing Downwind',
    summary: 'Wing-on-wing, preventing the accidental jibe, and respecting the boom.',
    body: [
      { kind: 'p', text: 'Downwind is relaxing but demands vigilance, because the boom is far out and the wind is behind you. Sail a touch high of dead-downwind to keep control, or set "wing-on-wing" with the jib on the opposite side to the main.' },
      { kind: 'callout', tone: 'warning', title: 'The accidental jibe',
        text: 'If the wind sneaks behind the mainsail, the boom slams across without warning — dangerous to heads and to the rig. Watch the masthead fly, keep someone on the mainsheet, and consider rigging a preventer.' },
    ],
  },
  {
    id: '3-5', tier: 3, minutes: 6, title: 'Weather Helm and Lee Helm',
    summary: 'What the tiller is telling you about balance — and how to fix it.',
    body: [
      { kind: 'callout', tone: 'key', title: 'Weather helm',
        text: 'The boat wants to turn UP into the wind, so you hold the tiller slightly to weather. A small amount (3–5°) is good: it gives feedback and rounds you up safely in a gust. Too much slows the boat and tires you.' },
      { kind: 'list', ordered: false, items: [
        'Reduce excess weather helm: ease the mainsheet or drop the traveler, flatten the main with outhaul and backstay, or reef.',
      ] },
      { kind: 'callout', tone: 'warning', title: 'Lee helm',
        text: 'The boat wants to turn AWAY from the wind. This is always undesirable and a little dangerous in gusts. Fix it by trimming the main in, easing the jib, or moving crew weight aft.' },
    ],
  },
  {
    id: '3-6', tier: 3, minutes: 5, title: 'Reefing',
    summary: 'Reducing sail area so the boat stays balanced and comfortable as the wind builds.',
    body: [
      { kind: 'p', text: 'When the boat heels too far, develops heavy weather helm, or simply feels overpowered, reduce sail. "Reef early, reef often" — the first time you think about it is usually the right time.' },
      { kind: 'steps', title: 'Slab reefing the main', items: [
        'Head up toward the wind or heave-to to take load off the sail.',
        'Ease the halyard and pull the luff (tack) reef cringle down to the boom; secure it.',
        'Winch the leech (clew) reef line tight along the boom.',
        'Re-tension the halyard, tidy the loose sailcloth with the reef points (a reef knot!), and bear away.',
      ] },
    ],
  },
  {
    id: '3-7', tier: 3, minutes: 4, title: 'Knot: Round Turn & Two Half Hitches',
    summary: 'The reliable way to make fast to a ring, rail, or piling under load.',
    body: [
      { kind: 'p', text: 'The round turn carries the load while you tie, and the two half hitches lock it off. This is your go-to for tying up to a fixed object permanently.' },
    ],
    interactive: { kind: 'knot', knotId: 'round-turn-two-half-hitches' },
  },
  {
    id: '3-8', tier: 3, minutes: 4, title: 'Knot: The Reef Knot',
    summary: 'Tying the two ends of one line together — the knot in those reef points.',
    body: [
      { kind: 'p', text: 'Right over left, left over right. The reef (square) knot joins the two ends of the same line, as when you bundle the loose foot of a reefed sail. It is not for joining two separate lines under load — use a sheet bend for that.' },
    ],
    interactive: { kind: 'knot', knotId: 'reef-knot' },
  },

  // ===== Tier 4 — Voyager =====
  {
    id: '4-1', tier: 4, minutes: 6, title: 'Docking Under Sail',
    summary: 'Approaching slowly, into the wind, with a controlled stop.',
    body: [
      { kind: 'p', text: 'Without an engine you dock by managing momentum. Plan your approach so that the final few boat-lengths are into the wind, letting the sails luff and the boat glide to a stop exactly where you want it.' },
      { kind: 'list', ordered: false, items: [
        'Scout the wind and current at the dock before committing.',
        'Approach from leeward so you finish heading into the wind.',
        'Come in slow — you can always add a touch of speed, but you cannot easily shed it.',
        'Have fenders out and dock lines (with a bowline or cleat hitch ready) on the dock side.',
      ] },
      { kind: 'callout', tone: 'tip', text: 'A 3–5 hp outboard is typical on an Ensign for tight marinas, but every approach is calmer when you have practiced the engineless version.' },
    ],
    video: { title: 'Docking Made Easy (series, narrated by Peter Isler)', channel: 'American Sailing', url: 'https://www.youtube.com/playlist?list=PLuCYSdFgiH09lfQqAiOyT82625aF02wpa' },
  },
  {
    id: '4-2', tier: 4, minutes: 5, title: 'Anchoring Basics',
    summary: 'Scope, set, and swing room — the three things that keep you put.',
    body: [
      { kind: 'list', ordered: false, items: [
        'Scope: let out 5:1 to 7:1 line for the water depth (plus freeboard). Too little scope drags.',
        'Set: lower (do not throw) the anchor, back down gently, and watch a landmark to confirm it has dug in.',
        'Swing room: you will swing in a circle of your scope as wind and current shift — make sure nothing is in that circle.',
      ] },
      { kind: 'callout', tone: 'tip', text: 'Pick the spot, then approach it into the wind and stop before lowering — exactly like a dock approach.' },
    ],
  },
  {
    id: '4-3', tier: 4, minutes: 7, title: 'Crew Overboard Recovery',
    summary: 'The deep-beam-reach method: a calm, repeatable way to get a person back aboard.',
    body: [
      { kind: 'steps', title: 'Deep beam reach recovery', items: [
        'Shout "Crew overboard!", assign someone to point at the person continuously, and throw flotation.',
        'Immediately turn to a beam reach (wind across the boat) and sail away on it for a few boat-lengths.',
        'Tack (do not jibe) to turn around.',
        'Bear away and approach the person from downwind on a close reach, controlling speed with the sheets.',
        'Stop the boat with the person on your windward side and recover them low, near the shrouds.',
      ] },
      { kind: 'callout', tone: 'warning', text: 'Practice this with a cushion until it is automatic. A real recovery is no time to be reading a checklist.' },
    ],
    video: { title: 'Man Overboard', channel: 'NauticEd', url: 'https://www.youtube.com/watch?v=Lhg3PdMhIv0' },
  },
  {
    id: '4-4', tier: 4, minutes: 4, title: 'Capsize — The Concept',
    summary: 'Mostly academic on a 1,200 lb-keel Ensign, but worth understanding.',
    body: [
      { kind: 'p', text: 'A heavy full-keel boat like the Ensign is extremely hard to capsize — her ballast powerfully rights her, and her foam flotation keeps her afloat even if swamped. You will heel, sometimes a lot, but the keel almost always wins.' },
      { kind: 'callout', tone: 'key', text: 'If overpowered, the answer is to depower — ease the sheets, head up, and reef — not to fear going over. Respect the water, but trust the ballast.' },
    ],
  },
  {
    id: '4-5', tier: 4, minutes: 5, title: 'Weather Awareness',
    summary: 'Reading the sky and the barometer so the weather never surprises you.',
    body: [
      { kind: 'list', ordered: false, items: [
        'Check a marine forecast before you go, and note the wind trend for the day.',
        'Building, darkening cumulus — especially towering anvils — warn of squalls and gusty fronts.',
        'A falling barometer signals worsening weather; a steady or rising one is reassuring.',
        'Watch upwind: weather comes to you from there. A dark line on the water is wind arriving.',
      ] },
      { kind: 'callout', tone: 'tip', text: 'If it builds: reef early, head for shelter, and put everyone in PFDs before — not after — it gets rough.' },
    ],
  },
  {
    id: '4-6', tier: 4, minutes: 4, title: 'Heaving-To in Heavy Weather',
    summary: 'A storm tactic and a rest stop, using the same technique you met in Tier 2.',
    body: [
      { kind: 'p', text: 'You already know how to heave-to. In heavy weather it becomes a survival tactic: backing the jib against an eased main and a tiller lashed to leeward stalls the boat into a stable, slow forward-and-sideways drift, smoothing the ride and giving the crew a break.' },
      { kind: 'callout', tone: 'tip', text: 'Hove-to, the Ensign makes a calm slick to windward and largely looks after herself — buy time to reef, navigate, or simply think.' },
    ],
  },
  {
    id: '4-7', tier: 4, minutes: 4, title: 'Knot: The Sheet Bend',
    summary: 'Joining two ropes — even ropes of different thickness.',
    body: [
      { kind: 'p', text: 'When you need to tie two separate lines together, the sheet bend is the knot — and unlike a reef knot it holds even when the two ropes differ in diameter. Double the tuck for slippery modern line.' },
    ],
    interactive: { kind: 'knot', knotId: 'sheet-bend' },
  },

  // ===== Tier 5 — Racer =====
  {
    id: '5-1', tier: 5, minutes: 7, title: 'Sail Shape & Draft Control',
    summary: 'The controls that flatten, twist, and depower the main — and the Ensign’s one legal underway adjustment.',
    body: [
      { kind: 'p', text: 'Beyond sheeting in and out, racers shape the sail itself — moving its "draft" (depth of curve) and twist to match the conditions. A full, deep sail is powerful for light air; a flat sail is fast and depowered for a breeze.' },
      { kind: 'list', ordered: false, items: [
        'Outhaul — tensions the foot; more outhaul flattens the lower main.',
        'Cunningham — tensions the luff; pulls draft forward and depowers.',
        'Backstay — bends the mast to flatten the main and open the leech.',
        'Traveler — moves the boom’s angle without changing leech tension.',
        'Vang — controls leech twist, especially off the wind.',
      ] },
      { kind: 'callout', tone: 'key', title: 'The Ensign’s special rule',
        text: 'Class rules permit only the BACKSTAY to be adjusted while racing. That constraint is a gift to a learner: it sharply limits the controls you must juggle, so you can master one before adding the rest.' },
    ],
  },
  {
    id: '5-2', tier: 5, minutes: 5, title: 'The Slot',
    summary: 'How the jib and main work together as one aerodynamic system.',
    body: [
      { kind: 'p', text: 'The gap between the jib’s leech and the mainsail is called the slot. Air accelerating through it keeps flow attached to the main, so the two sails make more drive together than either would alone.' },
      { kind: 'list', ordered: false, items: [
        'Too tight a slot (jib over-trimmed) "backwinds" the main and chokes it — you will see the main luff bubble.',
        'Too open a slot wastes power.',
        'Trim the jib so the slot stays smooth and the main’s luff is just shy of bubbling.',
      ] },
    ],
  },
  {
    id: '5-3', tier: 5, minutes: 5, title: 'Apparent Wind Tactics',
    summary: 'Using the wind you make to sail faster, especially reaching and downwind.',
    body: [
      { kind: 'p', text: 'Because boat speed bends the apparent wind forward, going faster lets you point the apparent wind forward and sail a lower true course while keeping the sails drawing. Racers "heat it up" to build speed, then ease down to make distance.' },
      { kind: 'callout', tone: 'tip', text: 'On a reach, a brief head-up to build speed can pay off as you bear back down with more apparent wind and a faster average.' },
    ],
  },
  {
    id: '5-4', tier: 5, minutes: 6, title: 'Starting Strategy & the Racing Rules',
    summary: 'The start, proper course, mark-room, and the zone.',
    body: [
      { kind: 'list', ordered: false, items: [
        'The start is a timed acceleration to hit the line at full speed exactly as the gun fires — not before.',
        'Right-of-way still applies: starboard over port, leeward over windward, with racing-specific limits on luffing.',
        'Mark-room: at the three-length "zone" around a mark, the inside overlapped boat is generally entitled to room to round.',
        'Sail your "proper course" — the fastest course to the next mark in the absence of other boats.',
      ] },
      { kind: 'callout', tone: 'tip', text: 'Start conservatively while learning: a clean-air start at the favored end beats a foul at the pin.' },
    ],
  },
  {
    id: '5-5', tier: 5, minutes: 5, title: 'Roll-Tacking the Ensign',
    summary: 'A dinghy technique that is legal on the Ensign — because she has no lifelines.',
    body: [
      { kind: 'p', text: 'In light air, crew weight can be used to "roll" the boat through a tack: heel her to windward as you turn, then flatten briskly as the sails fill, fanning the rig and accelerating out of the tack. Because the Ensign has no lifelines, crew can hike and roll dinghy-style.' },
      { kind: 'callout', tone: 'warning', text: 'No lifelines also means nothing to stop a fall. Roll-tacking is a coached, deliberate move — brief the crew and keep handholds in mind.' },
    ],
  },
  {
    id: '5-6', tier: 5, minutes: 5, title: 'Spinnaker Basics',
    summary: 'The big downwind sail — the Ensign flies a symmetric kite.',
    body: [
      { kind: 'p', text: 'The spinnaker is a large, light, balloon-like sail for reaching and running. The Ensign carries a symmetric spinnaker set on a pole. It dramatically increases downwind power — and the workload — so it is the last skill in the course for good reason.' },
      { kind: 'list', ordered: false, items: [
        'Set: hoist in the lee of the main, then trim the guy and sheet to fill it.',
        'Trim: ease the sheet until the luff just curls, then trim back — the same "edge of luffing" idea as always.',
        'Douse early and in good control; a spinnaker is far easier to set than to recover in a hurry.',
      ] },
    ],
  },
  {
    id: '5-7', tier: 5, minutes: 4, title: 'Knot: The Rolling Hitch',
    summary: 'The grip-along-a-line hitch that rescues a jammed sheet.',
    body: [
      { kind: 'p', text: 'When a sheet jams under load on a winch, you cannot ease it directly. Tie a rolling hitch onto the loaded line, take the new line to another winch, and the rolling hitch grips so you can transfer the load and clear the jam.' },
    ],
    interactive: { kind: 'knot', knotId: 'rolling-hitch' },
  },
]

// ---------------------------------------------------------------------------
// Derived lookups
// ---------------------------------------------------------------------------

export const LESSON_BY_ID: Record<string, Lesson> = Object.fromEntries(
  LESSONS.map((l) => [l.id, l]),
)

export const TIERS: Tier[] = TIER_META.map((meta) => ({
  ...meta,
  lessonIds: LESSONS.filter((l) => l.tier === meta.id).map((l) => l.id),
}))

export const TIER_BY_ID: Record<number, Tier> = Object.fromEntries(
  TIERS.map((t) => [t.id, t]),
)

export function nextLessonId(id: string): string | null {
  const idx = LESSONS.findIndex((l) => l.id === id)
  if (idx < 0 || idx === LESSONS.length - 1) return null
  return LESSONS[idx + 1].id
}

export function prevLessonId(id: string): string | null {
  const idx = LESSONS.findIndex((l) => l.id === id)
  if (idx <= 0) return null
  return LESSONS[idx - 1].id
}
