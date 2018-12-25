export default (information, key) => {
  if (key === 'categoryName') {
    const result = information.map(current => ({ value: current[key], label: current[key] }));
    return [{ value: 'all', label: 'all' }, ...result];
  }
  return information.map(current => ({ value: current.id, label: current[key] }));
};
