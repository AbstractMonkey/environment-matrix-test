import type { InteractiveRef } from '../types'
import AnatomyExplorer from './AnatomyExplorer'
import PointsOfSailDial from './PointsOfSailDial'
import KnotAnimator from './KnotAnimator'
import TackJibe from './TackJibe'

export default function InteractiveMount({ interactive }: { interactive: InteractiveRef }) {
  switch (interactive.kind) {
    case 'anatomy':
      return <AnatomyExplorer />
    case 'points-of-sail':
      return <PointsOfSailDial />
    case 'knot':
      return <KnotAnimator knotId={interactive.knotId} />
    case 'tack-jibe':
      return <TackJibe />
  }
}
