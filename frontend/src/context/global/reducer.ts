import { IState, IAction } from './index';
import { SET_USER } from './constants';

const globalReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case SET_USER:
      return state;

    default:
      return state;
  }
};

export default globalReducer;
