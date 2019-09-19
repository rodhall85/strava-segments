const axios = require('axios');

process.env.STRAVA_API_URL = 'https://example.com';
process.env.CLIENT_ID = 1000;
process.env.CLIENT_SECRET = 'secret';

const api = require('../handlers/stravaSegments');

jest.mock('axios', () => ({
  post: jest.fn(),
}));

describe('POST /getToken', () => {
  let response;

  beforeEach(async () => {
    axios.post.mockClear();

    axios.post.mockImplementation(() => new Promise((resolve) => {
      resolve({
        status: 200,
        data: {
          access_token: 'some_access_token',
          refresh_token: 'some_refresh_token',
          expires_at: 100000,
          athlete: {
            id: 1,
            firstname: 'Rod',
            lastname: 'Hall',
            profile: 'https://someaddressforimage.png',
          },
        },
      });
    }));

    response = await api.getToken({ queryStringParameters: { authorisationCode: 'foo' } });
  });

  it('should post request', () => {
    expect(axios.post).toHaveBeenCalled();
  });

  it('should post request with correct arguments', () => {
    expect(axios.post).toHaveBeenCalledWith(
      'https://example.com/oauth/token',
      null,
      {
        params: {
          client_id: '1000',
          client_secret: 'secret',
          code: 'foo',
          grant_type: 'authorization_code',
        },
      },
    );
  });

  it('should return 200', () => {
    expect(response.statusCode).toBe(200);
  });

  it('should contain "access_token" on the response', () => {
    expect(JSON.parse(response.body).access_token).toBe('some_access_token');
  });

  it('should contain "refresh_token" on the response', () => {
    expect(JSON.parse(response.body).refresh_token).toBe('some_refresh_token');
  });

  it('should contain "expires_at" on the response', () => {
    expect(JSON.parse(response.body).expires_at).toBe(100000);
  });

  it('should contain "athlete.id" on the response', () => {
    expect(JSON.parse(response.body).athlete.id).toBe(1);
  });

  it('should contain "athlete.name" on the response', () => {
    expect(JSON.parse(response.body).athlete.name).toBe('Rod Hall');
  });

  it('should contain "athlete.image_url" on the response', () => {
    expect(JSON.parse(response.body).athlete.image_url).toBe('https://someaddressforimage.png');
  });
});
