import React from 'react';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppStates } from '../reducers/applicationSlice';
import '../stylesheets/Header.css';

const text = require('../constants/text.json');

const Header = (props) => {
  const { appState } = props;

  const textHandler = () => {
    if (appState === AppStates.FIRST_OPENING) {
      return text.startRecording;
    } else if (appState === AppStates.RECORDER_START) {
      return text.endRecording;
    } else {
      return text.doneRecording;
    }
  };

  return (
    <Box mt={15}>
      <header>
        <p id="welcome-text">{text.header}</p>
        <p id="description-text">{textHandler()}</p>
      </header>
    </Box>
  );
};

const mapStateToProps = (state) => ({ appState: state.application.appState });

export default connect(mapStateToProps)(Header);
