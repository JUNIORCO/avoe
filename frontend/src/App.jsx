import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { HighLevelStates } from './reducers/applicationSlice';
import Header from './components/Header';
import Recorder from './components/Recorder';
import RecorderControls from './components/RecorderControls';
import StyleSelector from './components/StyleSelector';

const App = (props) => {
  const { highLevelState } = props;

  return (
    <>
      {highLevelState === HighLevelStates.RECORDER ? (
        <>
          <Header />
          <Recorder />
          <RecorderControls />
        </>
      ) : null}
      {highLevelState === HighLevelStates.STYLE_SELECTION ? (
        <>
          <StyleSelector />
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  highLevelState: state.application.highLevelState,
});

export default connect(mapStateToProps)(App);
