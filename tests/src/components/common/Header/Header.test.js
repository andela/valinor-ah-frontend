import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import DefaultHeader, { Header } from '../../../../../src/components/common/header/Header';

test('Header snapshot test', () => {
  const component = shallow(<Router><DefaultHeader /></Router>);
  expect(component).toMatchSnapshot();
});

test('Header snapshot test', () => {
  const component = shallow(<Header history={{ push: jest.fn() }} />);
  expect(component).toMatchSnapshot();
  const instance = component.instance();
  instance.handleSearchSubmit({ target: { searchInput: { value: 'jalit' } }, preventDefault: jest.fn() });
});
