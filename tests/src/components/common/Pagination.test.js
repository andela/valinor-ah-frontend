import React from 'react';
import { shallow, mount } from 'enzyme';

import Pagination, { Buttons } from '../../../../src/components/common/Pagination';

test('should test pagination and button components', () => {
  const componentOne = mount(<Pagination custom={jest.fn()} pages={5} pageNumber={5} />);
  const componentTwo = shallow(<Buttons pages={5} setActive={jest.fn()} currentPage={1} />);

  expect(componentOne).toMatchSnapshot();
  expect(componentTwo).toMatchSnapshot();

  const instance = componentOne.instance();
  instance.incrementPage();
  expect(instance.state.currentPage).toBe(5);

  instance.decrementPage();
  expect(instance.state.currentPage).toBe(5);

  instance.setActive({ target: { value: 2 } });
  expect(instance.state.currentPage).toBe(5);

  componentOne.find('button').at(5).simulate('click');
  expect(instance.state.currentPage).toBe(5);
});
