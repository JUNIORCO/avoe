import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import RecorderComponent from './components/Recorder';
import Visualizer from './components/Visualizer';

const App = () => (
  <Provider store={store}>
    <Header />
    <RecorderComponent />
    <Visualizer />
  </Provider>
);

export default App;
