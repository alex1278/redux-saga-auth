import { SignupAction, SignupActionType, SignupState } from './constants';

const initialState: SignupState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
};

const reducer = (state = initialState, action: SignupAction) => {
  switch (action.type) {
    case SignupActionType.SIGNUP_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Signing up...', time: new Date() }],
        errors: [],
      };

    default:
      return state;
  }
};

export default reducer;
