import React from 'react';

import { getToken } from '../../services/tokenApi';

import './SignIn.css';

const signin = (props) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const code = params.get('code');

  if (code) {
    getToken(code);
    return;
  }
    
  const stravaApiUrl = process.env.REACT_APP_STRAVA_API_URL;
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
    
  window.location.replace(`${stravaApiUrl}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=read`);
};

// if code is present in the url then exchange token otherwise authorize with Strava
// if access_token is in the cookie then check validity and refresh if needed

export default () => (
  // if we have a code in the query string then get token
  <div>
    <div id="signin-message">
      Welcome to Strava&nbsp;Segments!
      Please&nbsp;Signin to Strava so that we can fetch your starred&nbsp;segments
      and see how you compare to the&nbsp;world!
    </div>
    <div id="signin-button" onClick={signin} onKeyUp={signin} role="button" tabIndex="0">
      Sign In
    </div>
  </div>
);
