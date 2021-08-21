import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import Recorder from './components/Recorder';
import RecorderControls from './components/RecorderControls';

const App = () => (
  <Provider store={store}>
    <Header />
    <Recorder />
    <RecorderControls />
  </Provider>
);

export default App;
