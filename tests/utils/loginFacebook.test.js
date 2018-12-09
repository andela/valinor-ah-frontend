import loginFacebook from '../../src/utils/loginFacebook';

const validResponse = {
  id: 342343423423,
  name: 'fishes and donkeys',
  email: 'fishes@donkey.com'
};

const fakeResponse = {
  donkey: undefined
};

const successCallback = jest.fn();
const failureCallback = jest.fn();

loginFacebook(validResponse, successCallback, failureCallback);

test('expect loginFacebook to call successCallback upon valid response', () => {
  expect(successCallback).toHaveBeenCalled();
});

test('expect loginFacebook to call failureCallback upon invalid response', () => {
  loginFacebook(fakeResponse, successCallback, failureCallback);
  expect(failureCallback).toHaveBeenCalled();
});
