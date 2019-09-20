import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ loggedIn, athlete = {}, signOut }) => {
  const renderAccountInfo = () => {
    if (loggedIn) {
      return (
        <span>
          <span>{athlete.name}</span>
          <span onClick={signOut} onKeyUp={signOut} role="button" tabIndex="0">Sign out</span>
        </span>
      );
    }

    return null;
  };

  return (
    <div>
      <h1>Strava Segments</h1>
      {renderAccountInfo()}
    </div>
  );
};

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  athlete: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Header;
