import { createAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'store';
import api from 'api';

export const updateUser = createAction('user/updateUser', (user) => {
  return {
    payload: { user },
  };
});

export const updateUserTweets = createAction('user/updateUser', (tweets) => {
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
