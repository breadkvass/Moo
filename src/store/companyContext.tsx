import { createContext, FC, ReactElement, useState } from 'react';

// Создаём контекст и задаем значения по умолчанию для него
const CompanyInfoContext = createContext({
  companyInfo: '',
  setInfo: (info: string) => {info}
});

type CompanyInfoContextProviderProps = {
    children: ReactElement
}
const CompanyInfoContextProvider: FC<CompanyInfoContextProviderProps> = ({ children }) => {
    const [ companyInfo, setCompanyInfo ] = useState('');
  
    const setInfo = (info: string) => setCompanyInfo(info);
  
    return (
      <CompanyInfoContext.Provider value={{ companyInfo, setInfo }}>
        {children}
      </CompanyInfoContext.Provider>
    );
  };

  export { CompanyInfoContext, CompanyInfoContextProvider };