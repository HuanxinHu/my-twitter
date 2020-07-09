import { message } from 'antd';
import axios from 'axios';
import { getCookie } from './util';

const fetchWrap = (config = {}) => {
  return axios({
    method: 'get',
    baseURL: 'api',
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
    ...config,
  }).catch((err) => {
    message.error(err.response.data.error);
    throw err;
  });
};

export default fetchWrap;
