import { Switch, Route } from 'react-router-dom'
import ScenicSpot from './components/ScenicSpot'
import NotFound from './components/NotFound'
import Welcome from './components/Welcome'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <Link to="/scenicSpot">全台</Link>
      <Link to="/scenicSpot/Tainan">Tainan</Link>
      <Link to="/scenicSpot/Taipei">Taipei</Link>
      <Link to="/scenicSpot/Taoyuan">Taoyuan</Link>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/scenicSpot/:city?" component={ScenicSpot} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
