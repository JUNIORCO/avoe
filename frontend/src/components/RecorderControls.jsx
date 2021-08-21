import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import '../stylesheets/RecorderControls.css';
import { retry, next } from '../reducers/recorderSlice';

const text = require('../constants/text.json');

const NextButton = withStyles((theme) => ({
  root: {
    backgroundColor: '#15C0E8',
    '&:hover': {
      backgroundColor: '#1399E6',
    },
  },
}))(Button);

const RetryButton = withStyles((theme) => ({
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
      {audioURL !== '' ? (
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
                dispatch(retry());
              }}
            >
              {text.retryBtn}
            </RetryButton>
          </Box>
          <Box m={2} display="inline">
            <NextButton
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<CheckCircleIcon />}
              onClick={() => {
                dispatch(next());
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

const mapStateToProps = (state) => ({ audioURL: state.audioURL.audioURL });

export default connect(mapStateToProps)(RecorderControls);
