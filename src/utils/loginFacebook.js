import { toastr } from 'react-redux-toastr';

const loginFacebook = (response, handleLogin, failure) => {
  if (!response.id) {
    toastr.error('There has been an error from the facebook server. Please try again');
    return failure(['There has been an error from the facebook server. Please try again']);
  }
  const facebookName = response.name.toString().split(' ');
  if (facebookName.length > 2) facebookName.pop();
  const fullName = facebookName.join(' ');
  const userObject = {
    fullName,
    email: response.email,
    socialType: 'facebook',
    socialId: response.userID,
    avatarUrl: response.picture.data.url
  };
  return handleLogin(userObject);
};

export default loginFacebook;
