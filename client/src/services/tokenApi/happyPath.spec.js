import axios from 'axios';

import { getToken } from '.';

process.env.REACT_APP_TOKEN_API_URL = 'https://fake-token-url.com';

jest.mock('axios', () => ({
  get: jest.fn().mockImplementation(() => new Promise((resolve) => {
    resolve({
      status: 200,
      data: {
        access_token: 'some_access_token',
        refresh_token: 'some_refresh_token',
        expires_at: 100000,
        athlete: {
          id: 1,
          name: 'Rod Hall',
          image_url: 'https://someimageurl.png',
        },
      },
    });
  })),
}));

describe('token api', () => {
  afterEach(() => {
    axios.get.mockClear();
  });

  it('it should call the api', () => {
    getToken();

    expect(axios.get).toHaveBeenCalled();
  });

  it('shuld call the api with the code in the query string', () => {
    getToken('foo');

    // TODO : Sort out CORS
    expect(axios.get).toHaveBeenCalledWith('https://fake-token-url.com/getToken?authorisationCode=foo');
  });

  it('responds with the user tokens', async () => {
    const response = await getToken('foo');
    const expectedResponse = {
      status: 200,
      data: {
        access_token: 'some_access_token',
        refresh_token: 'some_refresh_token',
        expires_at: 100000,
        athlete: {
          id: 1,
          name: 'Rod Hall',
          image_url: 'https://someimageurl.png',
        },
      },
    };

    expect(response).toEqual(expectedResponse);
  });
});
