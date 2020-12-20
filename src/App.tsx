import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Intro from './pages/intro-page';

import Ooredoo1Intro, { Ooredoo1IntroContextProvider } from './pages/ooredoo-1/intro';
import Ooredoo1Play from './pages/ooredoo-1/play';

import Ooredoo2Intro, { Ooredoo2IntroContextProvider } from './pages/ooredoo-2/intro';
import Ooredoo2Play from './pages/ooredoo-2/play';

import TunisiaTelecomIntro, { TunisiaTelecomIntroContextProvider } from './pages/tunisia-telecom-1/intro';
import TunisiaTelecomPlay from './pages/tunisia-telecom-1/play';

import './App.css';

const App: React.FC = () => {
  return (
    <div className='app__container' style={styles.container}>
      <Ooredoo1IntroContextProvider>
        <Ooredoo2IntroContextProvider>
          <TunisiaTelecomIntroContextProvider>
            <BrowserRouter>
              <Route component={Intro} path='/' exact />
              
              <Route component={Ooredoo1Intro} path='/ooredoo-1' exact />
              <Route component={Ooredoo1Play} path='/ooredoo-1/play' exact />

              <Route component={Ooredoo2Intro} path='/ooredoo-2' exact />
              <Route component={Ooredoo2Play} path='/ooredoo-2/play' exact />

              <Route component={TunisiaTelecomIntro} path='/tunisia-telecom' exact />
              <Route component={TunisiaTelecomPlay} path='/tunisia-telecom/play' exact />
            </BrowserRouter>
          </TunisiaTelecomIntroContextProvider>
        </Ooredoo2IntroContextProvider>
      </Ooredoo1IntroContextProvider>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default App;
