import fetchWrap from 'utils/fetch';

const resource = '/v1/auth/login';

function login(userData: { email: string; password: string }) {
  return fetchWrap({
    method: 'post',
    url: resource,
    data: userData,
  });
}

export default {
  login,
};
