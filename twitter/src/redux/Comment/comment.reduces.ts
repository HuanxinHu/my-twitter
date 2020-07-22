import { createReducer } from '@reduxjs/toolkit';
import { ITweet } from 'utils/types/tweet.types';

import { setCommentForTweet, setCommentModalVisible } from './comment.actions';

export interface CommentState {
  commentModalVisible: boolean;
  commentForTweet: ITweet;
}

const defaultState: CommentState = {
  commentModalVisible: false,
  commentForTweet: {} as ITweet,
};

export default createReducer<CommentState>(defaultState, {
  [setCommentModalVisible.type]: (state, action) => {
    state.commentModalVisible = action.payload.commentModalVisible;
  },
  [setCommentForTweet.type]: (state, action) => {
    state.commentForTweet = action.payload.commentForTweet;
  },
});
