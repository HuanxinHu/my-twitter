import './Comment.module.less';

import Avatar from 'components/Avatar';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IComment } from 'utils/types/tweet.types';
import { User } from 'utils/types/user.types';
import { gapTimeParser } from 'utils/util';

interface IProps {
  comment: IComment;
  commentatorInfo: Partial<User> | undefined;
  tweetAutor: Partial<User> | undefined;
}

const Comment: React.FC<IProps> = ({ comment, commentatorInfo, tweetAutor }) => {
  const history = useHistory();

  function redirectToUserProfile() {
    history.push(`/profile/${commentatorInfo?.username}`);
  }
  return (
    <div styleName="comment">
      <div styleName="comment-author">
        <div onClick={redirectToUserProfile}>
          <Avatar avatar={commentatorInfo?.avatar} size="small" />
        </div>
        <div styleName="content-container">
          <span styleName="name" onClick={redirectToUserProfile}>
            {commentatorInfo?.name}
          </span>
          <span styleName="username" onClick={redirectToUserProfile}>
            @{commentatorInfo?.username}
          </span>{' '}
          · <span>{gapTimeParser(comment.createdAt)}</span>
          <div>
            Replying to <Link to={`/profile/${tweetAutor?.username}`}>@{tweetAutor?.username}</Link>
          </div>
          <div styleName="comment-content">{comment.content}</div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
