import axios from 'axios';

import { getSegmentStats } from '..';
import mockSegmentsData from '../../../test/mock-segments-response';
import mockLeaderboardData from '../../../test/mock-leaderboard-data';

process.env.REACT_APP_STRAVA_API_URL = 'https://fake-strava.com';

jest.mock('axios', () => ({
  get: jest.fn().mockImplementation((url) => new Promise((resolve) => {
    mockSegmentsData[0].elevation_high = 10000;
    mockSegmentsData[0].elevation_low = 1000;

    mockSegmentsData[1].elevation_high = 10000;
    mockSegmentsData[1].elevation_low = 9000;

    mockSegmentsData[2].elevation_high = 10000;
    mockSegmentsData[2].elevation_low = 9001;

    const requests = {
      'https://fake-strava.com/api/v3/segments/starred': mockSegmentsData,
      'https://fake-strava.com/api/v3/segments/1/leaderboard': mockLeaderboardData[0],
      'https://fake-strava.com/api/v3/segments/2/leaderboard': mockLeaderboardData[1],
      'https://fake-strava.com/api/v3/segments/3/leaderboard': mockLeaderboardData[2],
    };

    return resolve({
      status: 200,
      data: requests[url],
    });
  })),
}));

describe('strava api', () => {
  afterEach(() => {
    axios.get.mockClear();
  });

  it('responds with the correct data', async () => {
    const response = await getSegmentStats('fake_access_token');

    expect(response[0].elevationGain).toEqual('9,000m');
    expect(response[1].elevationGain).toEqual('1,000m');
    expect(response[2].elevationGain).toEqual('999m');
  });
});
