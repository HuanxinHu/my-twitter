import { createReducer } from '@reduxjs/toolkit';
import Lockr from 'lockr';
import { User } from 'utils/types/user.types';

import { updateMe, setEditProfileModalVisible, updateUserProfile } from './user.actions';

export interface UserState {
  me: User;
  userProfile: User;
  editProfileModalVisible: boolean;
}

const defaultState: UserState = {
  me: Lockr.get('me') || ({} as User),
  userProfile: {} as User,
  editProfileModalVisible: false,
};

export default createReducer<UserState>(defaultState, {
  [updateMe.type]: (state, action) => {
    const { me } = action.payload;
    state.me = { ...state.me, ...me };
    Lockr.set('me', state.me);
  },
  [setEditProfileModalVisible.type]: (state, action) => {
    state.editProfileModalVisible = action.payload.editProfileModalVisible;
  },
  [updateUserProfile.type]: (state, action) => {
    state.userProfile = action.payload.userProfile;
  },

  // [updateUserTweets.type]: (state, action) => {
  //   const { tweets } = action.payload;
  //   state.user.tweets = tweets;
  //   Lockr.set('user', state.user);
  // },
});
