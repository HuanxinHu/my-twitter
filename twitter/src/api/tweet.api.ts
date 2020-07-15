import fetchWrap from 'utils/fetch';

const resource = (userId: string) => `/v1/users/${userId}/tweets`;

function createTweet(userId: string, tweet: { content: string }) {
  return fetchWrap({
    method: 'post',
    url: resource(userId),
    data: tweet,
  });
}

function getTweetsByUserId(userId: string) {
  return fetchWrap({
    url: resource(userId),
  });
}

function deleteTweetById(id: string) {
  return fetchWrap({
    method: 'delete',
    url: `/v1/tweets/${id}`,
  });
}

export default {
  createTweet,
  getTweetsByUserId,
  deleteTweetById,
};
