import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  FC,
} from 'react';
import { SetUserAction } from './actions';
import globalReducer from './reducer';

export interface IState {
  token: string;
  user: string;
}

export type IAction = SetUserAction;

interface IContext {
  state: IState;
  dispatch: (action: IAction) => void;
}

const Context = createContext<IContext>({
  state: {} as IState,
  dispatch: () => {},
});

export function useGlobalContext(): IContext {
  return useContext(Context);
}

const GlobalProvider: FC<{ children: JSX.Element[] }> = ({ children }) => {
  const initialState: IState = {
    token: '',
    user: '',
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default GlobalProvider;
