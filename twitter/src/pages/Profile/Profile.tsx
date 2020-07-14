import './Profile.module.less';
import { CalendarOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import React, { useEffect } from 'react';
import Page from 'components/Page';
import Tweet from 'components/Tweet';
import { useDispatch } from 'react-redux';
import { getTweetsByMe } from 'redux/User/user.actions';
import { useSelector } from 'store';

const { TabPane } = Tabs;

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { tweets = [], followers = [], following = [] } = user;
  useEffect(() => {
    dispatch(getTweetsByMe());
  }, [dispatch]);

  return (
    <Page>
      <div styleName="avatar"></div>
      <div styleName="name">{user.name}</div>
      <div styleName="join-date">
        <CalendarOutlined /> Joined {new Date(user.createdAt).toLocaleDateString()}
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
