import sampleAdder from '../mockdata/sampleAdder';

test('adding 2 to 3 should be equal to 5', () => {
  expect(sampleAdder(2, 3)).toBe(5);
});
