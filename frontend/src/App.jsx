import React from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import Recorder from './components/Recorder';
import RecorderControls from './components/RecorderControls';
import { HighLevelStates } from './reducers/applicationSlice';

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
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  highLevelState: state.application.highLevelState,
});

export default connect(mapStateToProps)(App);
