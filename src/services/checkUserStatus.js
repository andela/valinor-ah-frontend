
import verifyToken from '../utils/verifyToken';
import { persistor } from '../store/store';
import getToken from '../utils/getToken';

const checkUserStatus = () => {
  const user = getToken(true);
  const root = localStorage.getItem('persist:root');
  if (root && !user) {
    const parseRoot = JSON.parse(root);
    const { isLoggedIn } = JSON.parse(parseRoot.global);
    if (isLoggedIn) {
      return persistor.purge();
    }
  }
  if (user) {
    const { token } = user;
    const verify = verifyToken(token, process.env.JWT_SECRET);
    if (verify.message) {
      persistor.purge();
      return localStorage.clear();
    }
  }
};

export default checkUserStatus;
