const loginGoogle = (response, callback, failure, socialType) => {
  if (!response.profileObj) {
    return failure();
  }
  const {
    name,
    email,
    googleId,
    imageUrl
  } = response.profileObj;
  const userObject = {
    fullName: name,
    email,
    socialType,
    socialId: googleId,
    avatarUrl: imageUrl
  };
  return callback(userObject);
};

export default loginGoogle;
