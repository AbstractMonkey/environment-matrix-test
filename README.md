# ⛵ Ensign Sailing Course

An interactive, **mastery-gated** course that teaches you to sail — built around the
[Pearson Ensign](https://en.wikipedia.org/wiki/Pearson_Ensign), a 22½‑foot, full‑keel
Carl Alberg one‑design so stable and forgiving it was the first boat ever inducted into
the American Sailboat Hall of Fame.

It’s a single‑page React app with no backend: all progress is saved in your browser’s
`localStorage`, and it deploys as a static site to GitHub Pages.

> **Live (once Pages is enabled):** https://abstractmonkey.github.io/environment-matrix-test/

---

## What’s inside

### Six tiers, gated by retrieval quizzes
Each tier ends with a short quiz; scoring **≥ 80%** unlocks the next tier.

| Tier | Rank | Theme |
|---|---|---|
| 0 | **Deckhand** | Orientation — the boat, the vocabulary, safety |
| 1 | **Crew** | How sailing works — wind, lift, points of sail |
| 2 | **Skipper** | Boat handling — tacking, jibing, rules of the road |
| 3 | **Sail Trimmer** | Trim, telltales, weather helm, reefing |
| 4 | **Voyager** | Seamanship — docking, anchoring, crew overboard |
| 5 | **Racer** | Draft control, the slot, starting strategy, the spinnaker |

41 lessons in total, plus a knot library (9 knots) and three keystone interactives.

### Keystone interactives
- **🚢 Boat Anatomy Explorer** — a hand‑drawn, fully keyboard‑accessible SVG of the
  Ensign as a **three‑view drawing** matching Pearson's own line drawing (sail plan,
  hull profile, and deck plan, bow to the right, correct 7/8 fractional rig) — with
  29 labelled hotspots (and a 41‑part list view). Exploring every part is the gate
  that unlocks Tier 1.
- **🧭 Points‑of‑Sail Dial** — drag the boat around the wind (or use the arrow keys);
  the sails reshape and the correct trim updates live for each point of sail.
- **🪢 Knot Animator** — step‑by‑step rope diagrams with true over/under crossings
  (verified against canonical references), direction arrows, a "check it" test and a
  "watch out" common mistake for every knot. Tick each off once you’ve tied it on a
  real piece of rope. (`scripts/render-art.tsx` renders all the artwork to PNG via
  resvg for proofing without a browser.)
- **↔️ Tack/Jibe Simulator** — watch the choreography and command callouts of each turn.

### Pedagogy
The design follows cognitive‑science principles: small chunks (cognitive load theory),
paired visuals + words (dual coding), scaffolding that fades, progressive disclosure,
and quizzes as a *learning* tool, not just assessment (the testing effect). Tiers gate
on mastery (Bloom), and progression is intrinsic rather than badge‑driven.

---

## Tech stack

- **Vite + React 18 + TypeScript**
- **`HashRouter`** (react‑router‑dom) — the reliable client‑side router for GitHub Pages
- **Zustand** with the `persist` middleware → `localStorage` key `ensign-course-v1`
- Accessible tooltips and all animation built **natively** (React + CSS/SVG) to keep the
  bundle small and the build bulletproof — no UI framework dependency. (The architecture
  leaves clean seams to drop in React Aria / Framer Motion later if desired.)

Production bundle: ~**86 KB gzipped**.

## Project structure

```
src/
  data/         curriculum, parts, knots, points-of-sail, quizzes  (content as data)
  store/        Zustand progress store (localStorage-persisted)
  logic/        gating.ts — tier unlock / completion rules
  components/   EnsignSVG, AnatomyExplorer, PointsOfSailDial, KnotAnimator,
                TackJibe, Quiz, RichText, VideoEmbed, Layout, InteractiveMount
  pages/        Home, TierPage, LessonPage, QuizPage, KnotsPage, ToolPages, NotFound
```

## Develop

```bash
npm install
npm run dev        # http://localhost:5173/environment-matrix-test/
npm run build      # typecheck (tsc) + production build to dist/
npm run preview    # serve the production build
```

## Deploy

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and publishes `dist/`
to GitHub Pages on every push to `main`.

**One‑time setup:** in the repo, go to **Settings → Pages → Source → “GitHub Actions.”**

> The Vite `base` is set to `/environment-matrix-test/` in `vite.config.ts`; it must match
> the repository name for asset URLs to resolve on Pages.

---

*Content is for learning ashore. Always sail with proper instruction, a PFD, and respect
for the boom — it’s hazard number one.*
