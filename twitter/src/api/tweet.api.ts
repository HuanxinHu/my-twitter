import fetchWrap from 'utils/fetch';

const resource = (userId: string) => `/v1/users/${userId}/tweets`;

function createTweet(userId: string, tweet: { content: string }) {
  return fetchWrap({
    method: 'post',
    url: resource(userId),
    data: tweet,
  });
}

export default {
  createTweet,
};
