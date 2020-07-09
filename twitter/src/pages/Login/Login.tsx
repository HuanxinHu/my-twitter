import React, { Fragment } from "react";
import "./Login.module.less";
import { Form, Input, Button, Checkbox } from "antd";
import logo from "assets/images/logo.png";
import { withRouter, RouteComponentProps } from "react-router-dom";
import api from "api";

export interface IProps extends RouteComponentProps {}

const Login: React.FC<IProps> = (props) => {
  const onFinish = (values: any) => {
    const { email, password } = values;
    api.login({ email, password }).then((res) => {
      props.history.push("/");
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
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Fragment>
            <Checkbox>Remember me</Checkbox>{" "}
            <Button type="link">Forgot Password?</Button>
          </Fragment>
        </Form.Item>

        <Form.Item>
          <Button type="primary" style={{ width: "100%" }} htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(Login);
