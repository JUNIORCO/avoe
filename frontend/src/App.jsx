import React from 'react';
import Header from './components/Header';
import AppContainer from './views/AppContainer';
import Voice from './components/Voice';
import './App.css';

const App = () => (
  <AppContainer>
    <Header />
    <Voice />
  </AppContainer>
);

export default App;
