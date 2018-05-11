import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {RootState} from '../index-reducer';

// Import the index reducer and sagas
import { composeWithDevTools } from 'redux-devtools-extension';
import IndexReducer from '../index-reducer';
import IndexSagas from '../index-sagas';


// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware();

// Begin our Index Saga
sagaMiddleware.run(IndexSagas);

const store = createStore<RootState>(
  IndexReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
);

export default store;
