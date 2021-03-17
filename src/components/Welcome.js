import React from 'react'
import { Link } from 'react-router-dom'

function Welcome() {
  return (
    <div className="welcome h-100 d-flex flex-column justify-content-center text-center">
      <div>
        <h1 className="mb-5">歡迎光臨｡:.ﾟヽ(*´∀`)ﾉﾟ.:｡</h1>
        <Link to="/scenicSpot" className="btn btn-lg btn-info">
          開始瀏覽景點
        </Link>
      </div>
    </div>
  )
}

export default Welcome
