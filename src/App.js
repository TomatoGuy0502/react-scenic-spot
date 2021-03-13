import { Switch, Route } from 'react-router-dom'
import ScenicSpot from './components/ScenicSpot'
import NotFound from './components/NotFound'
import Welcome from './components/Welcome'

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/scenicSpot/:city?" component={ScenicSpot} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
