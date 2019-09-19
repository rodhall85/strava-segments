import React, { useState } from 'react';

import SignIn from '../SignIn';
import { getToken } from '../../services/tokenApi';


const Main = () => {
  const [accessToken, setAccessToken] = useState(null);

  const attemptSignIn = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get('code');
  
    if (code) {
        const accessToken = getToken(code);
        setAccessToken(accessToken);
        return;
    }
        
    const stravaApiUrl = process.env.REACT_APP_STRAVA_API_URL;
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
        
    window.location.replace(`${stravaApiUrl}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=read`);
  };

  return (
    <div>
      {
        !accessToken ? 
          <SignIn attemptSignIn={attemptSignIn} /> : 
          <span>Got it!</span>
      }
    </div>
  );
};

export default Main;
