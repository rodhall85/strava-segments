import axios from 'axios';

import { getSegmentStats } from '..';
import mockSegmentsData from '../../../test/mock-segments-response';
import mockLeaderboardData from '../../../test/mock-leaderboard-data';

process.env.REACT_APP_STRAVA_API_URL = 'https://fake-strava.com';

jest.mock('axios', () => ({
  get: jest.fn().mockImplementation((url) => new Promise((resolve) => {
    mockSegmentsData[0].athlete_pr_effort.elapsed_time = 200;
    mockLeaderboardData[0].entries = [{
      athlete_name: 'Mr Orange',
      elapsed_time: 100,
      moving_time: 100,
      start_date: '2018-09-26T13:04:57Z',
      start_date_local: '2018-09-26T14:04:57Z',
      rank: 1,
    }];

    mockSegmentsData[1].athlete_pr_effort.elapsed_time = 200;
    mockLeaderboardData[1].entries = [{
      athlete_name: 'Mr Orange',
      elapsed_time: 140,
      moving_time: 140,
      start_date: '2018-09-26T13:04:57Z',
      start_date_local: '2018-09-26T14:04:57Z',
      rank: 1,
    }];

    mockSegmentsData[2].athlete_pr_effort.elapsed_time = 200;
    mockLeaderboardData[2].entries = [{
      athlete_name: 'Mr Orange',
      elapsed_time: 141,
      moving_time: 141,
      start_date: '2018-09-26T13:04:57Z',
      start_date_local: '2018-09-26T14:04:57Z',
      rank: 1,
    }];

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

    expect(response[0].timeFromKom).toEqual('1:40');
    expect(response[1].timeFromKom).toEqual('1:00');
    expect(response[2].timeFromKom).toEqual('59s');
  });
});
