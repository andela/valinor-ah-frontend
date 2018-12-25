export default (category, searchTerm, limit, page, authors, tags) => {
  const query = [];
  if (searchTerm !== '') {
    query.push(`search=${searchTerm}`);
  }
  query.push(`limit=${limit}`);
  query.push(`page=${page}`);
  if (tags && tags.length > 0) {
    if (tags.length < 2) {
      query.push(`tag=${tags[0]}`);
    } else {
      query.push(`tag=${tags.join(' ')}`);
    }
  }
  if (authors && authors.length > 0) {
    if (authors.length < 2) {
      query.push(`author=${authors[0]}`);
    } else {
      query.push(`author=${authors.join(' ')}`);
    }
  }
  return `${category}?${query.join('&')}`;
};
