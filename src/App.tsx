import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './login';
import Signup from './signup';
import Widgets from './widgets';

import { restricted } from './auth/restricted';
import { checkIndexAuthorization } from './lib/check-auth';

import logo from './logo.svg';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to Widget Reactory</h2>
    </header>
    <section className="App-body">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/widgets" component={Widgets} />
      </Switch>
    </section>
  </div>
);



export default restricted(checkIndexAuthorization, '/widgets')(App);
