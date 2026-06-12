/**
 * Headless artwork proofing for the hand-drawn SVGs.
 *
 * Renders every knot diagram (one montage PNG per knot, all steps in a row)
 * and the Ensign boat schematic to PNG via resvg, so the artwork can be
 * eyeballed without a browser. Used while drawing/retouching the art.
 *
 * Run:
 *   node_modules/.bin/esbuild scripts/render-art.tsx --bundle --platform=node \
 *     --jsx=automatic --external:@resvg/resvg-js --outfile=/tmp/render-art.cjs
 *   node /tmp/render-art.cjs [out-dir]
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { Resvg } from '@resvg/resvg-js'
import fs from 'node:fs'
import path from 'node:path'
import { KNOT_ART, KnotDiagram, GENERIC_ART, VIEW_W, VIEW_H, STAGE_BG } from '../src/components/knotArt'
import { KNOTS } from '../src/data/knots'
import EnsignSVG from '../src/components/EnsignSVG'

const OUT = process.argv[2] ?? '/tmp/art'
fs.mkdirSync(OUT, { recursive: true })

const GAP = 12
const LABEL_H = 26

function toPng(svg: string, file: string, width: number) {
  const r = new Resvg(svg, { fitTo: { mode: 'width', value: width } })
  fs.writeFileSync(path.join(OUT, file), r.render().asPng())
  console.log('wrote', path.join(OUT, file))
}

for (const knot of KNOTS) {
  const art = KNOT_ART[knot.id] ?? GENERIC_ART
  const n = knot.steps.length
  const w = GAP + n * (VIEW_W + GAP)
  const h = LABEL_H + VIEW_H + GAP

  const cells = Array.from({ length: n }, (_, k) => {
    const inner = renderToStaticMarkup(<KnotDiagram art={art} step={k} />).replace(
      '<svg ',
      `<svg x="${GAP + k * (VIEW_W + GAP)}" y="${LABEL_H}" width="${VIEW_W}" height="${VIEW_H}" `,
    )
    const label = `<text x="${GAP + k * (VIEW_W + GAP) + 6}" y="${LABEL_H - 8}" font-size="14" fill="#9fb7c3" font-family="sans-serif">step ${k + 1}</text>`
    return label + inner
  }).join('')

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">` +
    `<rect width="${w}" height="${h}" fill="#06141d"/>` +
    cells +
    `</svg>`
  toPng(svg, `knot-${knot.id}.png`, Math.min(w * 2, 1980))
}

// --- the boat ---
const noop = () => undefined
const boat = renderToStaticMarkup(
  <EnsignSVG activeId={null} exploredIds={[]} onActivate={noop} onLeave={noop} onSelect={noop} />,
).replace('<svg ', `<svg xmlns="http://www.w3.org/2000/svg" style="background:${STAGE_BG}" `)
toPng(boat, 'ensign.png', 900)
