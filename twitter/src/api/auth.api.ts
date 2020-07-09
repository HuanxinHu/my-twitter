import fetchWrap from 'utils/fetch';

const resource = '/v1/auth';

function login(userData: { email: string; password: string }) {
  return fetchWrap({
    method: 'post',
    url: `${resource}/login`,
    data: userData,
  });
}

function register(userData: { email: string; password: string }) {
  return fetchWrap({
    method: 'post',
    url: `${resource}/register`,
    data: userData,
  });
}

export default {
  login,
  register,
};
