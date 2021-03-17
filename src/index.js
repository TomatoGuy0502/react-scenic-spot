import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReducer'

const store = createStore(rootReducer)
process.env.BASE_URL = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : ''

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={process.env.BASE_URL}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
