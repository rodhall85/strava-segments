import axios from 'axios';

import { getSegmentStats } from '..';
import mockSegmentsData from '../../../test/mock-segments-response';
import mockLeaderboardData from '../../../test/mock-leaderboard-data';

process.env.REACT_APP_STRAVA_API_URL = 'https://fake-strava.com';

jest.mock('axios', () => ({
  get: jest.fn().mockImplementation((url) => new Promise((resolve) => {
    mockSegmentsData[0].athlete_pr_effort.elapsed_time = 600;

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

  it('should return the PR data formatted as minutes:seconds', async () => {
    const response = await getSegmentStats('fake_access_token');

    const personalRecords = response.map((segment) => segment.ranking);

    expect(personalRecords[0]).toBe('Unranked');
    expect(personalRecords[1]).toBe(2);
    expect(personalRecords[2]).toBe(3);
  });
});
