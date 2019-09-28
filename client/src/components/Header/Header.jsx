import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHeader = styled.div`
  background-color: #b2222e;
  width: 100%;
  color: blue;
`;

const StyledTitle = styled.h1`
  color: #eee;
  text-transform: uppercase;
  margin: 0;
  padding: 20px;
  width: 50%;
  display: inline-block;
  box-sizing: border-box;
`;

const StyledAccountArea = styled.span`
  width: 50%;
  display: inline-block;
  box-sizing: border-box;
  text-align: right;
  padding: 20px;
`;

const StyledSpan = styled.span`
  color: #eee;
`;

const StyledLink = styled.span`
  cursor: pointer;
  color: #1a5a87;
  font-weight: bold;
  text-decoration: underline;
`;

const Header = ({ loggedIn, athlete = {}, signOut }) => {
  const renderAccountInfo = () => {
    if (loggedIn) {
      return (
        <StyledAccountArea>
          <StyledSpan>
            {`Hi ${athlete ? athlete.name : 'Nobody'}! `}
          </StyledSpan>
          <StyledLink onClick={signOut} onKeyUp={signOut} role="button" tabIndex="0">Sign out</StyledLink>
        </StyledAccountArea>
      );
    }

    return null;
  };

  return (
    <StyledHeader>
      <StyledTitle>
        Strava
        {' '}
        Segments
      </StyledTitle>
      {renderAccountInfo()}
    </StyledHeader>
  );
};

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  athlete: PropTypes.shape({
    name: PropTypes.string,
  }),
  signOut: PropTypes.func.isRequired,
};

Header.defaultProps = {
  athlete: {},
};

export default Header;
