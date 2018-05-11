// import { DispatchProp } from 'react-redux';
//
// export function checkIndexAuthorization({ dispatch }: DispatchProp) {
//   // by having a function that returns a function we satisfy 2 goals:
//   //
//   // 1. grab access to our Redux Store and thus Dispatch to call actions
//   // 2. Return a function that includes all the proper .. properties that
//   //    React Router expects for us to include and use
//   //
//   // `nextState` - the next "route" we're navigating to in the router
//   // `replace` - a helper to change the route
//   // `next` - what we call when we're done messing around
//   //
//   return (nextState: string, replace: (route: string) => void, next: () => void) => {
//     // we'll make this in a minute - remember begin with the end!
//     // If we pass the authentication check, go to widgets
//     if (checkAuthorization(dispatch)) {
//       replace('widgets');
//
//       return next();
//     }
//
//     // Otherwise let's take them to login!
//     replace('login');
//     return next();
//   };
// }
//
// export function checkWidgetAuthorization({ dispatch, getState }) {
//   // Same format - we do this to have the Redux State available.
//   // The difference is that this time we also pull in the helper
//   // `getState` which will allow us to.....
//   // ....
//   // get the state.
//   //
//   return (nextState, replace, next) => {
//     // reference to the `client` piece of state
//     const client = getState().client
//
//     // is it defined and does it have a token? good, go ahead to widgets
//     if (client && client.token) return next()
//
//     // not set yet?  Let's try and set it and if so, go ahead to widgets
//     if (checkAuthorization(dispatch)) return next()
//
//     // nope?  okay back to login ya go.
//     replace('login')
//     return next()
//   }
// }
