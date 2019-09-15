const axios = require('axios');

const stravaApiUrl = 'https://www.strava.com';
const clientId = 34566;

module.exports.getToken = async (event) => {
  if (!event) {
    return new Promise((resolve) => {
      resolve({
        statusCode: 400,
        headers: {
          my_header: 'my_value',
        },
        body: JSON.stringify({ error: 'missing authorisationCode in request' }),
        isBase64Encoded: false,
      });
    });
  }

  const { authorisationCode } = event.queryStringParameters;

  const response = await axios.post(`${stravaApiUrl}/oauth/token`, {
    client_id: clientId,
    client_secret: '',
    code: authorisationCode,
    grant_type: 'authorization_code',
  });

  return new Promise((resolve) => {
    resolve({
      statusCode: response.status,
      headers: {
        my_header: 'my_value',
      },
      body: JSON.stringify({ message: 'responseBody' }),
      isBase64Encoded: false,
    });
  });
};

// authenticate - Call authenticate, get response,
// then validate token to get access_token. Return access_token.
