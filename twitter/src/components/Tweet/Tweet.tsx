import {
  DeleteOutlined,
  DownOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Modal } from 'antd';
import api from 'api';
import classNames from 'classnames';
import Avatar from 'components/Avatar';
import React from 'react';
import { useDispatch } from 'react-redux';
import { openCommentModal } from 'redux/Comment/comment.actions';
import { getUserProfile } from 'redux/User/user.actions';
import { useSelector } from 'store';
import { ITweet } from 'utils/types/tweet.types';
import { splitPathname, tweetTimeParse } from 'utils/util';

import styles from './Tweet.module.less';

interface IProps {
  tweet: ITweet;
  tweetOwner: {
    name: string;
    id: string;
    avatar: string;
  };
}

const Tweet: React.FC<IProps> = ({ tweet, tweetOwner }) => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);
  const isMyTweet = me.id === tweetOwner.id;
  const isMeLiked = tweet.likes?.includes(me.id);
  const menu = (
    <Menu>
      <Menu.Item onClick={handleDelete}>
        <span style={{ color: 'rgb(224, 36, 94)' }}>
          <DeleteOutlined /> Delete
        </span>
      </Menu.Item>
    </Menu>
  );

  function makeComment() {
    dispatch(openCommentModal(tweet));
  }

  function panelActionCb() {
    const { paths } = splitPathname();
    if (paths[0] === 'profile') {
      const username = paths[1] ? paths[1] : me.username;
      dispatch(getUserProfile(username));
    }
  }

  function handleDelete() {
    Modal.confirm({
      title: 'Delete Tweet?',
      content:
        'This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results.',
      okText: 'Delete',
      okButtonProps: { shape: 'round', danger: true },
      cancelButtonProps: { shape: 'round' },
      onOk: async () => {
        await api.deleteTweetById(tweet.id);
        panelActionCb();
      },
    });
  }

  function handleUnlike() {
    api.unlikeTweetById(tweet.id).then(() => {
      panelActionCb();
    });
  }

  function handleLike() {
    api.likeTweetById(tweet.id).then(() => {
      panelActionCb();
    });
  }

  return (
    <div className={styles['tweet']}>
      <div>
        <Avatar avatar={tweetOwner.avatar} size="small" />
      </div>

      <div>
        <div>
          <span className={styles['user-name']}>{tweetOwner.name}</span> ·{' '}
          <span>{tweetTimeParse(tweet.createdAt)}</span>
          {isMyTweet && (
            <span style={{ float: 'right' }} className={styles['menu-action']}>
              <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                <DownOutlined />
              </Dropdown>
            </span>
          )}
        </div>
        <div className={styles['tweet-content']}>{tweet.content}</div>
        <div className={styles['panel']}>
          <span>
            <MessageOutlined className={styles['panel-icon']} onClick={makeComment} />
            {tweet.commentsCount ? tweet.commentsCount : ''}
          </span>
          <span styleName={classNames({ liked: isMeLiked })}>
            {isMeLiked ? (
              <HeartFilled className={styles['panel-icon']} onClick={handleUnlike} />
            ) : (
              <HeartOutlined className={styles['panel-icon']} onClick={handleLike} />
            )}
            {tweet.likes?.length ? tweet.likes.length : null}
          </span>
          <span>
            <RetweetOutlined className={styles['panel-icon']} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
