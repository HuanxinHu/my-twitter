import './Login.module.less';

import { Button, Checkbox, Form, Input } from 'antd';
import api from 'api';
import logo from 'assets/images/logo.png';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { updateUser } from 'redux/User/user.actions';

const Login: React.FC = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    const { email, password } = values;
    api.login({ email, password }).then((res) => {
      dispatch(updateUser(res.data.user));
      history.push('/');
    });
  };

  return (
    <div styleName="login">
      <div styleName="logo">
        <img src={logo} alt="my-twitter" />
      </div>
      <div styleName="title">Log in to My Twitter</div>
      <Form
        name="basic"
        // initialValues={{ remember: true }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item name="email" rules={[{ required: true, message: 'Please input email!' }]}>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Fragment>
            <Checkbox>Remember me</Checkbox> <Button type="link">Forgot Password?</Button>
          </Fragment>
        </Form.Item>

        <Form.Item>
          <Button type="primary" style={{ width: '100%' }} htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <div>
        Do not have an account?
        <Link styleName="regi-link" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
