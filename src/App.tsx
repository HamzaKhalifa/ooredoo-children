import React, { useContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { AppContext, AppContextType } from './AppContext';
import Intro from './pages/intro-page';

import Ooredoo1Intro, { Ooredoo1IntroContextProvider } from './pages/ooredoo-1/intro';
import Ooredoo1Play from './pages/ooredoo-1/play';

import Ooredoo2Intro, { Ooredoo2IntroContextProvider } from './pages/ooredoo-2/intro';
import Ooredoo2Play from './pages/ooredoo-2/play';

import TunisiaTelecomIntro, { TunisiaTelecomIntroContextProvider } from './pages/tunisia-telecom-1/intro';
import TunisiaTelecomPlay from './pages/tunisia-telecom-1/play';

import TrainIntro from './pages/train/intro';
import TrainIntroContextProvider from './pages/train/intro/context';
import TrainPlay from './pages/train/play';

import './App.css';

window.addEventListener("locationchange", () => {
  console.log('we are changing the background color');
}, false);

const App: React.FC = () => {
  const appContext: AppContextType = useContext(AppContext);

  return (
    <div className='app__container' style={{ backgroundColor: appContext.appContext.backgroundColor, color: 'white' }}>
      <Ooredoo1IntroContextProvider>
        <Ooredoo2IntroContextProvider>
          <TunisiaTelecomIntroContextProvider>
            <TrainIntroContextProvider>
              <BrowserRouter>
                <Route component={Intro} path='/' exact />
                
                <Route component={Ooredoo1Intro} path='/ooredoo-1' exact />
                <Route component={Ooredoo1Play} path='/ooredoo-1/play' exact />

                <Route component={Ooredoo2Intro} path='/ooredoo-2' exact />
                <Route component={Ooredoo2Play} path='/ooredoo-2/play' exact />

                <Route component={TunisiaTelecomIntro} path='/tunisia-telecom/:version' exact />
                <Route component={TunisiaTelecomPlay} path='/tunisia-telecom/play/:version' exact />

                <Route component={TrainIntro} path='/train' exact />
                <Route component={TrainPlay} path="/train/play" exact />
                
              </BrowserRouter>
            </TrainIntroContextProvider>
          </TunisiaTelecomIntroContextProvider>
        </Ooredoo2IntroContextProvider>
      </Ooredoo1IntroContextProvider>
    </div>
  );
}

export default App;
