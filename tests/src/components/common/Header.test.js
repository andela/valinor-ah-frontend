import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from '../../../../src/components/common/Header';

test('Header snapshot test', () => {
  const component = renderer.create(<Router><Header /></Router>);
  const tree = component.toJSON();
  // eslint-disable-next-line no-undef
  expect(tree).toMatchSnapshot();
});
