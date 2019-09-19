import React from 'react';

import './SignIn.css';

// if code is present in the url then exchange token otherwise authorize with Strava
// if access_token is in the cookie then check validity and refresh if needed

const SignIn = ({ attemptSignIn }) => (
  <div>
    <div id="signin-message">
        Welcome to Strava&nbsp;Segments!
        Please&nbsp;Signin to Strava so that we can fetch your starred&nbsp;segments
        and see how you compare to the&nbsp;world!
    </div>
    <div id="signin-button" onClick={attemptSignIn} onKeyUp={attemptSignIn} role="button" tabIndex="0">
        Sign In
    </div>
  </div>
);

export default SignIn;
