import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';

const setup = (status) => {
  const props = {
    turnOn: jest.fn(),
    turnOff: jest.fn(),
    status: {
      status,
    }
  };

  const wrapper = shallow(<Button {...props}/>);
  return {
    props,
    wrapper
  };
};

describe('TESTING BUTTON COMPONENT', () => {
  it('should correctly render button component', () => {
    const { wrapper } = setup(false);
    expect(wrapper.find('button').text()).toBe('false');
  });

  it('should correctly render button component', () => {
    const { wrapper, props } = setup(false);
    const buttonClick = wrapper.find('button');
    buttonClick.simulate('click');
    expect(props.turnOn).toHaveBeenCalled();
  });

  it('should correctly render button component', () => {
    const { wrapper, props } = setup(true);
    const buttonClick = wrapper.find('button');
    buttonClick.simulate('click');
    expect(props.turnOff).toHaveBeenCalled();
  });
});
