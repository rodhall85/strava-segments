const axios = require('axios');

process.env.STRAVA_API_URL = 'https://example.com';
process.env.CLIENT_ID = 1000;
process.env.CLIENT_SECRET = 'secret';

const api = require('../handlers/stravaSegments');

jest.mock('axios', () => ({
  post: jest.fn(),
}));

// const stubRequest = ({ statusCode = 200, body = { message: 'dummy response' } }) => {
//   axios.post.mockImplementation(() => {
//     return new Promise((resolve) => {
//       resolve({ statusCode, body });
//     });
//   });
// };

describe('Strava API is broken', () => {
  let response;

  const setup = async ({
    statusCode = 200,
    data = {
      access_token: 'some_access_token',
      refresh_token: 'some_refresh_token',
      expires_at: 100000,
    },
  }) => {
    axios.post.mockClear();

    axios.post.mockImplementation(() => new Promise((_, reject) => {
      reject({
        response: {
          status: statusCode,
          data,
        },
      });
    }));

    response = await api.getToken({ queryStringParameters: { authorisationCode: 'foo' } });
  };

  it('should post request', async () => {
    await setup({ statusCode: 400 });

    expect(axios.post).toHaveBeenCalled();
  });

  it('should return 400 when Strava API returns 400', async () => {
    await setup({ statusCode: 400 });

    expect(response.statusCode).toBe(400);
  });

  it('should include message on reponse when Strava API returns 400', async () => {
    const responseBody = {
      message: 'Bad Request',
      errors: [{
        resource: 'OAuth',
        field: 'GrantType',
        code: 'invalid',
      }],
    };

    await setup({ statusCode: 400, data: responseBody });

    expect(JSON.parse(response.body)).toEqual(responseBody);
  });

  it.each([401, 403, 404, 500, 502, 504])('should return 502 - Bad Gateway for any other error', async (statusCode) => {
    await setup({ statusCode });

    expect(response.statusCode).toEqual(502);
  });

  it.each([401, 403, 404, 500, 502, 504])('should NOT map Strava API response message to the response on error', async (statusCode) => {
    await setup({ statusCode, data: { message: 'Nothing to see here!' } });

    expect(response.body).toEqual(null);
  });
});
