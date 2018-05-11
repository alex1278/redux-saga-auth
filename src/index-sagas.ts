import { all } from 'redux-saga/effects';
import LoginSaga from './login/sagas';
import SignupSaga from './signup/sagas';

export default function* IndexSaga () {
  yield all([
    SignupSaga(),
    LoginSaga()
  ]);
}
