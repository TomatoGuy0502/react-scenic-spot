import { Switch, Route } from 'react-router-dom'
import ScenicSpot from './components/ScenicSpot'
import NotFound from './components/NotFound'
import Welcome from './components/Welcome'
import Navbar from './components/layout/Navbar'

function App() {
  return (
    <div className="app vh-100 d-flex flex-column">
      <Navbar />
      <div className="d-flex flex-column overflow-auto h-100">
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/scenicSpot/:city?" component={ScenicSpot} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </div>
  )
}

export default App
