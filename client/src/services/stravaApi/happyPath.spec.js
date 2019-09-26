import axios from 'axios';

import { getSegmentStats } from '.';
import mockSegmentsData from '../../test/mock-segments-response';
import mockLeaderboardData from '../../test/mock-leaderboard-data';

process.env.REACT_APP_STRAVA_API_URL = 'https://fake-strava.com';

jest.mock('axios', () => ({
  get: jest.fn().mockImplementation((url) => new Promise((resolve) => {
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
    const expectedResponse = [{
      id: 1,
      name: 'Segment 1',
      personalRecord: 100,
      // ranking: 3,
      athleteCount: 1000,
      // timeFromKom: 3,
      distance: 1000,
      elevationGain: 20,
      topThreeAthletes: 'Mr Pink - 30s\r\nMr Blue - 31s\r\nMr Green - 32s',
    }, {
      id: 2,
      name: 'Segment 2',
      personalRecord: 200,
      // ranking: 2,
      athleteCount: 2000,
      // timeFromKom: 2,
      distance: 2000,
      elevationGain: 9,
      topThreeAthletes: 'Mrs Orange - 100s\r\nMrs Blue - 101s\r\nMrs Violet - 105s',
    }, {
      id: 3,
      name: 'Segment 3',
      personalRecord: 300,
      // ranking: 30,
      athleteCount: 3000,
      // timeFromKom: 30,
      distance: 3000,
      elevationGain: 180,
      topThreeAthletes: 'Mr Brown - 67s\r\nMr Indigo - 68s\r\nMr Red - 75s',
    }];

    const response = await getSegmentStats('fake_access_token');

    expect(response).toEqual(expectedResponse);
  });
});
