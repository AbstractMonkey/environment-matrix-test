import AnatomyExplorer from '../components/AnatomyExplorer'
import PointsOfSailDial from '../components/PointsOfSailDial'

export function AnatomyPage() {
  return (
    <div className="toolpage">
      <h1>Boat Anatomy Explorer</h1>
      <p className="lesson-summary">
        Hover, tap, or tab through every labelled part of the Pearson Ensign. Exploring all of
        them is the gate that unlocks Tier 1.
      </p>
      <AnatomyExplorer />
    </div>
  )
}

export function PointsPage() {
  return (
    <div className="toolpage">
      <h1>Points-of-Sail Dial</h1>
      <p className="lesson-summary">
        The single most important diagram in sailing. Drag the boat around the wind — the sails
        reshape and the correct trim appears for each point of sail.
      </p>
      <PointsOfSailDial />
    </div>
  )
}
