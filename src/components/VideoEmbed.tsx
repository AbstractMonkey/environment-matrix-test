import { useState } from 'react'
import type { VideoRef } from '../types'

function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url)
    if (u.pathname.includes('/playlist')) {
      return `https://www.youtube.com/embed/videoseries?list=${u.searchParams.get('list')}`
    }
    const v = u.searchParams.get('v')
    if (v) return `https://www.youtube.com/embed/${v}`
    return url
  } catch {
    return url
  }
}

// Click-to-load facade: keeps the lesson light and avoids loading a third-party
// iframe until the learner actually wants the video.
export default function VideoEmbed({ video }: { video: VideoRef }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <figure className="video">
      <figcaption className="video-cap">
        🎬 <strong>{video.title}</strong> · {video.channel}
      </figcaption>
      {loaded ? (
        <div className="video-frame">
          <iframe
            src={toEmbedUrl(video.url)}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button className="video-facade" onClick={() => setLoaded(true)}>
          <span className="video-play" aria-hidden="true">▶</span>
          <span>Load video (opens an embedded YouTube player)</span>
        </button>
      )}
      <a className="video-link" href={video.url} target="_blank" rel="noreferrer">
        Open on YouTube ↗
      </a>
    </figure>
  )
}
