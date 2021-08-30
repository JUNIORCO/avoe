import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  AppStates,
  firstOpening,
  HighLevelStates,
  recorderIdle,
  recorderStart,
  recorderStop,
  setAudioURL,
  setHighLevelState,
  setAudioBase64
} from '../reducers/applicationSlice';
import '../stylesheets/Recorder.css';
import micImg from '../assets/microphone.png';
import stopImg from '../assets/stop.png';
import checkImg from '../assets/check.png';
import { blobToBase64 } from '../helpers/common';

const Recorder = (props) => {
  const { appState } = props;
  const [imgSrc, setImgSrc] = useState(micImg);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [mediaAvailable, setMediaAvailable] = useState(true);
  const dispatch = useDispatch();
  const chunks = [];

  useEffect(() => {
    switch (appState) {
      case AppStates.FIRST_OPENING:
        handleFirstOpening();
        return;
      case AppStates.RECORDER_START:
        handleStartState();
        return;
      case AppStates.RECORDER_STOP:
        handleStopState();
        return;
      case AppStates.RECORDER_RETRY:
        handleRetryState();
        return;
      case AppStates.RECORDER_IDLE:
        handleIdleState();
        return;
      case AppStates.STYLE_SELECTION_START:
        handleToStyleSelectionState();
        return;
      default:
        return;
    }
  }, [appState]);

  const handleFirstOpening = () => {
    setImgSrc(micImg);
  };

  const handleStartState = () => {
    setImgSrc(stopImg);

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false,
        })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);

          recorder.ondataavailable = (e) => chunks.push(e.data);

          recorder.onstop = async () => {
            stream.getTracks()
              .forEach((track) => track.stop());
            const blob = new Blob(chunks, { type: 'audio/mp3' });
            const audioURL = window.URL.createObjectURL(blob);
            dispatch(setAudioURL(audioURL));
            const audioBase64 = (await blobToBase64(blob)).split(',')[1];
            dispatch(setAudioBase64(audioBase64));
            chunks.length = 0;
          };

          setMediaRecorder(recorder);
          recorder.start();
        })
        .catch(() => {
          setMediaAvailable(false);
        });
    } else {
      setMediaAvailable(false);
    }
  };

  const handleStopState = () => {
    mediaRecorder.stop();
    dispatch(recorderIdle());
  };

  const handleRetryState = () => {
    dispatch(setAudioURL(null));
    dispatch(firstOpening());
  };

  const handleIdleState = () => {
    setImgSrc(checkImg);
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
          disabled={appState === AppStates.RECORDER_IDLE}
          onClick={() => {
            appState === AppStates.FIRST_OPENING
              ? dispatch(recorderStart())
              : dispatch(recorderStop());
          }}
        >
          <img id="recording-logo" src={imgSrc} alt="recording-logo" />
        </button>
      ) : null}
    </section>
  );
};

const mapStateToProps = (state) => ({ appState: state.application.appState });

export default connect(mapStateToProps)(Recorder);
