import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  idle,
  start,
  recorded,
  reset,
  accept,
  Status,
} from '../reducers/recorderSlice';
import '../stylesheets/Recorder.css';
import micGrayScale from '../assets/microphone-grayscale.png';
import micColored from '../assets/microphone-colored.png';

const Recorder = (props) => {
  const [micSrc, setMicSrc] = useState(micGrayScale);
  const dispatch = useDispatch();

  useEffect(() => {
    switch (props.status) {
      case Status.IDLE:
        handleIdleState();
        break;
      case Status.START:
        handleStartState();
        break;
      case Status.RECORDED:
        handleRecordedState();
        break;
      case Status.RESET:
        handleResetState();
        break;
      case Status.ACCEPT:
        handleAcceptState();
    }
  }, [props.status]);

  const handleIdleState = () => {
    console.log('Idling');
    setMicSrc(micGrayScale);
  };

  const handleStartState = () => {
    console.log('User started recording');
    setMicSrc(micColored);
  };

  const handleRecordedState = () => {
    console.log('User finished recording');
    setMicSrc(micColored);
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
        disabled={props.status === Status.RECORDED}
        onMouseDown={() => {
          dispatch(start());
        }}
        onMouseUp={() => {
          dispatch(recorded());
        }}
      >
        <img id="recording-logo" src={micSrc} alt="logo" />
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({ status: state.recorder.status });

export default connect(mapStateToProps)(Recorder);
