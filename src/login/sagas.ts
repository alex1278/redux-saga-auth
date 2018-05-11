import { call, cancel, cancelled, fork, put, take } from 'redux-saga/effects';

// We'll use this function to redirect to different routes based on cases
// https://github.com/ReactTraining/react-router/blob/master/FAQ.md
// #how-do-i-access-the-history-object-outside-of-components
// import { browserHistory } from 'react-router-dom';

// Helper for api errors
import { handleApiErrors } from '../lib/api-errors';

// Our login constants
import { LoginActionType } from './constants';

// So that we can modify our Client piece of state
import { setClient, unsetClient } from '../client/actions';
import { ClientActionType } from '../client/constants';

const loginUrl = `${process.env.REACT_APP_API_URL}/api/Clients/login`;

function loginApi(email: string, password: string) {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error; });
}

function* logout() {
  // dispatches the CLIENT_UNSET action
  yield put(unsetClient());

  // remove our token
  localStorage.removeItem('token');

  // redirect to the /login screen
  // browserHistory.push('/login');
}

function* loginFlow(email: string, password: string) {
  let token;
  try {
    // try to call to our loginApi() function.  Redux Saga
    // will pause here until we either are successful or
    // receive an error
    token = yield call(loginApi, email, password);

    // inform Redux to set our client token, this is non blocking so...
    yield put(setClient(token));

    // .. also inform redux that our login was successful
    yield put({ type: LoginActionType.LOGIN_SUCCESS });

    // set a stringified version of our token to localstorage on our domain
    localStorage.setItem('token', JSON.stringify(token)); // sketch?

    // redirect them to WIDGETS!
    // browserHistory.push('/widgets')
  } catch (error) {
    // error? send it to redux
    yield put({ type: LoginActionType.LOGIN_ERROR, error });
  } finally {
    // No matter what, if our `forked` `task` was cancelled
    // we will then just redirect them to login
    if (yield cancelled()) {
      // browserHistory.push('/login') // somehow do the redirect
    }
  }

  // return the token for health and wealth
  return token;
}

// Our watcher (saga).  It will watch for many things.
function* loginWatcher() {

  // Generators halt execution until their next step is ready/occurring
  // So it's not like this loop is firing in the background 1000/sec
  // Instead, it says, "okay, true === true", and hits the first step...
  while (true) {
    //
    // ... and in this first it sees a yield statement with `take` which
    // pauses the loop.  It will sit here and WAIT for this action.
    //
    // yield take(ACTION) just says, when our generator sees the ACTION
    // it will pull from that ACTION's payload that we send up, its
    // email and password.  ONLY when this happens will the loop move
    // forward...
    const { email, password } = yield take(LoginActionType.LOGIN_REQUESTING);

    // ... and pass the email and password to our loginFlow() function.
    // The fork() method spins up another "process" that will deal with
    // handling the loginFlow's execution in the background!
    // Think, "fork another process".
    //
    // It also passes back to us, a reference to this forked task
    // which is stored in our const task here.  We can use this to manage
    // the task.
    //
    // However, fork() does not block our loop.  It's in the background
    // therefore as soon as our loop executes this it moves forward...
    const task = yield fork(loginFlow, email, password);

    // ... and begins looking for either CLIENT_UNSET or LOGIN_ERROR!
    // That's right, it gets to here and stops and begins watching
    // for these tasks only.  Why would it watch for login any more?
    // During the life cycle of this generator, the user will login once
    // and all we need to watch for is either logging out, or a login
    // error.  The moment it does grab either of these though it will
    // once again move forward...
    const action = yield take([ClientActionType.CLIENT_UNSET, LoginActionType.LOGIN_ERROR]);

    // ... if, for whatever reason, we decide to logout during this
    // cancel the current action.  i.e. the user is being logged
    // in, they get impatient and start hammering the logout button.
    // this would result in the above statement seeing the CLIENT_UNSET
    // action, and down here, knowing that we should cancel the
    // forked `task` that was trying to log them in.  It will do so
    // and move forward...
    if (action.type === ClientActionType.CLIENT_UNSET) {
      yield cancel(task);
    }

    // ... finally we'll just log them out.  This will unset the client
    // access token ... -> follow this back up to the top of the while loop
    yield call(logout);
  }
}

export default loginWatcher;
