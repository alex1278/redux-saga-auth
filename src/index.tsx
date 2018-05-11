// `src/index.js`
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { IndexAuthRoute } from './auth-routes/IndexAuthRoute';

// Import all of our components
import App from './App';
import './index.css';


// Import history for router
import history from './history';

import store from './store';

// Setup the top level router component for our React Router
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <IndexAuthRoute exact={true} path='/' component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
