import { Modal, message } from 'antd';
import axios from 'axios';

const fetchWrap = (config = {}) => {
  return axios({
    method: 'get',
    baseURL: 'api',
    // headers: {
    //   Authorization: `Bearer ${getCookie('token')}`,
    // },
    withCredentials: true, // this option will include cookie
    ...config,
  }).catch((err) => {
    message.error(err.response.data.error);
    console.log(err.response.status);
    if (err.response.status === 401) {
      handle401();
    }
    throw err;
  });
};

const handle401 = (() => {
  let modalOpened = false;
  return () => {
    if (!modalOpened) {
      Modal.error({
        title: 'Token Expire, Please login again!',
        onOk: () => {
          window.location.href = '/login';
        },
      });
    }
  };
})();
export default fetchWrap;
