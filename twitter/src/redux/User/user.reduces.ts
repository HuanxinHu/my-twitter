import { createReducer } from '@reduxjs/toolkit';

import { updateUser } from './user.actions';
import Lockr from 'lockr';
import { User, UserState } from 'utils/types/user.types';

const defaultState: UserState = {
  user: Lockr.get('user') || ({} as User),
};

export default createReducer<UserState>(defaultState, {
  [updateUser.type]: (state, action) => {
    const { user } = action.payload;
    state.user = user;
    Lockr.set('user', user);
  },
});
