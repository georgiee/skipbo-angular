import { getEnumValuesAndKeys } from './utils';

it('getEnumValuesAndKeys should export keys and values', () => {
  enum TestEnum {
    A = 0,
    B,
    C
  }

  const { keys, values } = getEnumValuesAndKeys(TestEnum);

  expect(keys).toEqual(['A', 'B', 'C']);
  expect(values).toEqual([0, 1, 2]);
});
