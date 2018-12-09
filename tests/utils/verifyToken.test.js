import jwt from 'jsonwebtoken';
import { verifyToken, isUserLoggedIn } from '../../src/utils/verifyToken';

test('testing verifyToken pure function', () => {
  const createToken = () => jwt.sign({ id: 1 }, 'donkey');
  expect(verifyToken(createToken(), 'donkey').id).toBe(1);
});
test('testing isloggedIn function', () => {
  expect(isUserLoggedIn('')).toBe(0);
  expect(isUserLoggedIn(JSON.stringify({
    user: {
      token: 'ererewrer-rerer-ererererer'
    }
  }))).toBe(0);
});

test('testing logging function', () => {
  const createToken = () => jwt.sign({ id: 1 }, 'donkey');
  expect(isUserLoggedIn(JSON.stringify({
    user: {
      token: createToken()
    }
  }), 'donkey')).toBe(1);
});
