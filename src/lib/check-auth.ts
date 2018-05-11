// import history from '../history';
import { setClient } from '../client/actions';
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

export async function checkIndexAuthorization(): Promise<boolean> {

  // If we pass the authentication check we are OVERLY authed for index
  // If we don't have authentication, we can continue to an index (login) page
  try {
    const alreadyAuthed = await checkAuthorization();
    return !alreadyAuthed;
  } catch (error) {
    return true;
  }
}

export async function checkWidgetAuthorization(): Promise<boolean> {

  try {
    // reference to the `client` piece of state
    // Ideally get this from props?
    const client = store.getState().client;

    // is it defined and does it have a token? good, go ahead to widgets
    // Ideally we would check this with the backend
    if (client && client.token) {
      return true;
    }

    // not set yet?  Let's try and set it and if so, go ahead to widgets
    return await checkAuthorization();
  } catch (error) {
    return false;
  }
}
