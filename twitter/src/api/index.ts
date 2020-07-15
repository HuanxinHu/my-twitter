import auth from './auth.api';
import tweet from './tweet.api';
import user from './user.api';

export default {
  ...auth,
  ...tweet,
  ...user,
};
