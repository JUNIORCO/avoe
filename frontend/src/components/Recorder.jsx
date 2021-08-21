import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  AppStates,
  HighLevelStates,
  recorderIdle,
  recorderStart,
  recorderStop,
  setAudioURL,
  setHighLevelState,
} from '../reducers/applicationSlice';
import '../stylesheets/Recorder.css';
import micPng from '../assets/microphone.png';
import micGif from '../assets/microphone.gif';

const Recorder = (props) => {
  const { appState } = props;
  const [micSrc, setMicSrc] = useState(micGif);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [mediaAvailable, setMediaAvailable] = useState(true);
  const dispatch = useDispatch();
  const chunks = [];

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);

          recorder.ondataavailable = (e) => chunks.push(e.data);

          recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/webm;codecs=opus' });
            const audioURL = window.URL.createObjectURL(blob);
            dispatch(setAudioURL(audioURL));
            chunks.length = 0;
          };

          setMediaRecorder(recorder);
        })
        .catch(() => {
          setMediaAvailable(false);
        });
    } else {
      setMediaAvailable(false);
    }
  }, []);

  useEffect(() => {
    switch (appState) {
      case AppStates.RECORDER_IDLE:
        handleIdleState();
        break;
      case AppStates.RECORDER_START:
        handleStartState();
        break;
      case AppStates.RECORDER_STOP:
        handleStopState();
        break;
      case AppStates.RECORDER_RETRY:
        handleRetryState();
        break;
      case AppStates.STYLE_SELECTION_START:
        handleToStyleSelectionState();
    }
  }, [appState]);

  const handleIdleState = () => {
    setMicSrc(micGif);
  };

  const handleStartState = () => {
    setMicSrc(micPng);
    mediaRecorder.start();
  };

  const handleStopState = () => {
    setMicSrc(micPng);
    mediaRecorder.stop();
  };

  const handleRetryState = () => {
    dispatch(setAudioURL(null));
    dispatch(recorderIdle());
  };

  const handleToStyleSelectionState = () => {
    dispatch(setHighLevelState(HighLevelStates.STYLE_SELECTION));
  };

  return (
    <section id="recording">
      {mediaAvailable ? (
        <button
          id="recording-btn"
          type="button"
          disabled={appState === AppStates.RECORDER_STOP}
          onMouseDown={() => {
            dispatch(recorderStart());
          }}
          onMouseUp={() => {
            dispatch(recorderStop());
          }}
        >
          <img id="recording-logo" src={micSrc} alt="recording-logo" />
        </button>
      ) : null}
    </section>
  );
};

const mapStateToProps = (state) => ({
  appState: state.application.appState,
});

export default connect(mapStateToProps)(Recorder);
