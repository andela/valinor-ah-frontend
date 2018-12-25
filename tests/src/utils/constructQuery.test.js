import constructQuery from '../../../src/utils/constructQuery';

let currentLimit;
let currentPage;
let currentCategory;
let currentAuthors;
let currentTags;
let currentSearchTerm;

describe('TEST constructQuery() function', () => {
  currentLimit = 10;
  currentPage = 1;
  currentCategory = 'fashion';
  currentAuthors = [1, 2];
  currentTags = [3, 4];
  currentSearchTerm = 'jsndlansdlja';
  it('should return a full, well-formed query', () => {
    const result = constructQuery(
      currentCategory,
      currentSearchTerm,
      currentLimit,
      currentPage,
      currentAuthors,
      currentTags
    );
    expect(result).toBe('fashion?search=jsndlansdlja&limit=10&page=1&tag=3 4&author=1 2');
  });
  it('should return a full, well-formed query', () => {
    currentLimit = 10;
    currentPage = 1;
    currentCategory = 'fashion';
    currentAuthors = [1];
    currentTags = [3];
    currentSearchTerm = 'jsndlansdlja';
    const result = constructQuery(
      currentCategory,
      currentSearchTerm,
      currentLimit,
      currentPage,
      currentAuthors,
      currentTags
    );
    expect(result).toBe('fashion?search=jsndlansdlja&limit=10&page=1&tag=3&author=1');
  });
  it('should return a full, well-formed query', () => {
    currentLimit = 10;
    currentPage = 1;
    currentCategory = 'fashion';
    currentSearchTerm = '';
    const result = constructQuery(
      currentCategory,
      currentSearchTerm,
      currentLimit,
      currentPage,
    );
    expect(result).toBe('fashion?limit=10&page=1');
  });
});
