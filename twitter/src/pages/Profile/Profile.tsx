import './Profile.module.less';

import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import Avatar from 'components/Avatar';
import Page from 'components/Page';
import Tweet from 'components/Tweet';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserProfile, setEditProfileModalVisible } from 'redux/User/user.actions';
import { useSelector } from 'store';
import { splitPathname } from 'utils/util';

const { TabPane } = Tabs;

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);
  const userProfile = useSelector((state) => state.user.userProfile);
  const { tweets = [], followers = [], following = [] } = userProfile;
  const { isMyProfilePath, paths } = splitPathname();
  const username = isMyProfilePath ? me.username : paths[1];

  useEffect(() => {
    dispatch(getUserProfile(username));
  }, [dispatch, username]);

  return (
    <Page>
      <div styleName="avatar-contaner">
        <Avatar avatar={userProfile.avatar} />
      </div>
      <div styleName="name">{userProfile.name}</div>
      {userProfile.username && <div styleName="username">@{userProfile.username}</div>}
      <div styleName="bio">{userProfile.bio}</div>
      <div styleName="loc-date">
        <span styleName="location">
          <EnvironmentOutlined /> {userProfile.location}
        </span>
        <span>
          <CalendarOutlined /> Joined {userProfile.createdAt ? dayjs(userProfile.createdAt).format('MMMM YYYY') : ''}
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
        {(isMyProfilePath || paths[1] === me.username) && (
          <Button styleName="edit-profile-btn" shape="round" onClick={() => dispatch(setEditProfileModalVisible(true))}>
            Edit profile
          </Button>
        )}
      </div>
      <Tabs defaultActiveKey="tweets" styleName="profile-tabs">
        <TabPane tab="Tweets" key="tweets">
          {tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweet={tweet}
              tweetOwner={{
                name: userProfile.name,
                id: userProfile.id,
                avatar: userProfile.avatar,
                username: userProfile.username,
              }}
            />
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
