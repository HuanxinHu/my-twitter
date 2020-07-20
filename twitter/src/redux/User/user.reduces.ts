import { createReducer } from '@reduxjs/toolkit';
import Lockr from 'lockr';
import { User } from 'utils/types/user.types';

import { updateUser, updateUserTweets } from './user.actions';

export interface UserState {
  user: User;
}

const defaultState: UserState = {
  user: Lockr.get('user') || ({} as User),
};

export default createReducer<UserState>(defaultState, {
  [updateUser.type]: (state, action) => {
    const { user } = action.payload;
    state.user = { ...state.user, ...user };
    Lockr.set('user', state.user);
  },
  [updateUserTweets.type]: (state, action) => {
    const { tweets } = action.payload;
    state.user.tweets = tweets;
    Lockr.set('user', state.user);
  },
});
