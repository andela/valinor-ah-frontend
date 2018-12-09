import React from 'react';
import { shallow } from 'enzyme';

import { Spinner, mapStateToProps } from '../../../../src/components/common/Spinner';

const setup = (loadingStatus) => {
  const props = {
    isLoading: loadingStatus
  };
  const wrapper = shallow(<Spinner {...props} />);
  return { props, wrapper };
};
test('Spinner snapshot test', () => {
  const { wrapper } = setup(false);
  expect(wrapper).toMatchSnapshot();
});

test('Spinner second staging snapshot test', () => {
  const { wrapper } = setup(true);
  expect(wrapper).toMatchSnapshot();
});

test('Spinner behaviour: display should be none when isLoading is true', () => {
  const { wrapper } = setup(false);
  expect(wrapper.props().style.display).toBe('none');
});

test('Spinner behaviour: display should be none when isLoading is true', () => {
  const { wrapper } = setup(true);
  expect(wrapper.props().style.display).toBe('block');
});

test('testing mapstate to props of spinner', () => {
  const state = {
    global: {
      isLoading: false,
    }
  };
  expect(mapStateToProps(state)).toEqual({
    isLoading: false,
  });
});
