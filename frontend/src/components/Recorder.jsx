import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  idle,
  start,
  stop,
  retry,
  next,
  Status,
} from '../reducers/recorderSlice';
import { setAudioURL } from '../reducers/audioURLSlice';
import '../stylesheets/Recorder.css';
import micPng from '../assets/microphone.png';
import micGif from '../assets/microphone.gif';

const Recorder = (props) => {
  const { status } = props;

  const [micSrc, setMicSrc] = useState(micGif);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [timer, setTimer] = useState(0);
  const [secondsRecording, setSecondsRecording] = useState(0);
  const [mediaAvailable, setMediaAvailable] = useState(true);
  const [nextState, setNextState] = useState(false);

  const dispatch = useDispatch();

  const chunks = [];
  const maxTime = 30;

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
          console.log('An error happened...');
        });
    } else {
      setMediaAvailable(false);
    }
  }, []);

  useEffect(() => {
    switch (status) {
      case Status.IDLE:
        handleIdleState();
        break;
      case Status.START:
        handleStartState();
        break;
      case Status.STOP:
        handleStopState();
        break;
      case Status.RETRY:
        handleRetryState();
        break;
      case Status.NEXT:
        handleNextState();
    }
  }, [status]);

  const countDown = () => {
    setSecondsRecording(secondsRecording + 1);
  };

  const startTimer = () => {
    setTimer(setInterval(countDown, 1000));
  };

  const handleIdleState = () => {
    setMicSrc(micGif);
  };

  const handleStartState = () => {
    setMicSrc(micPng);
    startTimer();
    mediaRecorder.start();
  };

  const handleStopState = () => {
    setMicSrc(micPng);
    clearInterval(timer);
    setSecondsRecording(0);
    mediaRecorder.stop();
  };

  const handleRetryState = () => {
    dispatch(setAudioURL(''));
    dispatch(idle());
  };

  const handleNextState = () => {
    console.log('Hello world');
    setNextState(true);
  };

  return (
    <section id="recording">
      {!nextState ? (
        <button
          id="recording-btn"
          type="button"
          disabled={status === Status.STOP}
          onMouseDown={() => {
            dispatch(start());
          }}
          onMouseUp={() => {
            dispatch(stop());
          }}
        >
          <img id="recording-logo" src={micSrc} alt="recording-logo" />
        </button>
      ) : null}
    </section>
  );
};

const mapStateToProps = (state) => ({ status: state.recorder.status });

export default connect(mapStateToProps)(Recorder);
