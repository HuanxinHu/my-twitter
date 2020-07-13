import "./Profile.module.less";
import { CalendarOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import api from "api";
import Page from "components/Page";
import { User } from "utils/types/user.types";

const { TabPane } = Tabs;

const Profile: React.FC = () => {
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
      <div styleName="join-date">
        <CalendarOutlined /> Joined{" "}
        {new Date(user.createdAt).toLocaleDateString()}
      </div>
      <div styleName="brief">
        <span styleName="brief-info">
          <span styleName="number">{user.tweetsCount}</span> Tweets
        </span>
        <span styleName="brief-info">
          <span styleName="number">{user.followers?.length || 0}</span>{" "}
          Followers
        </span>
        <span styleName="brief-info">
          <span styleName="number">{user.following?.length || 0}</span>{" "}
          Following
        </span>
        <Button styleName="edit-profile-btn" shape="round">
          Edit Profile
        </Button>
      </div>
      <Tabs defaultActiveKey="tweets">
        <TabPane tab="Tweets" key="tweets">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Followers" key="followers">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Following" key="following">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </Page>
  );
};

export default Profile;
