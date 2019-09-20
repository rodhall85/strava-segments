import React from 'react';
import { mount } from 'enzyme';

import Header from '.';

describe('Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Header />);
  });

  it('shuold render a Header component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('should render a title', () => {
    const title = wrapper.find('h1');

    expect(title.length).toBe(1);
  });
});

describe('when user is logged in', () => {
  let wrapper;
  const mockSignOut = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <Header
        loggedIn
        athlete={{ name: 'Rod Hall' }}
        signOut={mockSignOut}
      />,
    );
  });

  it('should display name', () => {
    const name = wrapper.find('span[children="Rod Hall"]');

    expect(name.length).toBe(1);
  });

  it('should display sign out button', () => {
    const signOut = wrapper.find('span[children="Sign out"]');

    expect(signOut.length).toBe(1);
  });

  it('should invoke signOut component when user clicks "Sign out"', () => {
    const signOut = wrapper.find('span[children="Sign out"]');

    signOut.simulate('click');

    expect(mockSignOut).toHaveBeenCalled();
  });
});
