export enum SignupActionType {
  SIGNUP_REQUESTING = 'SIGNUP_REQUESTING',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_ERROR = 'SIGNUP_ERROR',
}

export interface SignupResponse {
  email: string;
  id: number;
}

export interface SignupRequestPayload {
  email: string;
  password: string;
}

export interface SignupErrorPayload {
  error: Error;
}

export type SignupRequestAction = ActionWithPayload<SignupActionType.SIGNUP_REQUESTING, SignupRequestPayload>;
export type SignupSuccessAction = ActionWithPayload<SignupActionType.SIGNUP_SUCCESS, SignupResponse>;
export type SignupErrorAction = ActionWithPayload<SignupActionType.SIGNUP_ERROR, SignupErrorPayload>;

export type SignupAction = SignupRequestAction | SignupSuccessAction | SignupErrorAction;

export interface SignupState {
  requesting: boolean;
  successful: boolean;
  messages: Message[];
  errors: Message[];
}
