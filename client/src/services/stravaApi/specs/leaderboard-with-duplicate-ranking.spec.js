import axios from 'axios';

import { getSegmentStats } from '..';
import mockSegmentsData from '../../../test/mock-segments-response';
import mockLeaderboardData from '../../../test/mock-leaderboard-data';

process.env.REACT_APP_STRAVA_API_URL = 'https://fake-strava.com';

jest.mock('axios', () => ({
  get: jest.fn().mockImplementation((url) => new Promise((resolve) => {
    mockSegmentsData[0].athlete_pr_effort.elapsed_time = 101;
    mockLeaderboardData[0].entries = [{
      athlete_name: 'Mr Orange',
      elapsed_time: 100,
      moving_time: 100,
      start_date: '2018-09-26T13:04:57Z',
      start_date_local: '2018-09-26T14:04:57Z',
      rank: 1,
    }, {
      athlete_name: 'Mr Duplicate',
      elapsed_time: 101,
      moving_time: 101,
      start_date: '2018-12-02T13:25:57Z',
      start_date_local: '2018-12-02T13:25:57Z',
      rank: 21,
    }, {
      athlete_name: 'Mr Duplicate',
      elapsed_time: 101,
      moving_time: 101,
      start_date: '2018-12-02T13:25:57Z',
      start_date_local: '2018-12-02T13:25:57Z',
      rank: 21,
    }, {
      athlete_name: 'Mr Blue',
      elapsed_time: 101,
      moving_time: 101,
      start_date: '2018-12-02T13:25:57Z',
      start_date_local: '2018-12-02T13:25:57Z',
      rank: 21,
    }, {
      athlete_name: 'Mr Violet',
      elapsed_time: 105,
      moving_time: 105,
      start_date: '2018-12-02T13:25:57Z',
      start_date_local: '2018-12-02T13:25:57Z',
      rank: 31,
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

  it('it should call the api', async () => {
    await getSegmentStats();

    expect(axios.get).toHaveBeenCalled();
  });

  it('should call the api to get segments with the access_token', async () => {
    const expectedRequest = [
      'https://fake-strava.com/api/v3/segments/starred',
      {
        headers: {
          Authorization: 'Bearer fake_access_token',
        },
      },
    ];

    await getSegmentStats('fake_access_token');

    expect(axios.get).toHaveBeenCalledWith(...expectedRequest);
  });

  it.each([1])('should call the api to get leaderboard for segmentId: "%s"', async (segmentId) => {
    const expectedRequest = [
      `https://fake-strava.com/api/v3/segments/${segmentId}/leaderboard`,
      {
        headers: {
          Authorization: 'Bearer fake_access_token',
        },
      },
    ];

    await getSegmentStats('fake_access_token');

    expect(axios.get).toHaveBeenCalledWith(...expectedRequest);
  });

  it('responds with the correct data', async () => {
    const response = await getSegmentStats('fake_access_token');
    expect(response[2]).toEqual({
      id: 1,
      name: 'Segment 1',
      personalRecord: '1:41',
      ranking: 21,
      athleteCount: 1000,
      timeFromKom: '1s',
      distance: '1,000m',
      elevationGain: '4m',
      // topThreeAthletes: 'Mr Blue - 30s\r\nMr Pink - 31s\r\nMr Green - 32s',
    });
  });
});
