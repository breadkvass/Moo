import { createContext, FC, ReactElement, useState } from 'react';

type CompanyInfoProps = {
  info: string;
  isLoading: boolean;
  isError: boolean;
}

type CompanyInfoActions = {
  setInfo: (info: '') => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
}

type CompanyInfoContextType = [
  companyInfo: CompanyInfoProps,
  actions: CompanyInfoActions,
];

const CompanyInfoContext = createContext<CompanyInfoContextType>([
  {
    info: '',
    isLoading: true,
    isError: false,
  },
  {
    setInfo: () => {},
    setIsLoading: () => {},
    setIsError: () => {},
  }
] as CompanyInfoContextType);

type CompanyInfoContextProviderProps = {
    children: ReactElement
}
const CompanyInfoContextProvider: FC<CompanyInfoContextProviderProps> = ({ children }) => {
  const [state, setState] = useState<CompanyInfoProps>({
    info:'',
    isLoading: true,
    isError: false
  });
    
  const setInfo = (info: string) => {
    setState((prev: CompanyInfoProps)  => ({
      ...prev,
      info
    }));
  }
    
  const setIsLoading = (isLoading: boolean) => {
    setState((prev: CompanyInfoProps)  => ({
      ...prev,
      isLoading
    }));
  }
    
  const setIsError = (isError: boolean) => {
    setState((prev: CompanyInfoProps)  => ({
      ...prev,
      isError
    }));
  }
    
    return (
      <CompanyInfoContext.Provider value={[state, {setInfo, setIsError, setIsLoading}]}>
        {children}
      </CompanyInfoContext.Provider>
    );
  };

  export { CompanyInfoContext, CompanyInfoContextProvider };