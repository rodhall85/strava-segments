import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import SignIn from './SignIn';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<SignIn />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SignIn />);
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
    window.location.replace = jest.fn();
    button.simulate('click');

    // TODO: Mock these params...
    expect(window.location.replace).toHaveBeenCalledWith('https://www.strava.com/oauth/authorize?client_id=34566&redirect_uri=http://localhost:3000&response_type=code&scope=read');
  });
});
