import { all } from 'redux-saga/effects';
import SignupSaga from './signup/sagas';

export default function* IndexSaga () {
  yield all([
    SignupSaga(),
  ]);
}
