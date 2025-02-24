import './Register.module.less';

import { Button, Form, Input } from 'antd';
import api from 'api';
import logo from 'assets/images/logo.png';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Register: React.FC = (props) => {
  const history = useHistory();

  const onFinish = (values: any) => {
    const { email, password, name } = values;
    api.register({ email, password, name }).then((res) => {
      history.push('/');
    });
  };

  return (
    <div styleName="register">
      <div styleName="logo">
        <img src={logo} alt="my-twitter" />
      </div>
      <div styleName="title">Register to My Twitter</div>
      <Form name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" rules={[{ required: true, message: 'Please input your user name!' }]}>
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            { required: true, message: 'Please input email!' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password placeholder="Comfirm Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" style={{ width: '100%' }} htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      <div>
        Have an account?
        <Link styleName="login-link" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
