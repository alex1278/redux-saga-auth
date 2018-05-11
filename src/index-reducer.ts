// index-reducer.ts
import { combineReducers } from 'redux';
import { FormStateMap, reducer as form } from 'redux-form';
import { ClientState } from './client/constants';
import client from './client/reducer';
import { LoginState } from './login/constants';
import login from './login/reducer';
import { SignupState } from './signup/constants';
import signup from './signup/reducer';

export interface RootState {
  client: ClientState;
  signup: SignupState;
  login: LoginState;
  forms: FormStateMap; // ?
}

const IndexReducer = combineReducers({
  client,
  signup,
  login,
  form,
});

export default IndexReducer;
