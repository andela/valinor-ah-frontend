import { toastr } from 'react-redux-toastr';

const loginGoogle = (response, callback, failure, socialType) => {
  if (!response.profileObj) {
    toastr.error('There has been an error from the google server. Please try again');
    return failure(['There has been an error from the google server. Please try again']);
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
