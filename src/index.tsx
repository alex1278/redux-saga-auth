// `src/index.js`
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

// Import all of our components
import App from './App';
import './index.css';
import Login from './login';
import Signup from './signup';
import Widgets from './widgets';

// Import the index reducer and sagas
import { composeWithDevTools } from 'redux-devtools-extension';
import IndexReducer from './index-reducer';
import IndexSagas from './index-sagas';

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  IndexReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
);

// Begin our Index Saga
sagaMiddleware.run(IndexSagas)

// Setup the top level router component for our React Router
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} >
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/widgets" component={Widgets} />
      </Route>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
