import { SET_USER } from './constants';

export interface SetUserAction {
  type: typeof SET_USER;
  payload: string;
}
