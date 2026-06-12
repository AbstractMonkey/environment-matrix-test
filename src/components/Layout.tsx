import { useEffect, useState, type CSSProperties } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { TIERS } from '../data/curriculum'
import { useGate, useProgressStats } from '../logic/gating'
import { useProgress } from '../store/progress'

function TierNav({ onNavigate }: { onNavigate?: () => void }) {
  const gate = useGate()
  return (
    <nav className="tiernav" aria-label="Course tiers">
      <NavLink to="/" end className="tiernav-home" onClick={onNavigate}>
        ⚓ Course home
      </NavLink>
      <ol>
        {TIERS.map((t) => {
          const locked = !gate.unlocked[t.id]
          const complete = gate.complete[t.id]
          return (
            <li key={t.id}>
              <NavLink
                to={`/tier/${t.id}`}
                className={'tiernav-tier' + (locked ? ' is-locked' : '')}
                style={{ '--accent': t.accent } as CSSProperties}
                onClick={onNavigate}
              >
                <span className="tiernav-badge">{complete ? '✓' : locked ? '🔒' : t.id}</span>
                <span className="tiernav-name">
                  <strong>{t.name}</strong>
                  <small>{t.subtitle}</small>
                </span>
              </NavLink>
            </li>
          )
        })}
      </ol>
      <div className="tiernav-tools">
        <NavLink to="/knots" onClick={onNavigate}>🪢 Knot library</NavLink>
        <NavLink to="/points-of-sail" onClick={onNavigate}>🧭 Points-of-sail dial</NavLink>
        <NavLink to="/anatomy" onClick={onNavigate}>🚢 Boat anatomy</NavLink>
      </div>
    </nav>
  )
}

export default function Layout() {
  const stats = useProgressStats()
  const reset = useProgress((s) => s.reset)
  const location = useLocation()
  const [navOpen, setNavOpen] = useState(false)

  // Scroll to top on navigation.
  useEffect(() => {
    window.scrollTo(0, 0)
    setNavOpen(false)
  }, [location.pathname])

  return (
    <div className="layout">
      <header className="topbar">
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((v) => !v)}
        >
          ☰
        </button>
        <Link to="/" className="brand">
          <span className="brand-mark">⛵</span>
          <span className="brand-text">Ensign Sailing Course</span>
        </Link>
        <div className="topbar-progress" title={`${stats.lessonsComplete} of ${stats.lessonsTotal} lessons complete`}>
          <div className="topbar-bar"><span style={{ width: `${stats.pct}%` }} /></div>
          <span className="topbar-pct">{stats.pct}%</span>
        </div>
        <button
          className="btn-link reset-btn"
          onClick={() => {
            if (window.confirm('Reset all course progress? This cannot be undone.')) reset()
          }}
        >
          Reset
        </button>
      </header>

      <div className="body">
        <aside className={'sidebar' + (navOpen ? ' is-open' : '')}>
          <TierNav onNavigate={() => setNavOpen(false)} />
        </aside>
        {navOpen && <div className="scrim" onClick={() => setNavOpen(false)} />}
        <main className="content">
          <Outlet />
          <footer className="footer">
            <p>
              A learn-to-sail course built around the Pearson Ensign — a forgiving,
              full-keel one-design daysailer. Progress is saved in your browser.
            </p>
            <p>
              Going further:{' '}
              <a href="https://www.ensignclass.com/" target="_blank" rel="noreferrer">
                Ensign Class Association
              </a>{' '}
              ·{' '}
              <a href="https://ensignspars.com/" target="_blank" rel="noreferrer">
                Ensign Spars
              </a>{' '}
              · and nothing replaces time on the water with a good instructor.
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}
