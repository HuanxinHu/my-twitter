import fetchWrap from 'utils/fetch';
import { User } from 'utils/types/user.types';

const resource = '/v1/users';

function updateUserById(userId: string, userData: Partial<User>) {
  return fetchWrap({
    method: 'post',
    url: `${resource}/${userId}`,
    data: userData,
  });
}

export default {
  updateUserById,
};
