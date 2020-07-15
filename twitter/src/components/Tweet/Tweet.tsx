import React from 'react';
import { DeleteOutlined, MessageOutlined, HeartOutlined, RetweetOutlined, DownOutlined } from '@ant-design/icons';
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
  userName?: string;
  avatar?: string;
}

const Tweet: React.FC<IProps> = ({ tweet, userName, avatar }) => {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear().toString();
  let [month, day, year] = new Date(tweet.createdAt).toLocaleDateString().split('/');
  year = year === currentYear ? '' : year;
  const createDateStr = [month, day, year].filter((item) => item).join('/');
  const menu = (
    <Menu>
      <Menu.Item onClick={handleDelete}>
        <span style={{ color: 'rgb(224, 36, 94)' }}>
          <DeleteOutlined /> Delete
        </span>
      </Menu.Item>
    </Menu>
  );

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

  return (
    <div styleName="tweet">
      <div>
        <Avatar src={avatar} size="small" />{' '}
      </div>

      <div>
        <div>
          <span>
            {userName} · {tweetTimeParse(tweet.createdAt)}
          </span>
          <span style={{ float: 'right' }} styleName="menu-action">
            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
              <DownOutlined />
            </Dropdown>
          </span>
        </div>
        <div styleName="tweet-content">{tweet.content}</div>
        <div styleName="panel">
          <span>
            <MessageOutlined />
          </span>
          <span>
            <HeartOutlined />
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
