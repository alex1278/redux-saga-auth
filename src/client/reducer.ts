import { ClientAction, ClientActionType, ClientState } from './constants';

const initialSate: ClientState = {
  id: null,
  token: null,
};

const reducer = function clientReducer(state = initialSate, action: ClientAction) {
  switch (action.type) {
    case ClientActionType.CLIENT_SET:
      return {
        id: action.token.userId,
        token: action.token,
      };

    case ClientActionType.CLIENT_UNSET:
      return {
        id: null,
        token: null,
      };

    default:
      return state;
  }
};

export default reducer;
