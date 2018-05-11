// import history from '../history';
import { setClient } from '../client/actions';
import { RootStore } from '../index-reducer';
import store from '../store';

export function checkAuthorization() {
  return new Promise<boolean>((resolve, reject) => {
    // attempt to grab the token from localstorage
    const storedToken = localStorage.getItem('token');

    // if it exists
    if (storedToken) {
      // parse it down into an object
      const token = JSON.parse(storedToken);

      // this just all works to compare the total seconds of the created
      // time of the token vs the ttl (time to live) seconds
      const createdDate = new Date(token.created);
      const created = Math.round(createdDate.getTime() / 1000);
      const ttl = 1209600;
      const expiry = created + ttl;

      // if the token has expired return false
      if (created > expiry) {
        resolve(false);
      }

      // Ideally we would check this token with our server

      // otherwise, dispatch the token to our setClient action
      // which will update our redux state with the token and resolve(true)
      store.dispatch(setClient(token));
      resolve(true);
    }

    resolve(false);
  });
}

export function checkIndexAuthorization({ dispatch }: RootStore) {
  // by having a function that returns a function we satisfy 2 goals:
  //
  // 1. grab access to our Redux Store and thus Dispatch to call actions
  // 2. Return a function that includes all the proper .. properties that
  //    React Router expects for us to include and use
  //
  // `nextState` - the next "route" we're navigating to in the router
  // `replace` - a helper to change the route
  // `next` - what we call when we're done messing around
  //
  return (nextState: string, replace: (route: string) => void, next: () => void) => {
    // we'll make this in a minute - remember begin with the end!
    // If we pass the authentication check, go to widgets
    if (checkAuthorization()) {
      // replace('widgets'); // maybe replace with history.push?

      return next();
    }

    // Otherwise let's take them to login!
    // replace('login');// maybe replace with history.push?
    return next();
  };
}

export function checkWidgetAuthorization() {
  // Same format - we do this to have the Redux State available.
  // The difference is that this time we also pull in the helper
  // `getState` which will allow us to.....
  // ....
  // get the state.
  //
  return (nextState: string, replace: (route: string) => void, next: () => void) => {
    // reference to the `client` piece of state
    const client = store.getState().client;

    // is it defined and does it have a token? good, go ahead to widgets
    if (client && client.token) {
      return next();
    }

    // not set yet?  Let's try and set it and if so, go ahead to widgets
    if (checkAuthorization()) {
      return next();
    }

    // nope?  okay back to login ya go.
    // replace('login');// maybe replace with history.push?
    return next();
  };
}
