import paginationHelper from '../../../src/utils/paginationHelper';

describe('TEST PAGINATION HELPER FUNCTION', () => {
  it('should return expected results', () => {
    const resultOne = paginationHelper(20, 16);
    const resultTwo = paginationHelper(16, 1);
    const resultThree = paginationHelper(20, 18);
    const resultTFour = paginationHelper(20, 20);
    const resultTFive = paginationHelper(6, 1);
    const resultSix = paginationHelper(6, 8);
    expect(resultOne).toEqual([15, 16, 17, 18, '...', 20]);
    expect(resultTwo).toEqual([1, 2, 3, 4, '...', 16]);
    expect(resultThree).toEqual([1, '...', 16, 17, 18, 19]);
    expect(resultTFour).toEqual([1, '...', 17, 18, 19, 20]);
    expect(resultTFive).toEqual([1, 2, 3, 4, 5, 6]);
    expect(resultSix).toEqual('error');
  });
});
