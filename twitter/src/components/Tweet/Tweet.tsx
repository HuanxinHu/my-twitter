import React from 'react';
import classNames from 'classnames';
import {
  DeleteOutlined,
  MessageOutlined,
  HeartOutlined,
  HeartFilled,
  RetweetOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { ITweet } from 'utils/types/tweet.types';
import { Dropdown, Menu, Modal } from 'antd';
import './Tweet.module.less';
import Avatar from 'components/Avatar';
import { useDispatch } from 'react-redux';
import { tweetTimeParse } from 'utils/util';
import { getTweetsByMe } from 'redux/User/user.actions';
import api from 'api';

interface IProps {
  tweet: ITweet;
  userName: string;
  userId: string;
  avatar?: string;
}

const Tweet: React.FC<IProps> = ({ tweet, userName, userId, avatar }) => {
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

  const menu = (
    <Menu>
      <Menu.Item onClick={handleDelete}>
        <span style={{ color: 'rgb(224, 36, 94)' }}>
          <DeleteOutlined /> Delete
        </span>
      </Menu.Item>
    </Menu>
  );

  const dispatch = useDispatch();
  const isUserLiked = tweet.likes?.includes(userId);

  return (
    <div styleName="tweet">
      <div>
        <Avatar src={avatar} size="small" />{' '}
      </div>

      <div>
        <div>
          <span styleName="user-name">{userName}</span> · <span>{tweetTimeParse(tweet.createdAt)}</span>
          <span style={{ float: 'right' }} styleName="menu-action">
            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
              <DownOutlined />
            </Dropdown>
          </span>
        </div>
        <div styleName="tweet-content">{tweet.content}</div>
        <div styleName="panel">
          <span>
            <MessageOutlined /> {tweet.commentsCount ? tweet.commentsCount : ''}
          </span>
          <span styleName={classNames({ liked: isUserLiked })}>
            {isUserLiked ? <HeartFilled onClick={handleUnlike} /> : <HeartOutlined onClick={handleLike} />}{' '}
            {tweet.likes?.length ? tweet.likes.length : null}
          </span>
          <span>
            <RetweetOutlined />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
