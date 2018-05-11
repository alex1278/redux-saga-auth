import { SignupActionType, SignupRequestAction, SignupRequestPayload } from './constants';

const signupRequest = ({ email, password }: SignupRequestPayload): SignupRequestAction => {
  return {
    type: SignupActionType.SIGNUP_REQUESTING,
    email,
    password,
  };
};

export default signupRequest;
