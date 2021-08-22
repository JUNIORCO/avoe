import React from 'react';
import '../stylesheets/Header.css';
import { Box } from '@material-ui/core';

const text = require('../constants/text.json');

const Header = () => (
  <Box mt={15}>
    <header>
      <p id="welcome-text">{text.welcome}</p>
      <p id="description-text">{text.description}</p>
    </header>
  </Box>
);

export default Header;
