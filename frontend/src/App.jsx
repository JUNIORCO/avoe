import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { HighLevelStates } from './reducers/applicationSlice';
import Header from './components/Header';
import Recorder from './components/Recorder';
import RecorderControls from './components/RecorderControls';
import StyleSelector from './components/StyleSelector';
import { Characters } from './constants/characters';

const App = (props) => {
  const { highLevelState } = props;

  useEffect(() => {
    const characterImages = Characters.map((character) => character.image);
    cacheImages(characterImages);
  }, []);

  const cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
      });
    });

    await Promise.all(promises);
  };

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
