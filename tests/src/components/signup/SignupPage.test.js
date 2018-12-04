import React from 'react';
import { shallow } from 'enzyme';

import SignUpPage from '../../../../src/components/signup/SignUpPage';
import Button from '../../../../src/components/signup/Button';
import Form from '../../../../src/components/signup/Form';
import Section from '../../../../src/components/signup/Section';
import SocialButton from '../../../../src/components/signup/SocialButton';


describe('Signup components snapshot test', () => {
  test('Signup snapshot test', () => {
    const component = shallow(<SignUpPage />);
    expect(component).toMatchSnapshot();
  });
  test('Button snapshot test', () => {
    const component = shallow(<Button text="Signup" btnClass="btn" />);
    expect(component).toMatchSnapshot();
  });
  test('Form snapshot test', () => {
    const component = shallow(<Form />);
    expect(component).toMatchSnapshot();
  });
  test('Section snapshot test', () => {
    const component = shallow(<Section />);
    expect(component).toMatchSnapshot();
  });
  test('SocialButton snapshot test', () => {
    const component = shallow(<SocialButton text="Login with google" btnClass="btn-google" faClass="fab fa-google" />);
    expect(component).toMatchSnapshot();
  });
});
