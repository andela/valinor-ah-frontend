import loginGoogle from '../../../src/utils/loginGoogle';

const rightResponse = {
  profileObj: {
    name: 'chris akanmu',
    email: 'chris@yahoo.com',
    googleId: 'i8364rp9237r',
    imageUrl: 'https://fake.com/'
  }
};

const wrongResponse = {};

// eslint-disable-next-line no-unused-vars
const callback = obj => 'callback';
const failure = () => 'failure';

const rightResult = loginGoogle(rightResponse, callback, failure);
const wrongResult = loginGoogle(wrongResponse, callback, failure);

describe('test result of loginGoogle function', () => {
  it('should return callback and failure', () => {
    expect(rightResult).toBe('callback');
    expect(wrongResult).toBe('failure');
  });
});
