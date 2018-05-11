import { LoginActionType, LoginRequestAction, LoginRequestPayload } from './constants';

const signupRequest = ({ email, password }: LoginRequestPayload): LoginRequestAction => {
  return {
    type: LoginActionType.LOGIN_REQUESTING,
    email,
    password,
  };
};

export default signupRequest;
