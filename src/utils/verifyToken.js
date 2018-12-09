import jwt from 'jsonwebtoken';

export const userData = localStorage.getItem('user');
const privateKey = process.env.JWT_SECRET;

export const verifyToken = (token, key = privateKey) => {
  const decoded = jwt.verify(
    token,
    key,
    (err, info) => {
      if (err) return err;
      return info;
    }
  );
  return decoded;
};

export const isUserLoggedIn = (data = userData, key = privateKey) => {
  if (!data) return 0;
  if (data) {
    const decoded = verifyToken(JSON.parse(data).user.token, key);
    if (decoded.message) return 0;
    if (!decoded.message) return 1;
  }
};
