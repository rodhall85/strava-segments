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
      personalRecord: '100s',
      ranking: 3,
      athleteCount: 1000,
      timeFromKom: '3s',
      distance: '1000m',
      elevationGain: '12m',
      // topThreeAthletes: [
      //   'Mr Pink - 97s',
      //   'Mrs Orange - 98s',
      //   'Rod Hall - 100s',
      // ],
    }, {
      id: 2,
      name: 'Segment 2',
      personalRecord: '200s',
      ranking: 2,
      athleteCount: 2000,
      timeFromKom: '2s',
      distance: '2000m',
      elevationGain: '4m',
      // topThreeAthletes: [
      //   'Mr Orange - 198s',
      //   'Rod Hall - 200s',
      //   'Mrs Orange - 201s',
      // ],
    }, {
      id: 3,
      name: 'Segment 3',
      personalRecord: '300s',
      ranking: 30,
      athleteCount: 3000,
      timeFromKom: '30s',
      distance: '3000m',
      elevationGain: '30m',
      // topThreeAthletes: [
      //   'Mr Pink - 270s',
      //   'Mrs Orange - 273s',
      //   'Mr Brown - 275s',
      // ],
    }]);
  })),
}));

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

  it('should call Strava API', () => {
    expect(stravaApi.getSegmentStats).toHaveBeenCalled();
  });

  it('should call Strava API with the access_token', () => {
    expect(stravaApi.getSegmentStats).toHaveBeenCalledWith('fake_access_token');
  });

  it('should render a table', () => {
    const list = wrapper.find('table');

    expect(list.length).toBe(1);
  });

  it('should render table header', () => {
    wrapper.update();

    const listItems = wrapper.find('thead tr');
    expect(listItems.length).toBe(1);
  });

  it('should render 3 table rows', () => {
    wrapper.update();

    const listItems = wrapper.find('tbody tr');
    expect(listItems.length).toBe(3);
  });

  it('should render first table row correctly', () => {
    wrapper.update();

    const tableRow = wrapper.find('tbody tr').at(0);
    expect(tableRow.text()).toBe('Segment 1100s310003s1000m12m');
  });

  it('should render second table row correctly', () => {
    wrapper.update();

    const tableRow = wrapper.find('tbody tr').at(1);
    expect(tableRow.text()).toBe('Segment 2200s220002s2000m4m');
  });

  it('should render third table row correctly', () => {
    wrapper.update();

    const tableRow = wrapper.find('tbody tr').at(2);
    expect(tableRow.text()).toBe('Segment 3300s30300030s3000m30m');
  });
});
