import React, { useState, createContext } from 'react';
import utils from './utils';

export const backgroundColors = ['#68acff', '#9AD2A9', '#629FB0', '#72D4F5', '#027CAC', '#DF8F4B'];

export const getRandomBackgroundColor = (): string => backgroundColors[utils.getRandomInt(0, backgroundColors.length - 1)];

export type AppContextType = {
  appContext: IAppContext,
  setAppContext: Function
}

interface IAppContext {
  backgroundColor: string,
}

export const AppContext = createContext<AppContextType>({
  appContext: {
    backgroundColor: backgroundColors[0],
  },
  setAppContext: () => {}
});

const AppContextProvider: React.FC = ({ children }) => {
  const [appContext, setAppContext] = useState<IAppContext>({
    backgroundColor: getRandomBackgroundColor()
  });

  return(
    <AppContext.Provider value={{appContext, setAppContext}}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
