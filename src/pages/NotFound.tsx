import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="locked-screen">
      <span className="locked-emoji">🧭</span>
      <h1>Off the chart</h1>
      <p>That page isn’t in these waters.</p>
      <Link className="btn" to="/">Sail back to course home</Link>
    </div>
  )
}
