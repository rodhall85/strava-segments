import React, { useState } from 'react';

import Header from '../Header';
import SignIn from '../SignIn';
import SegmentsList from '../SegmentsList';
import { getToken } from '../../services/tokenApi';


const Main = () => {
  const [userData, setUserData] = useState(null);

  const attemptSignIn = async () => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const code = params.get('code');

    if (code) {
      const response = await getToken(code);
      setUserData(response.data);
      return;
    }

    const stravaApiUrl = process.env.REACT_APP_STRAVA_API_URL;
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL;

    window.location.replace(`${stravaApiUrl}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=read`);
  };

  const signOut = () => {
    setUserData(undefined);
  };

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

export default Main;
