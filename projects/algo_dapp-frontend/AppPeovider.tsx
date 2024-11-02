import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface AppContextInterface {
  appID: string;
  setAppID: (name: string) => void;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appID, setAppID] = useState<string>('');

  return (
    <AppContext.Provider value={{ appID, setAppID }}>
      {children}
    </AppContext.Provider>
  );

}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppProvider
