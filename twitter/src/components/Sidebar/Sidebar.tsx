import { HomeOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import logo from 'assets/images/logo.png';
import Avatar from 'components/Avatar';
import CommentModal from 'components/CommentModal';
import CreateTweetModal from 'components/CreateTweetModal';
import EditProfileModal from 'components/EditProfileModal';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'store';

import MenuItem from './MenuItem';
import styles from './Sidebar.module.less';

const Sidebar: React.FC = () => {
  const [tweetModalVisible, setTweetModalVisible] = useState(false);
  const commentModalVisible = useSelector((state) => state.comment.commentModalVisible);
  const editProfileModalVisible = useSelector((state) => state.user.editProfileModalVisible);
  const me = useSelector((state) => state.user.me);
  const menu = [
    {
      icon: <HomeOutlined />,
      title: 'Home',
      path: '/',
    },
    {
      icon: <UserOutlined />,
      title: 'Profile',
      path: '/profile',
    },
  ];
  const dropdownMenu = (
    <Menu>
      <Menu.Item styleName="user-menu-item">Logout @{me.username}</Menu.Item>
    </Menu>
  );

  function handleCreateTweet() {
    setTweetModalVisible(true);
  }

  return (
    <div styleName="sidebar">
      <div className={styles['logo']}>
        <img src={logo} alt="logo" />
      </div>
      <Fragment>
        {menu.map((item) => (
          <MenuItem key={item.title} {...item} />
        ))}
      </Fragment>
      <Button type="primary" styleName="twt-btn" shape="round" onClick={handleCreateTweet}>
        Tweet
      </Button>
      <Button
        onClick={handleCreateTweet}
        type="primary"
        styleName="twt-btn-circle"
        shape="circle"
        icon={<PlusOutlined />}
      />

      <div styleName="sidebar-bottom-container">
        <Dropdown overlay={dropdownMenu} trigger={['click']} arrow>
          <div style={{ display: 'flex', cursor: 'pointer' }}>
            <div styleName="avatar">
              <Avatar avatar={me.avatar} size="small" />
            </div>
            <div style={{ marginLeft: 10 }} styleName="username">
              <div styleName="username-name">{me.name}</div>
              {me.username && <div>@{me.username}</div>}
            </div>
          </div>
        </Dropdown>
      </div>

      {tweetModalVisible && (
        <CreateTweetModal
          afterClose={() => {
            setTweetModalVisible(false);
          }}
        />
      )}

      {commentModalVisible && <CommentModal />}

      {editProfileModalVisible && <EditProfileModal />}
    </div>
  );
};

export default Sidebar;
