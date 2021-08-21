import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  idle,
  start,
  stop,
  reset,
  accept,
  Status,
} from '../reducers/recorderSlice';
import '../stylesheets/Recorder.css';
import micGrayScale from '../assets/microphone-grayscale.png';
import micColored from '../assets/microphone-colored.png';

const Recorder = (props) => {
  const { status } = props;

  const [micSrc, setMicSrc] = useState(micGrayScale);
  const [mediaRecorder, setMediaRecorder] = useState({});
  const [audioURL, setAudioURL] = useState('');
  const [timer, setTimer] = useState(0);
  const [secondsRecording, setSecondsRecording] = useState(0);
  const [mediaAvailable, setMediaAvailable] = useState(true);

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
            setAudioURL(window.URL.createObjectURL(blob));
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
      case Status.RESET:
        handleResetState();
        break;
      case Status.ACCEPT:
        handleAcceptState();
    }
  }, [status]);

  const countDown = () => {
    setSecondsRecording(secondsRecording + 1);
  };

  const startTimer = () => {
    setTimer(setInterval(countDown, 1000));
  };

  const handleIdleState = () => {
    setMicSrc(micGrayScale);
  };

  const handleStartState = () => {
    setMicSrc(micColored);
    startTimer();
    mediaRecorder.start();
  };

  const handleStopState = () => {
    setMicSrc(micGrayScale);
    clearInterval(timer);
    setSecondsRecording(0);
    mediaRecorder.stop();
  };

  const handleResetState = () => {
    console.log('User reset recording');
  };

  const handleAcceptState = () => {
    console.log('User accepted recording');
  };

  return (
    <div id="recording-container">
      <button
        id="recording-btn"
        className="pulsing"
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
      {audioURL !== '' ? (
        <div>
          <audio controls>
            <source src={audioURL} />
          </audio>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({ status: state.recorder.status });

export default connect(mapStateToProps)(Recorder);
