import jwt from 'jsonwebtoken';
import verifyToken from '../../../src/utils/verifyToken';

test('verify token', () => {
  const token = jwt.sign({ id: 1 }, 'shhhhhhh');
  const firstResult = verifyToken(token, 'shhhhhhh');
  const secondResult = verifyToken(token, 'shhhhhh');
  expect(firstResult.id).toBe(1);
  expect(secondResult.message).toBe('invalid signature');
});
