import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import RecorderComponent from './components/Recorder';
import Visualizer from './components/Visualizer';
import Counter from './components/Counter';

const App = () => (
  <Provider store={store}>
    <Counter />
    <Header />
    <RecorderComponent />
    <Visualizer />
  </Provider>
);

export default App;
