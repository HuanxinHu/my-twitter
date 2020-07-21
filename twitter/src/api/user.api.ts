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

function uploadUserAvatar(userId: string, file: any) {
  return fetchWrap({
    method: 'put',
    url: `${resource}/${userId}/avatar`,
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export default {
  updateUserById,
  uploadUserAvatar,
};
