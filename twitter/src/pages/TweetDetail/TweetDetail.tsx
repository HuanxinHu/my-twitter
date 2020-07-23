import './TweetDetail.module.less';

import api from 'api';
import Avatar from 'components/Avatar';
import Comment from 'components/Comment';
import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ITweet } from 'utils/types/tweet.types';
import { User } from 'utils/types/user.types';
import { tweetDetailTimeParse } from 'utils/util';
interface IProps {}

const TweetDetail: React.FC<IProps> = (props) => {
  const id = (useParams() as any).id;
  const [tweet, setTweet] = useState({} as ITweet);
  const [usersInfoMap, setUsersInfoMap] = useState(new Map<string, Partial<User>>());

  useEffect(() => {
    api.getTweetById(id).then((res) => {
      setTweet(res.data.data.tweet);
      setUsersInfoMap(generateUsersInfoMap(res.data.data.usersInfo));
    });
  }, [id]);

  function generateUsersInfoMap(usersInfo: Partial<User>[]) {
    const _usersInfoMap = new Map<string, Partial<User>>();
    usersInfo.forEach((item) => {
      _usersInfoMap.set(item.id!, item);
    });
    return _usersInfoMap;
  }

  const tweetAutor = usersInfoMap.get(tweet.createdBy);
  return (
    <Page>
      <div styleName="tweet-author">
        <div>
          <Avatar avatar={tweetAutor?.avatar} size="small" />
        </div>
        <div styleName="name-container">
          <div styleName="name">{tweetAutor?.name}</div>
          <div styleName="username">@{tweetAutor?.username}</div>
        </div>
      </div>
      <div styleName="tweet-content">{tweet.content}</div>
      <div styleName="create-time">
        <span>{tweetDetailTimeParse(tweet.createdAt)}</span>
      </div>
      <div styleName="retweet-like-count">
        <span styleName="like-count">{tweet.likes?.length}</span> Likes
      </div>
      <div>
        {tweet.comments?.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            commentatorInfo={usersInfoMap.get(comment.commentator)}
            tweetAutor={tweetAutor}
          />
        ))}
      </div>
    </Page>
  );
};

export default TweetDetail;
