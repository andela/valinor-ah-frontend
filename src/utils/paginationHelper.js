const paginationHelper = (pages, currentPage) => {
  const limit = 7;
  if (currentPage > pages) {
    return 'error';
  }
  const result = [];
  if (pages < limit) {
    for (let x = 1; x <= pages; x += 1) {
      result.push(x);
    }
  } else if (currentPage === 1) {
    for (let x = 1; x < 6; x += 1) {
      if (x === 5) {
        result.push('...');
      } else {
        result.push(x);
      }
    }
    result.push(pages);
  } else if (currentPage === pages) {
    result.push(1);
    for (let x = currentPage - 4; x <= currentPage; x += 1) {
      if (x === currentPage - 4) {
        result.push('...');
      } else {
        result.push(x);
      }
    }
  } else if (currentPage + 3 < pages) {
    for (let x = currentPage - 1; x <= currentPage + 3; x += 1) {
      if (x === currentPage + 3) {
        result.push('...');
      } else {
        result.push(x);
      }
    }
    result.push(pages);
  } else {
    result.push(1);
    for (let x = currentPage - 4; x <= currentPage; x += 1) {
      if (x === currentPage - 4) {
        result.push('...');
      } else {
        result.push(x + 1);
      }
    }
  }
  return result;
};

export default paginationHelper;
