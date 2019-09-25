import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import SegmentsList from '.';
import * as stravaApi from '../../services/stravaApi';

jest.mock('../../services/stravaApi', () => ({
  getSegmentStats: jest.fn().mockImplementation(() => new Promise((resolve) => {
    resolve([{
      id: 1,
      name: 'Segment 1',
      personalRecord: 100,
      ranking: 3,
      athleteCount: 1000,
      timeFromKom: 3,
      distance: 1000,
      elevationGain: 12,
      topThreeAthletes: [
        'Mr Pink - 97s',
        'Mrs Orange - 98s',
        'Rod Hall - 100s',
      ],
    }, {
      id: 2,
      name: 'Segment 2',
      personalRecord: 200,
      ranking: 2,
      athleteCount: 2000,
      timeFromKom: 2,
      distance: 2000,
      elevationGain: 4,
      topThreeAthletes: [
        'Mr Orange - 198s',
        'Rod Hall - 200s',
        'Mrs Orange - 201s',
      ],
    }, {
      id: 3,
      name: 'Segment 3',
      personalRecord: 300,
      ranking: 30,
      athleteCount: 3000,
      timeFromKom: 30,
      distance: 3000,
      elevationGain: 30,
      topThreeAthletes: [
        'Mr Pink - 270s',
        'Mrs Orange - 273s',
        'Mr Brown - 275s',
      ],
    }]);
  })),
}));
// jest.mock('axios', () => ({
//   get: jest.fn().mockImplementation(() => new Promise((resolve) => {
//     resolve({
//       status: 200,
//       data: [{
//         id: 1,
//         name: 'Segment 1',
//         activity_type: 'Ride',
//         distance: 1000,
//         climb_category: 0,
//         city: 'City Of Peterborough',
//         state: 'Cambridgeshire',
//         country: 'United Kingdom',
//         private: false,
//         hazardous: false,
//         starred: true,
//         pr_time: 100,
//         athlete_pr_effort: {
//           id: 1,
//           elapsed_time: 100,
//           distance: 1000,
//           start_date: '2019-01-01T10:00:00Z',
//           start_date_local: '2019-01-01T10:00:00Z',
//           is_kom: false,
//         },
//         starred_date: '2019-01-01T10:00:00Z',
//       }, {
//         id: 2,
//         name: 'Segment 2',
//         activity_type: 'Ride',
//         distance: 2000,
//         climb_category: 0,
//         city: 'City Of Peterborough',
//         state: 'Cambridgeshire',
//         country: 'United Kingdom',
//         private: false,
//         hazardous: false,
//         starred: true,
//         pr_time: 200,
//         athlete_pr_effort: {
//           id: 1,
//           elapsed_time: 200,
//           distance: 2000,
//           start_date: '2019-01-01T10:00:00Z',
//           start_date_local: '2019-01-01T10:00:00Z',
//           is_kom: false,
//         },
//         starred_date: '2019-01-01T10:00:00Z',
//       }, {
//         id: 3,
//         name: 'Segment 3',
//         activity_type: 'Ride',
//         distance: 3000,
//         climb_category: 0,
//         city: 'City Of Peterborough',
//         state: 'Cambridgeshire',
//         country: 'United Kingdom',
//         private: false,
//         hazardous: false,
//         starred: true,
//         pr_time: 300,
//         athlete_pr_effort: {
//           id: 1,
//           elapsed_time: 300,
//           distance: 3000,
//           start_date: '2019-01-01T10:00:00Z',
//           start_date_local: '2019-01-01T10:00:00Z',
//           is_kom: false,
//         },
//         starred_date: '2019-01-01T10:00:00Z',
//       }],
//     });
//   })),
// }));
describe('segments list', () => {
  let wrapper;

  beforeEach(async () => {
    await act(async () => {
      wrapper = mount(<SegmentsList accessToken="fake_access_token" />);
    });
  });

  afterEach(() => {
    stravaApi.getSegmentStats.mockClear();
  });

  it('should render a list', () => {
    const list = wrapper.find('ul');

    expect(list.length).toBe(1);
  });

  it('should call Strava API', () => {
    expect(stravaApi.getSegmentStats).toHaveBeenCalled();
  });

  it('should call Strava API with the access_token', () => {
    expect(stravaApi.getSegmentStats).toHaveBeenCalledWith('fake_access_token');
  });

  it('should render 3 list items', () => {
    wrapper.update();

    const listItems = wrapper.find('li');
    expect(listItems.length).toBe(3);
  });

  it('should render first list item correctly', () => {
    wrapper.update();

    const listItem = wrapper.find('li').at(0);

    expect(listItem.find('span.segment-name').text()).toBe('Segment 1');
    expect(listItem.find('span.pr').text()).toBe('100');
    expect(listItem.find('span.ranking').text()).toBe('3');
    expect(listItem.find('span.athlete-count').text()).toBe('1000');
    expect(listItem.find('span.time-from-kom').text()).toBe('3');
    expect(listItem.find('span.distance').text()).toBe('1000');
    expect(listItem.find('span.elevation-gain').text()).toBe('12');
  });

  it('should render second list item correctly', () => {
    wrapper.update();

    const listItem = wrapper.find('li').at(1);

    expect(listItem.find('span.segment-name').text()).toBe('Segment 2');
    expect(listItem.find('span.pr').text()).toBe('200');
    expect(listItem.find('span.ranking').text()).toBe('2');
    expect(listItem.find('span.athlete-count').text()).toBe('2000');
    expect(listItem.find('span.time-from-kom').text()).toBe('2');
    expect(listItem.find('span.distance').text()).toBe('2000');
    expect(listItem.find('span.elevation-gain').text()).toBe('4');
  });

  it('should render third list item correctly', () => {
    wrapper.update();

    const listItem = wrapper.find('li').at(2);

    expect(listItem.find('span.segment-name').text()).toBe('Segment 3');
    expect(listItem.find('span.pr').text()).toBe('300');
    expect(listItem.find('span.ranking').text()).toBe('30');
    expect(listItem.find('span.athlete-count').text()).toBe('3000');
    expect(listItem.find('span.time-from-kom').text()).toBe('30');
    expect(listItem.find('span.distance').text()).toBe('3000');
    expect(listItem.find('span.elevation-gain').text()).toBe('30');
  });
});
