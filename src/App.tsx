import * as React from 'react';
import { DispatchProp } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './login';
import Signup from './signup';
import Widgets from './widgets';

import { restricted } from './auth/restricted';
import { checkAuthorization } from './lib/check-auth';

import logo from './logo.svg';

// import { checkIndexAuthorization } from './lib/check-auth';

class App extends React.Component<DispatchProp> {

  componentDidMount() {
    // checkIndexAuthorization(this.props);
  }

  render() {
    return (
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
  }
}



export default restricted(checkAuthorization)(App);
