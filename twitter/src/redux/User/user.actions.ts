import { createAction } from '@reduxjs/toolkit';
import api from 'api';
import { AppThunk } from 'store';

export const updateMe = createAction('user/updateMe', (me) => {
  return {
    payload: { me },
  };
});

export const updateUserTweets = createAction('user/updateUserTweets', (tweets) => {
  return {
    payload: { tweets },
  };
});

export const setEditProfileModalVisible = createAction('user/setEditProfileModalVisible', (editProfileModalVisible) => {
  return {
    payload: { editProfileModalVisible },
  };
});

export const updateUserProfile = createAction('user/updateUserProfile', (userProfile) => {
  return {
    payload: { userProfile },
  };
});

export const getUserProfile = (username: string): AppThunk => (dispatch) => {
  api.getUserProfile(username).then((res) => {
    dispatch(updateUserProfile(res.data.data));
  });
};
