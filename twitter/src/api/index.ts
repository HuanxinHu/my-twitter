import auth from './auth.api';
import comment from './comment.api';
import tweet from './tweet.api';
import user from './user.api';

export default {
  ...auth,
  ...tweet,
  ...user,
  ...comment,
};
