
import verifyToken from '../utils/verifyToken';
import { persistor } from '../store/store';

const checkUserStatus = () => {
  const user = localStorage.getItem('user');
  const root = localStorage.getItem('persist:root');
  if (root && !user) {
    const parseRoot = JSON.parse(root);
    const { isLoggedIn } = JSON.parse(parseRoot.global);
    if (isLoggedIn) {
      return persistor.purge();
    }
  }
  if (user) {
    const { token } = JSON.parse(user);
    const verify = verifyToken(token, process.env.JWT_SECRET);
    if (verify.message) {
      persistor.purge();
      return localStorage.clear();
    }
  }
};

export default checkUserStatus;
