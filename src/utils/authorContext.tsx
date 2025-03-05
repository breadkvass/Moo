import { createContext, FC, ReactElement, useState } from "react";

type AuthorProps = {
    id: number | null,
    name: string,
    quote: string,
    isLoading: boolean,
    isLoadingQuote: boolean,
    isError: boolean
}

type AuthorActions = {
    setId: (id: number) => void;
    setName: (author: string) => void;
    setQuote: (quote: string) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsLoadingQuote: (isLoadingQuote: boolean) => void;
    setIsError: (isError: boolean) => void;
}

type AuthorContextType = [
  updatedAuthor: AuthorProps,
  actions: AuthorActions,
];

const AuthorContext = createContext<AuthorContextType>([
  {
    id: null,
    name: '',
    quote: '',
    isLoading: false,
    isLoadingQuote: false,
    isError: false,
  },
  {
    setId: () => {},
    setName: () => {},
    setQuote: () => {},
    setIsLoading: () => {},
    setIsLoadingQuote: () => {},
    setIsError: () => {}
  }
] as AuthorContextType);

type QuoteContextProviderProps = {
  children: ReactElement;
}

const AuthorContextProvider: FC<QuoteContextProviderProps> = ({ children }) => {
    const [state, setState] = useState<AuthorProps>({
      id: null,
      name: '',
      quote: '',
      isLoading: false,
      isLoadingQuote: false,
      isError: false,
    });

    const setId = (id: number) => {
      setState((prev: AuthorProps)  => ({
          ...prev,
          id
      }));
    }

    const setName = (name: string) => {
      setState((prev: AuthorProps)  => ({
        ...prev,
        name
      }));
    }

    const setQuote = (quote: string) => {
      setState((prev: AuthorProps)  => ({
        ...prev,
        quote
      }));
    }

    const setIsLoading = (isLoading: boolean) => {
      setState((prev: AuthorProps)  => ({
        ...prev,
        isLoading
      }));
    }

    const setIsLoadingQuote = (isLoadingQuote: boolean) => {
      setState((prev: AuthorProps)  => ({
        ...prev,
        isLoadingQuote
      }));
    }

    const setIsError = (isError: boolean) => {
      setState((prev: AuthorProps)  => ({
        ...prev,
        isError
      }));
    }

    return (
      <AuthorContext.Provider value={[state, {setId, setName, setQuote, setIsLoading, setIsLoadingQuote, setIsError}]}>
        {children}
      </AuthorContext.Provider>
    );
};

export { AuthorContext, AuthorContextProvider };