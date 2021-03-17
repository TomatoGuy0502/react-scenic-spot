import { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import ScenicSpot from './components/ScenicSpot/ScenicSpot'
import NotFound from './components/NotFound'
import Welcome from './components/Welcome'
import Navbar from './components/layout/Navbar/Navbar'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="app vh-100 d-flex flex-column">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="d-flex flex-column overflow-auto h-100">
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route
            path="/scenicSpot/:city?"
            render={(props) => <ScenicSpot {...props} searchTerm={searchTerm} />}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </div>
  )
}

export default App
