import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CirclePicker } from 'react-color';

import Intro, { IntroContextProvider } from './pages/Intro/Intro';
import Play from './pages/play/Play';


import './App.css';

const App: React.FC = () => {
  return (
    <div style={styles.container}>
      <IntroContextProvider>
        <BrowserRouter>
          <Route component={Intro} path='/' exact />
          <Route component={Play} path='/play' exact />
        </BrowserRouter>
      </IntroContextProvider>
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
