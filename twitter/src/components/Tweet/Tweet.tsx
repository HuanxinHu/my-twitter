import React from 'react';
import { MessageOutlined, HeartOutlined, RetweetOutlined } from '@ant-design/icons';
import { ITweet } from 'utils/types/tweet.types';
import './Tweet.module.less';
import Avatar from 'components/Avatar';
interface IProps {
  tweet: ITweet;
  userName?: string;
  avatar?: string;
}

const Tweet: React.FC<IProps> = ({ tweet, userName, avatar }) => {
  const currentYear = new Date().getFullYear().toString();
  let [month, day, year] = new Date(tweet.createdAt).toLocaleDateString().split('/');
  year = year === currentYear ? '' : year;
  const createDateStr = [month, day, year].filter((item) => item).join('/');

  return (
    <div styleName="tweet">
      <div>
        <Avatar src={avatar} size="small" />{' '}
      </div>

      <div>
        <div>
          {userName} · {createDateStr}
        </div>
        <div styleName="tweet-content">{tweet.content}</div>
        <div styleName="actions">
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
