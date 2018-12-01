import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from '../../../../src/components/home/HomePage';

test('Home snapshot test', () => {
  const component = renderer.create(<Router><Home /></Router>);
  const tree = component.toJSON();
  // eslint-disable-next-line no-undef
  expect(tree).toMatchSnapshot();
});
