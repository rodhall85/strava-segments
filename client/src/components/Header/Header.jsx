import React from 'react';

const Header = ({ loggedIn, userData, signOut }) => {
  const renderAccountInfo = () => {
    if (loggedIn) {
      return (
        <span>
          <span>{userData.name}</span>
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
