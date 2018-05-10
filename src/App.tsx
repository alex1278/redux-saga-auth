import * as React from 'react';
import { ReactElement } from 'react';
import './App.css';

import logo from './logo.svg';

// TODO: type this
const App = (props: { children?: ReactElement<any> }) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Widget Reactory</h2>
      </header>
      <section className="App-body">
        {props.children}
      </section>
    </div>
  );
};

export default App;
