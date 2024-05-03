import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Home from './views/home'
import NotFound from './views/not-found'
import login from './views/login'
import register from './views/ServiceProviderRegister'
import role from './views/role'
import ServiceProviderRegister from './views/ServiceProviderRegister'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={login} path="/login" />
        <Route component={role} path="/role" />
        <Route component={ServiceProviderRegister} path="/ServiceProviderRegister" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
