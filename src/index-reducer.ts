// index-reducer.ts
import { combineReducers } from 'redux';
import { FormStateMap, reducer as form } from 'redux-form';
import { ClientState } from './client/constants';
import client from './client/reducer';
import { SignupState } from './signup/constants';
import signup from './signup/reducer';

export interface RootState {
  client: ClientState;
  signup: SignupState;
  forms: FormStateMap; // ?
}

const IndexReducer = combineReducers({
  client,
  signup,
  form,
});

export default IndexReducer;
