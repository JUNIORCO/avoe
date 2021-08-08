import React from 'react';
import '../stylesheets/Header.css';

const text = require('../constants/text.json');

const Header = () => (
  <div className="header">
    <p className="welcome-text">{text.welcome}</p>
    <p className="description-text">{text.description}</p>
  </div>
);

export default Header;
