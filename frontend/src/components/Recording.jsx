import React, { useEffect } from 'react';
import micGrayScale from '../assets/microphone-grayscale.png';
import micColored from '../assets/microphone-colored.png';
import '../stylesheets/Recording.css';

const Recording = () => {
  useEffect(() => {
    // const record = document.getElementById('recording-btn');
    // const mainSection = document.querySelector('.main-controls');

    // record.disabled = true; // disable stop button while not recording

    if (navigator.mediaDevices.getUserMedia) {
      const constraints = { audio: true };
      // eslint-disable-next-line no-console
      console.log(constraints);
    }
  });

  const toggleImage = () => {
    document.getElementById('recording-logo').setAttribute('src', micColored);
  };

  return (
    <div id="recording-container">
      <button
        id="recording-btn"
        className="pulsing"
        onClick={toggleImage}
        type="button"
      >
        <img id="recording-logo" src={micGrayScale} alt="logo" />
      </button>
    </div>
  );
};

export default Recording;
