import React from 'react'

function ScenicSpotListItem({ spot }) {
  return (
    <li key={spot.ID}>
      <h3>{spot.Name}</h3>
      <p>{spot.Description || spot.DescriptionDetail}</p>
    </li>
  )
}

export default ScenicSpotListItem
