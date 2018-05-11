import { call, put, takeLatest } from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors';
import { SignupActionType, SignupRequestAction, SignupResponse } from './constants';

// The url derived from our .env file
const signupUrl = `${process.env.REACT_APP_API_URL}/api/Clients`;

function signupApi(email: string, password: string): Promise<SignupResponse> {
  // call to the "fetch".  this is a "native" function for browsers
  // that's conveniently polyfilled in create-react-app if not available
  return fetch(signupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(handleApiErrors) // we'll make this in a second
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error; }); // why re-throw?
}

// This will be run when the SIGNUP_REQUESTING
// Action is found by the watcher
function* signupFlow(action: SignupRequestAction) {
  try {
    const { email, password } = action;

    // pulls "calls" to our signupApi with our email and password
    // from our dispatched signup action, and will PAUSE
    // here until the API async function, is complete!
    const signupResponse: SignupResponse = yield call(signupApi, email, password);

    // when the above api call has completed it will "put",
    // or dispatch, an action of type SIGNUP_SUCCESS with
    // the successful signupResponse.
    yield put({ type: SignupActionType.SIGNUP_SUCCESS, signupResponse });
  } catch (error) {
    // if the api call fails, it will "put" the SIGNUP_ERROR
    // into the dispatch along with the error.
    yield put({ type: SignupActionType.SIGNUP_ERROR, error });
  }
}

// Watches for the SIGNUP_REQUESTING action type
// When it gets it, it will call signupFlow()
// WITH the action we dispatched
function* signupWatcher() {
  // takeLatest() takes the LATEST call of that action and runs it
  // if we we're to use takeEvery, it would take every single
  // one of the actions and kick off a new task to handle it
  // *concurrently*
  yield takeLatest(SignupActionType.SIGNUP_REQUESTING, signupFlow);
}

export default signupWatcher;
