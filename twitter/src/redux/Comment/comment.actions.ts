import { createAction } from '@reduxjs/toolkit';
import { AppThunk } from 'store';

export const setCommentForTweet = createAction('comment/commentForTweet', (commentForTweet) => {
  return {
    payload: { commentForTweet },
  };
});

export const setCommentModalVisible = createAction('comment/setCommentModalVisible', (commentModalVisible) => {
  return {
    payload: { commentModalVisible },
  };
});

export const openCommentModal = (commentForTweet: any): AppThunk => (dispatch) => {
  dispatch(setCommentForTweet(commentForTweet));
  dispatch(setCommentModalVisible(true));
};
