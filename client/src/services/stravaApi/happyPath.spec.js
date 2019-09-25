import axios from 'axios';

import { getSegmentStats } from '.';
import mockSegmentsData from '../../test/mock-segments-response';

process.env.REACT_APP_STRAVA_API_URL = 'https://fake-strava.com';

jest.mock('axios', () => ({
  get: jest.fn().mockImplementation(() => new Promise((resolve) => {
    resolve({
      status: 200,
      data: mockSegmentsData,
    });
  })),
}));

describe('strava api', () => {
  afterEach(() => {
    axios.get.mockClear();
  });

  it('it should call the api', () => {
    getSegmentStats();

    expect(axios.get).toHaveBeenCalled();
  });

  it('should call the api to get segments with the access_token', () => {
    const expectedRequest = [
      'https://fake-strava.com/api/v3/segments/starred', 
      {
        headers: {
          Authorization: 'Bearer fake_access_token',
        },
      },
    ];

    getSegmentStats('fake_access_token');

    expect(axios.get).toHaveBeenCalledWith(...expectedRequest);
  });

  it('responds with the correct data', async () => {
    const expectedResponse = [{
      id: 1,
      name: 'Segment 1',
      personalRecord: 100,
      // ranking: 3,
      // athleteCount: 1000,
      // timeFromKom: 3,
      distance: 1000,
      elevationGain: 20,
      // topThreeAthletes: [
      //   'Mr Pink - 97s',
      //   'Mrs Orange - 98s',
      //   'Rod Hall - 100s',
      // ],
    }, {
      id: 2,
      name: 'Segment 2',
      personalRecord: 200,
      // ranking: 2,
      // athleteCount: 2000,
      // timeFromKom: 2,
      distance: 2000,
      elevationGain: 9,
      // topThreeAthletes: [
      //   'Mr Orange - 198s',
      //   'Rod Hall - 200s',
      //   'Mrs Orange - 201s',
      // ],
    }, {
      id: 3,
      name: 'Segment 3',
      personalRecord: 300,
      // ranking: 30,
      // athleteCount: 3000,
      // timeFromKom: 30,
      distance: 3000,
      elevationGain: 180,
      // topThreeAthletes: [
      //   'Mr Pink - 270s',
      //   'Mrs Orange - 273s',
      //   'Mr Brown - 275s',
      // ],
    }];

    const response = await getSegmentStats('fake_access_token');

    expect(response).toEqual(expectedResponse);
  });
});
