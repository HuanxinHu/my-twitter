import { createAction } from '@reduxjs/toolkit';
import api from 'api';
import { AppThunk, RootState } from 'store';

export const updateUser = createAction('user/updateUser', (user) => {
  return {
    payload: { user },
  };
});

export const updateUserTweets = createAction('user/updateUserTweets', (tweets) => {
  return {
    payload: { tweets },
  };
});

export const getTweetsByMe = (): AppThunk => (dispatch, getState: () => RootState) => {
  api.getTweetsByUserId(getState().user.user.id).then((res) => {
    const tweets = res.data.data;
    dispatch(updateUserTweets(tweets));
  });
};
