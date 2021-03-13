import React from 'react'
import { useLocation } from 'react-router-dom'

function NotFound() {
  const location = useLocation()

  return (
    <div>
      <h3>
        Oops! 找不到 <code>{location.pathname}</code>
      </h3>
    </div>
  )
}

export default NotFound
