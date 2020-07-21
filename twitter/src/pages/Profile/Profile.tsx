import './Profile.module.less';

import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import Avatar from 'components/Avatar';
import EditProfileModal from 'components/EditProfileModal';
import Page from 'components/Page';
import Tweet from 'components/Tweet';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTweetsByMe } from 'redux/User/user.actions';
import { useSelector } from 'store';

const { TabPane } = Tabs;

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { tweets = [], followers = [], following = [] } = user;

  useEffect(() => {
    dispatch(getTweetsByMe());
  }, [dispatch]);

  return (
    <Page>
      <div styleName="avatar-contaner">
        <Avatar avatar={user.avatar} />
      </div>
      <div styleName="name">{user.name}</div>
      <div styleName="bio">{user.bio}</div>
      <div styleName="loc-date">
        <span styleName="location">
          <EnvironmentOutlined /> {user.location}
        </span>
        <span>
          <CalendarOutlined /> Joined {new Date(user.createdAt).toLocaleDateString()}
        </span>
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
        <Button styleName="edit-profile-btn" shape="round" onClick={() => setEditModalVisible(true)}>
          Edit profile
        </Button>
      </div>
      <Tabs defaultActiveKey="tweets" styleName="profile-tabs">
        <TabPane tab="Tweets" key="tweets">
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} userName={user.name} userId={user.id} avatar={user.avatar} />
          ))}
        </TabPane>
        <TabPane tab="Followers" key="followers">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Following" key="following">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      {editModalVisible && <EditProfileModal afterClose={() => setEditModalVisible(false)} />}
    </Page>
  );
};

export default Profile;
