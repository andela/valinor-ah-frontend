
import iconPicker from '../../src/utils/iconPicker';

test('icon-picker', () => {
  const result = iconPicker('days');
  expect(result).toBe('test-file-stub');
});
