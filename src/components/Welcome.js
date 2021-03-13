import React from 'react'
import { Link } from 'react-router-dom'

function Welcome() {
  return (
    <div>
      <h1>歡迎光臨｡:.ﾟヽ(*´∀`)ﾉﾟ.:｡</h1>
      <Link to="/scenicSpot">前往查看景點</Link>
    </div>
  )
}

export default Welcome
