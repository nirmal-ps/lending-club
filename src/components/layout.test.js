import React from 'react';
import { shallow } from 'enzyme';
import LayoutWrapper from './layout';

it('renders without crashing', () => {
  shallow(<LayoutWrapper />);
});

it('renders welcome message', () => {
    const wrapper = shallow(<LayoutWrapper />);
    const welcome = <span>Loan Details</span>;
    
    // expect(wrapper.contains(welcome)).toBe(true);
    expect(wrapper.contains(welcome)).toEqual(true);
  });