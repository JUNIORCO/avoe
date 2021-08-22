import React from 'react';
import { Avatar, Grid, IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  iconBtn: {
    padding: 0,
  },
  boxShadow: {
    boxShadow: '0px 0px 25px 3px #f3505f',
  },
}));

const CharacterIcon = (props) => {
  const { id, image, selected, handleClick } = props;
  const classes = useStyles();

  return (
    <Grid item onClick={() => handleClick(id)}>
      <IconButton
        id={id}
        disableRipple
        className={classes.iconBtn + ' ' + (selected ? classes.boxShadow : '')}
      >
        <Avatar src={image} alt={id} className={classes.large} />
      </IconButton>
    </Grid>
  );
};

export default CharacterIcon;
