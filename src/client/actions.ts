import { ClientActionType, ClientSetAction, ClientUnsetAction } from './constants';

export function setClient(token: Token): ClientSetAction {
  return {
    type: ClientActionType.CLIENT_SET,
    token,
  };
}

export function unsetClient(): ClientUnsetAction {
  return {
    type: ClientActionType.CLIENT_UNSET,
  };
}
