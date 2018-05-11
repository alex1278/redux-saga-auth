import { CLIENT_SET, CLIENT_UNSET } from './constants';

export function setClient (token: string) {
  return {
    type: CLIENT_SET,
    token,
  };
}

export function unsetClient () {
  return {
    type: CLIENT_UNSET,
  };
}
