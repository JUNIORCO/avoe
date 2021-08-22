import React from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import {
  HighLevelStates,
  recorderIdle,
  setHighLevelState,
} from '../reducers/applicationSlice';
import { useDispatch } from 'react-redux';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import '../stylesheets/StyleSelector.css';
import lolaImg from '../assets/lola.jpeg';

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

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  padding: {
    padding: 0,
  },
  badge: {
    fill: 'green',
    fontSize: 40,
  },
}));

const StyleSelector = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

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
          <Grid container item xs={12} spacing={2} justify="center">
            <Grid item>
              <IconButton className={classes.padding}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  badgeContent={
                    <CheckCircleSharpIcon className={classes.badge} />
                  }
                >
                  <Avatar alt="lola" src={lolaImg} className={classes.large} />
                </Badge>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton className={classes.padding}>
                <Avatar alt="lola" src={lolaImg} className={classes.large} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2} justify="center">
            <Grid item>
              <IconButton className={classes.padding}>
                <Avatar alt="lola" src={lolaImg} className={classes.large} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton className={classes.padding}>
                <Avatar alt="lola" src={lolaImg} className={classes.large} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default StyleSelector;
