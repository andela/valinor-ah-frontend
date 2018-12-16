import React from 'react';
import { shallow } from 'enzyme';

import Spinner from '../../../../src/components/common/Spinner';

describe('Signup components snapshot test', () => {
  const firstComponent = shallow(<Spinner isLoading />);
  const secondComponent = shallow(<Spinner isLoading={false} />);
  test('Signup snapshot test', () => {
    expect(firstComponent).toMatchSnapshot();
    expect(secondComponent).toMatchSnapshot();
  });
});
