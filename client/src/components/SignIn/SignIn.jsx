import React from 'react';

import './SignIn.css';

const signin = () => {
  // TODO: Move these to env vars
  const stravaApiAuthUrl = 'https://www.strava.com/oauth/authorize';
  const clientId = 34566;
  const redirectUrl = 'http://localhost:3000';

  window.location.replace(`${stravaApiAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=read`);
};

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
