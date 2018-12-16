import React from 'react';
import { shallow } from 'enzyme';

import { unwrappedComponent as App } from '../../src/App';

test('App snapshot test', () => {
  const component = shallow(<App isLoading={false} />);
  expect(component).toMatchSnapshot();
});
