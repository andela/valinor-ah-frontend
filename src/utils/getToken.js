const getToken = (getUser) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (getUser) return user;
  if (user) {
    const { token } = user;
    return token;
  }
};

export default getToken;
