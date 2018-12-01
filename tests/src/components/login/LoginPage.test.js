import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import Login from '../../../../src/components/login/LoginPage';

test('Login snapshot test', () => {
  const component = renderer.create(<Router><Login /></Router>);
  const tree = component.toJSON();
  // eslint-disable-next-line no-undef
  expect(tree).toMatchSnapshot();
});
