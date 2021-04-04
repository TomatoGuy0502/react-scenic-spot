import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="h-100 d-flex flex-column justify-content-center text-center">
      <div>
        <h1 className="mb-5">Oops！好像迷路了</h1>
        <Link to="/scenicSpot" className="btn btn-lg btn-info">
          回去瀏覽景點
        </Link>
      </div>
    </div>
  )
}

export default NotFound
