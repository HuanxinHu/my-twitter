import "./Profile.module.less";
import { CalendarOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import api from "api";
import Page from "components/Page";
import Tweet from "components/Tweet";
import { User } from "utils/types/user.types";

const { TabPane } = Tabs;

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({} as User);
  const { tweets = [], followers = [], following = [] } = user;
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
          <span styleName="number">{tweets.length}</span> Tweets
        </span>
        <span styleName="brief-info">
          <span styleName="number">{followers.length}</span> Followers
        </span>
        <span styleName="brief-info">
          <span styleName="number">{following.length}</span> Following
        </span>
        <Button styleName="edit-profile-btn" shape="round">
          Edit Profile
        </Button>
      </div>
      <Tabs defaultActiveKey="tweets">
        <TabPane tab="Tweets" key="tweets">
          {tweets.map((tweet) => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
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
