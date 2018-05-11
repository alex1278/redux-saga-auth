export enum ClientActionType {
  CLIENT_SET = 'CLIENT_SET',
  CLIENT_UNSET = 'CLIENT_UNSET'
}

export interface ClientSetPayload {
  token: Token;
}

export type ClientSetAction = ActionWithPayload<ClientActionType.CLIENT_SET, ClientSetPayload>;
export type ClientUnsetAction = Action<ClientActionType.CLIENT_UNSET>;

export type ClientAction = ClientSetAction | ClientUnsetAction;

export interface ClientState {
  id: string | null;
  token: Token | null;
}
