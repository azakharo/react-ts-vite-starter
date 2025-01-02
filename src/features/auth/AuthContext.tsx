import {
  createContext,
  FC, PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {useNavigate} from 'react-router-dom';

import {ROUTE__LOGIN} from '@/shared/constants';
import {
  getAuthToken as getAuthTokenFromLocalStorage,
  getUserId as getUserIdFromLocalStorage,
  remAuthToken as remAuthTokenFromLocalStorage,
  remUserId as remUserIdFromLocalStorage,
  setAuthToken as putAuthTokenToLocalStorage,
  setUserId as putUserIdToLocalStorage,
} from '@/shared/helpers';
import {UserSignedIn} from './types';
import {login as loginMethod} from './api';

export interface AuthState {
  isAuthenticated: boolean;
  isInitialised: boolean;
  user: UserSignedIn | null;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const setSession = (token?: string, userId?: number): void => {
  if (token) {
    putAuthTokenToLocalStorage(token);
    putUserIdToLocalStorage(userId as number);
  } else {
    remAuthTokenFromLocalStorage();
    remUserIdFromLocalStorage();
  }
};

const ACTION__APP_INIT = 'ACTION__APP_INIT';
const ACTION__LOGIN = 'ACTION__LOGIN';
const ACTION__LOGOUT = 'ACTION__LOGOUT';

interface AppInitAction {
  type: typeof ACTION__APP_INIT;
  payload: UserSignedIn | null;
}

interface LoginAction {
  type: typeof ACTION__LOGIN;
  payload: UserSignedIn;
}

interface LogoutAction {
  type: typeof ACTION__LOGOUT;
}

const reducer = (
  state: AuthState,
  action: AppInitAction | LoginAction | LogoutAction,
) => {
  switch (action.type) {
    case ACTION__APP_INIT: {
      const user = action.payload;

      return {
        ...state,
        isAuthenticated: !!user,
        isInitialised: true,
        user,
      };
    }
    case ACTION__LOGIN: {
      const user = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case ACTION__LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      return {...state};
    }
  }
};

export interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  ...initialAuthState,
  login: () => Promise.resolve(),
  logout: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const navigate = useNavigate();

  const login = useCallback(
    async (username: string, password: string) => {
      const {id, name, token} = await loginMethod(username, password);

      setSession(token, id);

      const user = {
        id,
        name,
      };

      dispatch({
        type: ACTION__LOGIN,
        payload: user,
      });
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    setSession();
    dispatch({type: ACTION__LOGOUT});
    navigate(ROUTE__LOGIN, {
      replace: true,
    });
  }, [navigate]);

  const contextValue = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [state, login, logout],
  );

  useEffect(() => {
    try {
      const accessToken = getAuthTokenFromLocalStorage();
      const userId = getUserIdFromLocalStorage();

      if (accessToken && userId) {
        // TODO Request current user info - check whether auth-ed or not
        const user = {
          id: userId,
          name: 'Alexey',
        };

        setSession(accessToken, userId);

        dispatch({
          type: ACTION__APP_INIT,
          payload: user,
        });
      } else {
        dispatch({
          type: ACTION__APP_INIT,
          payload: null,
        });
      }
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.error(err);

      dispatch({
        type: ACTION__APP_INIT,
        payload: null,
      });
    }
  }, []);

  if (!state.isInitialised) {
    return <span>Loading...</span>;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
