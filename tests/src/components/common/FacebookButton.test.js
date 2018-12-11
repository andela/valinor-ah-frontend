import React from 'react';
import { shallow } from 'enzyme';
import FacebookButton from '../../../../src/components/common/FacebookButton';

const setup = () => {
  const props = {
    responseFacebook: jest.fn(),
    request: jest.fn(),
    text: 'Signup with Facebook'
  };
  const wrapper = shallow(<FacebookButton {...props} />);
  return { wrapper, props };
};

test('should render facebook button', () => {
  const { wrapper } = setup();
  expect(wrapper).toMatchSnapshot();
});

test('should render facebook button without crashing', () => {
  const { wrapper } = setup();
  expect(wrapper.exists()).toBe(true);
});
