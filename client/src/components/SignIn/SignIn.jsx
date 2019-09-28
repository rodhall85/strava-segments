import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 30px;
  max-width: 1080px;
  margin: auto;
`;

const Message = styled.div`
  border: 3px solid #b2222e;
  color: #b2222e;
  padding: 30px;
  background-color: #ec99a0;
  text-align: center;
`;

const StravaButton = styled.div`
  background-color: #fc4c02;
  width: 150px;
  margin: 30px auto;
  padding: 10px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  border-radius: 10px;
`;

const SignIn = ({ attemptSignIn }) => (
  <Wrapper>
    <Message>
      <p>
        Welcome to
        {' '}
        <strong>Strava&nbsp;Segments!</strong>
      </p>
      <p>
        Please&nbsp;Signin to Strava so that we can fetch your starred&nbsp;segments
        and see how you compare to the&nbsp;world!
      </p>
    </Message>
    <StravaButton onClick={attemptSignIn} onKeyUp={attemptSignIn} role="button" tabIndex="0">
      Sign In
    </StravaButton>
  </Wrapper>
);

SignIn.propTypes = {
  attemptSignIn: PropTypes.func.isRequired,
};

export default SignIn;
