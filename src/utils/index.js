export const formatDate = (date) => {
  const day = date.slice(8, 10);
  const monthNumber = date.slice(5, 7);
  let month;
  if (monthNumber[0] === '0') {
    month = monthNumber[1] - 1;
  } else {
    month = monthNumber - 1;
  }
  const year = date.slice(0, 4);
  const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const newMonth = monthArray[month];
  const newDate = `${day} ${newMonth} ${year}`;
  return newDate;
};

export const formatReadTime = timeInMs => (`${Math.round(timeInMs / 60000)} min read`);
