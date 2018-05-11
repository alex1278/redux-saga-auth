export enum SignupActionType {
  SIGNUP_REQUESTING = 'SIGNUP_REQUESTING',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_ERROR = 'SIGNUP_ERROR',
}

export interface SignupRequestPayload {
  email: string;
  password: string;
}

export type SignupRequestAction = ActionWithPayload<SignupActionType.SIGNUP_REQUESTING, SignupRequestPayload>;

export type SignupAction = SignupRequestAction;

export interface SignupState {
  requesting: boolean;
  successful: boolean;
  messages: string[]; // ?
  errors: string[]; // ?
}
