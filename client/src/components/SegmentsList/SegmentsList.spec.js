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
    expect(tableRow.text()).toBe('Segment 1100310003100012Mr Pink - 97sMrs Orange - 98sRod Hall - 100s');
  });

  it('should render second table row correctly', () => {
    wrapper.update();

    const tableRow = wrapper.find('tbody tr').at(1);
    expect(tableRow.text()).toBe('Segment 220022000220004Mr Orange - 198sRod Hall - 200sMrs Orange - 201s');
  });

  it('should render third table row correctly', () => {
    wrapper.update();

    const tableRow = wrapper.find('tbody tr').at(2);
    expect(tableRow.text()).toBe('Segment 330030300030300030Mr Pink - 270sMrs Orange - 273sMr Brown - 275s');
  });
});
