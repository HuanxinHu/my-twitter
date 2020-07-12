import "./Profile.module.less";
import { CalendarOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import api from "api";
import Page from "components/Page";
import { User } from "utils/types/user.types";

interface IProps {}

const Profile: React.FC<IProps> = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({} as User);

  const getMe = () => {
    setLoading(true);
    api
      .getMe()
      .then((res) => setUser(res.data.data))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <Page loading={loading}>
      <div styleName="avatar"></div>
      <div styleName="name">{user.name}</div>
      <div>
        <CalendarOutlined /> Joined{" "}
        {new Date(user.createdAt).toLocaleDateString()}
      </div>
    </Page>
  );
};

export default Profile;
