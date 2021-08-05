import React from 'react';
import '../stylesheets/Header.css';

const text = require('../constants/text.json');

const Header = () => (
  <div className="Header">
    <p className="WelcomeText">{text.welcome}</p>
    <p className="DescriptionText">{text.description}</p>
  </div>
);

export default Header;
