const getToken = (getUser) => {
  const user = localStorage.getItem('user');
  if (getUser) return user;
  if (user) {
    const { token } = JSON.parse(user);
    return token;
  }
};

export default getToken;
