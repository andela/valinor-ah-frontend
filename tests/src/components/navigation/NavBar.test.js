import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import NavBar from '../../../../src/components/navigation/NavBar';

test('NavBar snapshot test', () => {
  const component = renderer.create(<Router><NavBar /></Router>);
  const tree = component.toJSON();
  // eslint-disable-next-line no-undef
  expect(tree).toMatchSnapshot();
});
