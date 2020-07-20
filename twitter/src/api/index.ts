import auth from './auth.api';
import tweet from './tweet.api';
import user from './user.api';
import comment from './comment.api';

export default {
  ...auth,
  ...tweet,
  ...user,
  ...comment,
};
