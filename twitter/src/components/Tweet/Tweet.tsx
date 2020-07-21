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
import { getTweetsByMe } from 'redux/User/user.actions';
import { ITweet } from 'utils/types/tweet.types';
import { tweetTimeParse } from 'utils/util';

import styles from './Tweet.module.less';

interface IProps {
  tweet: ITweet;
  userName: string;
  userId: string;
  avatar?: string;
}

const Tweet: React.FC<IProps> = ({ tweet, userName, userId, avatar }) => {
  const dispatch = useDispatch();
  const isUserLiked = tweet.likes?.includes(userId);
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
        dispatch(getTweetsByMe());
      },
    });
  }

  function handleUnlike() {
    api.unlikeTweetById(tweet.id).then(() => {
      dispatch(getTweetsByMe());
    });
  }

  function handleLike() {
    api.likeTweetById(tweet.id).then(() => {
      dispatch(getTweetsByMe());
    });
  }

  return (
    <div className={styles['tweet']}>
      <div>
        <Avatar avatar={avatar} size="small" />{' '}
      </div>

      <div>
        <div>
          <span className={styles['user-name']}>{userName}</span> · <span>{tweetTimeParse(tweet.createdAt)}</span>
          <span style={{ float: 'right' }} className={styles['menu-action']}>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
              <DownOutlined />
            </Dropdown>
          </span>
        </div>
        <div className={styles['tweet-content']}>{tweet.content}</div>
        <div className={styles['panel']}>
          <span>
            <MessageOutlined className={styles['panel-icon']} onClick={makeComment} />
            {tweet.commentsCount ? tweet.commentsCount : ''}
          </span>
          <span styleName={classNames({ liked: isUserLiked })}>
            {isUserLiked ? (
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
