import getToken from '../../../src/utils/getToken';

test('no user object found', () => {
  const token = getToken();
  expect(token).toBe(undefined);
});
