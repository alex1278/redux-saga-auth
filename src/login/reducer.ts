import { LoginAction, LoginActionType, LoginState } from './constants';

const initialState: LoginState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
};

const reducer = (state = initialState, action: LoginAction) => {
  switch (action.type) {
    // Set the requesting flag and append a message to be shown
    case LoginActionType.LOGIN_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: [],
      };

    // Successful?  Reset the login state.
    case LoginActionType.LOGIN_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      };

    // Append the error returned from our api
    // set the success and requesting flags to false
    case LoginActionType.LOGIN_ERROR:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
      };

    default:
      return state;
  }
};

export default reducer;
