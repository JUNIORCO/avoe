import React from 'react';
import '../stylesheets/Header.css';

const text = require('../constants/text.json');

const Header = () => (
  <header>
    <p id="welcome-text">{text.welcome}</p>
    <p id="description-text">{text.description}</p>
  </header>
);

export default Header;
