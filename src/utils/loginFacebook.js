const loginFacebook = (response, retrieveUserFacebookData, triggerFacebookAuthFailure) => {
  switch (true) {
    case (!response.id):
      triggerFacebookAuthFailure();
      break;
    case (!!response.id):
      retrieveUserFacebookData(response);
      break;
    default:
  }
};

export default loginFacebook;
