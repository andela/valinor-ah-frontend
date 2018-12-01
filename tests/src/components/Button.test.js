import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../src/components/Button';

const setup = (status) => {
  const props = {
    turnOn: jest.fn(),
    turnOff: jest.fn(),
    status: {
      status,
    }
  };

  const wrapper = shallow(<Button {...props} />);
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

  it('turnOn props should be fired when status of button is false', () => {
    const { wrapper, props } = setup(false);
    const buttonClick = wrapper.find('button');
    buttonClick.simulate('click');
    expect(props.turnOn).toHaveBeenCalled();
  });

  it('turnOff props should be fired when status of button is true', () => {
    const { wrapper, props } = setup(true);
    const buttonClick = wrapper.find('button');
    buttonClick.simulate('click');
    expect(props.turnOff).toHaveBeenCalled();
  });
});
