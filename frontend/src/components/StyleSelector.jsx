import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, withStyles } from '@material-ui/core';
import {
  AppStates,
  HighLevelStates,
  recorderIdle,
  setHighLevelState,
  styleApplied,
  styleSelected as setStyleSelected,
} from '../reducers/applicationSlice';
import { connect, useDispatch } from 'react-redux';
import CharacterIcon from './CharacterIcon';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import '../stylesheets/StyleSelector.css';
import { Characters } from '../constants/characters';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const text = require('../constants/text.json');

const BackButton = withStyles(() => ({
  root: {
    color: '#F3505F',
    borderColor: '#F3505F',
    '&:hover': {
      borderColor: '#BA3240',
    },
  },
}))(Button);

const NextButton = withStyles(() => ({
  root: {
    backgroundColor: '#15C0E8',
    '&:hover': {
      backgroundColor: '#1399E6',
    },
  },
}))(Button);

const StyleSelector = (props) => {
  const { appState, styleSelected } = props;
  const dispatch = useDispatch();

  return (
    <section>
      <Box mt={15}>
        <BackButton
          variant="outlined"
          color="secondary"
          size="medium"
          startIcon={<ArrowBackIosIcon />}
          onClick={() => {
            dispatch(setHighLevelState(HighLevelStates.RECORDER));
            dispatch(recorderIdle());
          }}
        >
          {text.backBtn}
        </BackButton>
      </Box>
      <Box mt={3}>
        <p className="white">{text.chooseStyle}</p>
      </Box>
      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid container item xs={12} spacing={2} justifyContent="center">
            {Characters.map((character) => (
              <CharacterIcon
                id={character.id}
                image={character.image}
                selected={styleSelected === character.id}
                handleClick={() => {
                  dispatch(setStyleSelected(character.id));
                }}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
      {appState === AppStates.STYLE_SELECTED ? (
        <Box mt={5}>
          <NextButton
            variant="contained"
            size="large"
            endIcon={<CloudUploadIcon />}
            onClick={() => {
              dispatch(styleApplied());
            }}
          >
            {`${text.applyBtn} ${styleSelected}`}
          </NextButton>
        </Box>
      ) : null}
    </section>
  );
};

const mapStateToProps = (state) => ({
  appState: state.application.appState,
  styleSelected: state.application.styleSelected,
});

export default connect(mapStateToProps)(StyleSelector);
