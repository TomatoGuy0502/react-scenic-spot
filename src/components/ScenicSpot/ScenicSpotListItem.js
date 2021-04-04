import React from 'react'

function ScenicSpotListItem({ spot }) {
  return (
    <li key={spot.ID} className="scenic-spot-list-item list-group-item">
      <h2 className="fw-bold">{spot.Name}</h2>
      <div className="mb-2">
        {spot.Class1 && <div className="tag">{spot.Class1}</div>}
        {spot.Class2 && <div className="tag">{spot.Class2}</div>}
        {spot.Class3 && <div className="tag">{spot.Class3}</div>}
      </div>
      <p className="text-dark my-3">{spot.Description || spot.DescriptionDetail}</p>
      <div>
        <p className="m-0 text-muted">
          地址：
          <a
            href={`https://www.google.com.tw/maps/search/${spot.Address}`}
            target="_blank"
            rel="noreferrer"
          >
            {spot.Address}
          </a>
        </p>
        <p className="m-0 text-muted">電話：{spot.Phone}</p>
      </div>
    </li>
  )
}

export default ScenicSpotListItem
