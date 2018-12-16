import jwt from 'jsonwebtoken';

const verifyToken = (token, key) => {
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

export default verifyToken;
