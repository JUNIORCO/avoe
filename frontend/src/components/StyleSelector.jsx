import React from 'react';
import '../stylesheets/StyleSelector.css';
import { Box, Button, withStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
  HighLevelStates,
  recorderIdle,
  recorderStop,
  setHighLevelState,
  styleSelectionStart,
} from '../reducers/applicationSlice';
import { useDispatch } from 'react-redux';

const text = require('../constants/text.json');

const BackButton = withStyles((theme) => ({
  root: {
    color: '#F3505F',
    borderColor: '#F3505F',
    '&:hover': {
      borderColor: '#BA3240',
    },
  },
}))(Button);

const StyleSelector = () => {
  const dispatch = useDispatch();

  return (
    <section>
      <Box>
        <BackButton
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<CheckCircleIcon />}
          onClick={() => {
            dispatch(setHighLevelState(HighLevelStates.RECORDER));
            dispatch(recorderIdle());
          }}
        >
          Back
        </BackButton>
      </Box>
    </section>
  );
};

export default StyleSelector;
