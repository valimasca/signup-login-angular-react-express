import React from 'react';
import './tailwind.output.css'
import Nav from './components/Nav'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Signin from './components/Signin'
import Signup from './components/Signup'
import NotFound from './components/NotFound'
import Profile from './components/Profile'

function App() {
  return (
    <div>
      <Nav></Nav>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Signin} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={Profile} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
