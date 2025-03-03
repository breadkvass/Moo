import { createContext, FC, ReactElement, useState } from "react";

type User = {
  email: string;
  name: string;
}

type AuthProps = {
    user: User;
    isLoading: boolean;
    isError: boolean;
    isAuth: boolean;
}

type AuthActions = {
    setUser: (user: User) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsError: (isError: boolean) => void;
    setIsAuth: (isAuth: boolean) => void;
}

type AuthContextType = [
  user: AuthProps,
  actions: AuthActions,
];

const AuthContext = createContext<AuthContextType>([
  {
    user: {} as User,
    isLoading: true,
    isError: false,
    isAuth: false
  },
  {
    setUser: () => {},
    setIsLoading: () => {},
    setIsError: () => {},
    setIsAuth: () => {}
  }
] as AuthContextType);

type AuthContextProviderProps = {
  children: ReactElement;
}

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
    const [state, setState] = useState<AuthProps>({
        user: {} as User,
        isLoading: true,
        isError: false,
        isAuth: false
    });

    const setUser = (user: User) => {
      setState((prev: AuthProps)  => ({
        ...prev,
        user
      }));
    }

    const setIsLoading = (isLoading: boolean) => {
      setState((prev: AuthProps)  => ({
        ...prev,
        isLoading
      }));
    }

    const setIsError = (isError: boolean) => {
      setState((prev: AuthProps)  => ({
        ...prev,
        isError
      }));
    }

    const setIsAuth = (isAuth: boolean) => {
      setState((prev: AuthProps) => ({
        ...prev,
        isAuth
      }))
    }
  
    return (
      <AuthContext.Provider value={[state, {setUser, setIsLoading, setIsError, setIsAuth}]}>
        {children}
      </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };