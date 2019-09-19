import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import * as tokenApi from '../../services/tokenApi';

process.env.REACT_APP_STRAVA_API_URL = 'https://example.com';
process.env.REACT_APP_CLIENT_ID = 12345;
process.env.REACT_APP_REDIRECT_URL = 'https://example.com';

import SignIn from './SignIn';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<SignIn />', () => {
  let wrapper;
  window.location.replace = jest.fn();

  beforeEach(() => {
    wrapper = mount(<SignIn />);
  });

  afterEach(() => {
    window.location.replace.mockClear();
  });

  it('should render a message', () => {
    const message = wrapper.find('#signin-message');

    expect(message.length).toBe(1);
  });

  it('should render a signin button', () => {
    const button = wrapper.find('#signin-button');

    expect(button.length).toBe(1);
  });

  it('should redirect the user to authenticate when clicked', () => {
    const button = wrapper.find('#signin-button');
    const expectedUrl = 'https://example.com/oauth/authorize?client_id=12345&redirect_uri=https://example.com&response_type=code&scope=read';
    
    button.simulate('click');
   
    expect(window.location.replace).toHaveBeenCalledWith(expectedUrl);
  });

  describe('when "code" is in the query string', () => {
    let spy = jest.spyOn(tokenApi, 'getToken');

    beforeEach(() => {
      window.history.pushState({}, '', '?code=foo');
      const button = wrapper.find('#signin-button');

      button.simulate('click');
    });

    afterEach(() => {
      spy.mockClear();
    });

    it('should perform token exchange via "getToken" request', () => {
      expect(spy).toHaveBeenCalled();
    });

    it('should pass "code" to token exchange', () => {
      expect(spy).toHaveBeenCalledWith('foo');
    });

    it('should not redirect user', () => {
      expect(window.location.replace).not.toHaveBeenCalled();
    });
  });
});
