import fetchWrap from 'utils/fetch';

const resource = '/v1/auth';

function login(userData: { email: string; password: string }) {
  return fetchWrap({
    method: 'post',
    url: `${resource}/login`,
    data: userData,
  });
}

function register(userData: { name: string; email: string; password: string }) {
  return fetchWrap({
    method: 'post',
    url: `${resource}/register`,
    data: userData,
  });
}

function getMe() {
  return fetchWrap({
    url: `${resource}/me`,
  });
}

export default {
  login,
  register,
  getMe,
};
