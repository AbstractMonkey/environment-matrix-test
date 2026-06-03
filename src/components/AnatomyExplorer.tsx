import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import EnsignSVG from './EnsignSVG'
import { PARTS, PART_BY_ID, PART_GROUPS, SVG_PART_IDS } from '../data/parts'
import { useProgress } from '../store/progress'

interface TooltipPos { x: number; y: number }

export default function AnatomyExplorer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [pinnedId, setPinnedId] = useState<string | null>(null)
  const [pos, setPos] = useState<TooltipPos | null>(null)
  const [showList, setShowList] = useState(false)

  const explored = useProgress((s) => s.exploredParts)
  const markPartExplored = useProgress((s) => s.markPartExplored)

  const svgExplored = SVG_PART_IDS.filter((id) => explored.includes(id))
  const allExplored = svgExplored.length === SVG_PART_IDS.length
  const currentId = pinnedId ?? activeId
  const current = currentId ? PART_BY_ID[currentId] : null

  function activate(id: string, el: SVGGElement) {
    setActiveId(id)
    markPartExplored(id)
    const container = containerRef.current
    if (container) {
      const r = el.getBoundingClientRect()
      const c = container.getBoundingClientRect()
      setPos({ x: r.left - c.left + r.width / 2, y: r.top - c.top })
    }
  }

  function leave() {
    setActiveId(null)
    if (!pinnedId) setPos(null)
  }

  function select(id: string) {
    markPartExplored(id)
    setPinnedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="anatomy">
      <div className="anatomy-stage" ref={containerRef}>
        <EnsignSVG
          activeId={currentId}
          exploredIds={explored}
          onActivate={activate}
          onLeave={leave}
          onSelect={select}
        />
        {current && pos && (
          <div
            className="anatomy-tooltip"
            style={{ left: pos.x, top: pos.y }}
            role="status"
          >
            <strong>{current.name}</strong>
            <span>{current.description}</span>
          </div>
        )}
      </div>

      <div className="anatomy-side">
        <div className="anatomy-progress">
          <div className="anatomy-progress-bar">
            <span style={{ width: `${(svgExplored.length / SVG_PART_IDS.length) * 100}%` }} />
          </div>
          <p>
            <strong>{svgExplored.length}</strong> / {SVG_PART_IDS.length} parts explored
          </p>
        </div>

        <div className="anatomy-detail" aria-live="polite">
          {current ? (
            <>
              <span className="tag">{current.group}</span>
              <h3>{current.name}</h3>
              <p>{current.description}</p>
              {pinnedId === current.id && (
                <button className="btn-link" onClick={() => setPinnedId(null)}>
                  Unpin
                </button>
              )}
            </>
          ) : (
            <p className="muted">
              Hover, tap, or use Tab + Enter to explore a part. Click to pin its
              description here.
            </p>
          )}
        </div>

        {allExplored ? (
          <div className="anatomy-done">
            🎉 You’ve explored every part! The gate to Tier 1 is open.
            <Link className="btn btn-small" to="/tier/1">Go to Tier 1 →</Link>
          </div>
        ) : (
          <p className="muted small">
            Explore all {SVG_PART_IDS.length} labelled parts to unlock Tier 1.
          </p>
        )}

        <button
          className="btn-link"
          aria-expanded={showList}
          onClick={() => setShowList((v) => !v)}
        >
          {showList ? 'Hide' : 'Show'} list view (all {PARTS.length} parts)
        </button>
      </div>

      {showList && (
        <div className="anatomy-list">
          {PART_GROUPS.map((group) => (
            <section key={group}>
              <h4>{group}</h4>
              <dl>
                {PARTS.filter((p) => p.group === group).map((p) => (
                  <div
                    key={p.id}
                    className={
                      'anatomy-list-item' +
                      (explored.includes(p.id) ? ' is-explored' : '') +
                      (p.onSvg ? '' : ' not-on-svg')
                    }
                  >
                    <dt>
                      <button
                        onClick={() => {
                          markPartExplored(p.id)
                          setPinnedId(p.id)
                          setActiveId(p.id)
                        }}
                      >
                        {p.name}
                        {!p.onSvg && <span className="pill">list only</span>}
                      </button>
                    </dt>
                    <dd>{p.description}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
