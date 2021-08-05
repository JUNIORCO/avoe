import React from 'react';
import Header from './components/Header';
import AppContainer from './views/AppContainer';
import Recording from './components/Recording';
import './App.css';

const App = () => (
  <AppContainer>
    <Header />
    <Recording />
  </AppContainer>
);

export default App;
