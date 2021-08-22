import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, withStyles } from '@material-ui/core';
import {
  HighLevelStates,
  recorderIdle, setAudioURL,
  setHighLevelState,
  styleSelected
} from '../reducers/applicationSlice';
import { useDispatch } from 'react-redux';
import CharacterIcon from './CharacterIcon';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import '../stylesheets/StyleSelector.css';
import { Characters } from '../constants/characters';

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

const StyleSelector = () => {
  const [characterSelected, setCharacterSelected] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (character) => {
    dispatch(styleSelected());
    setCharacterSelected(character);
  };

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
                selected={characterSelected === character.id}
                handleClick={handleClick}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default StyleSelector;
