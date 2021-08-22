import React from 'react';
import { withStyles } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import {
  recorderRetry,
  styleSelectionStart,
} from '../reducers/applicationSlice';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import '../stylesheets/RecorderControls.css';

const text = require('../constants/text.json');

const NextButton = withStyles(() => ({
  root: {
    backgroundColor: '#15C0E8',
    '&:hover': {
      backgroundColor: '#1399E6',
    },
  },
}))(Button);

const RetryButton = withStyles(() => ({
  root: {
    color: '#F3505F',
    borderColor: '#F3505F',
    '&:hover': {
      borderColor: '#BA3240',
    },
  },
}))(Button);

const RecorderControls = (props) => {
  const { audioURL } = props;
  const dispatch = useDispatch();

  return (
    <section id="recorder-controls">
      {audioURL !== null ? (
        <>
          <Box mb={3} display="block">
            <audio controls>
              <source src={audioURL} />
            </audio>
          </Box>
          <Box m={2} display="inline">
            <RetryButton
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<CancelIcon />}
              onClick={() => {
                dispatch(recorderRetry());
              }}
            >
              {text.retryBtn}
            </RetryButton>
          </Box>
          <Box m={2} display="inline">
            <NextButton
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                dispatch(styleSelectionStart());
              }}
            >
              {text.nextBtn}
            </NextButton>
          </Box>
        </>
      ) : null}
    </section>
  );
};

const mapStateToProps = (state) => ({ audioURL: state.application.audioURL });

export default connect(mapStateToProps)(RecorderControls);
