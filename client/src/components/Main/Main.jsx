import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../Header';
import SignIn from '../SignIn';
import SegmentsList from '../SegmentsList';
import { getToken } from '../../services/tokenApi';


const Main = ({ history }) => {
  const [userData, setUserData] = useState(null);
  const cookies = new Cookies();

  const attemptSignIn = async () => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const code = params.get('code');

    if (code) {
      const response = await getToken(code);
      setUserData(response.data);
      cookies.set('userTokens', btoa(JSON.stringify(response.data)), { path: '/' });
      return;
    }

    const stravaApiUrl = process.env.REACT_APP_STRAVA_API_URL;
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL;

    window.location.replace(`${stravaApiUrl}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=read`);
  };

  const signOut = () => {
    setUserData(undefined);
    cookies.remove('userTokens');
    history.push('/');
  };

  useEffect(() => {
    if (!userData) {
      const encodedUserTokens = cookies.get('userTokens');
      const userTokens = encodedUserTokens ? JSON.parse(atob(encodedUserTokens)) : null;

      if (userTokens) {
        setUserData(userTokens);
      }
    }
  }, [cookies, userData]);

  return (
    <div>
      <Header loggedIn={!!userData} athlete={userData && userData.athlete} signOut={signOut} />
      {
        !userData
          ? <SignIn attemptSignIn={attemptSignIn} />
          : <SegmentsList accessToken={userData.access_token} />
      }
    </div>
  );
};

Main.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(Main);
