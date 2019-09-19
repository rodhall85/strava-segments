import React from 'react';

const Header = ({ loggedIn, athlete = {}, signOut }) => {
  const renderAccountInfo = () => {
    if (loggedIn) {
      return (
        <span>
          <span>{athlete.name}</span>
          <span onClick={signOut}>Sign out</span>
        </span>
      );
    }
  };

  return (
    <div>
      <h1>Strava Segments</h1>
      {renderAccountInfo()}
    </div>
  );
};

export default Header;
