import { createReducer } from '@reduxjs/toolkit';
import { ITweet } from 'utils/types/tweet.types';

import { updateFeedTweets, updateProfileTweets } from './tweets.actions';

export interface TweetsState {
  profileTweets: ITweet[];
  feedTweets: ITweet[];
}

const defaultState: TweetsState = {
  profileTweets: [],
  feedTweets: [],
};

export default createReducer<TweetsState>(defaultState, {
  [updateProfileTweets.type]: (state, action) => {
    state.profileTweets = action.payload.profileTweets;
  },
  [updateFeedTweets.type]: (state, action) => {
    state.feedTweets = action.payload.feedTweets;
  },
});
