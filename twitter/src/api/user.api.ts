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

function uploadUserAvatar(userId: string, files: FormData) {
  return fetchWrap({
    method: 'put',
    url: `${resource}/${userId}/avatar`,
    data: files,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function getUserProfile(userId: string) {
  return fetchWrap({
    url: `${resource}/${userId}/profile`,
  });
}

export default {
  updateUserById,
  uploadUserAvatar,
  getUserProfile,
};
