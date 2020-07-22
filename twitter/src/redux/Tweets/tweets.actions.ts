import { createAction } from '@reduxjs/toolkit';

export const updateProfileTweets = createAction('tweets/updateProfileTweets', (profileTweets) => {
  return {
    payload: { profileTweets },
  };
});

export const updateFeedTweets = createAction('tweets/updateFeedTweets', (feedTweets) => {
  return {
    payload: { feedTweets },
  };
});
