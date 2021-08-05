import React from 'react';
import PropTypes from 'prop-types';

const AppContainer = (props) => {
  const { children } = props;

  return <div className="App-Container">{children}</div>;
};

AppContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppContainer;
