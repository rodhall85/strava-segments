const axios = require('axios');

const stravaApiUrl = process.env.STRAVA_API_URL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

module.exports.getToken = async (event) => {
  if (!event || !event.queryStringParameters || !event.queryStringParameters.authorisationCode) {
    return new Promise((resolve) => {
      resolve({
        statusCode: 400,
        body: JSON.stringify({ error: 'missing authorisationCode in request' }),
      });
    });
  }

  const { authorisationCode } = event.queryStringParameters;

  let response;
  try {
    response = await axios.post(
      `${stravaApiUrl}/oauth/token`,
      null,
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          code: authorisationCode,
          grant_type: 'authorization_code',
        },
      },
    );

    return new Promise((resolve) => {
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: expiresAt,
        athlete,
      } = response.data;

      resolve({
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_at: expiresAt,
          athlete: {
            id: athlete.id,
            name: `${athlete.firstname} ${athlete.lastname}`,
            image_url: athlete.profile,
          },
        }),
      });
    });
  } catch (error) {
    return new Promise(resolve => resolve({
      statusCode: error.response.status === 400 ? 400 : 502,
      body: error.response.status === 400 ? JSON.stringify(error.response.data) : null,
    }));
  }
};
