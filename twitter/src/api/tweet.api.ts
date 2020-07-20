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

function likeTweetById(id: string) {
  return fetchWrap({
    method: 'post',
    url: `/v1/tweets/like/${id}`,
  });
}

function unlikeTweetById(id: string) {
  return fetchWrap({
    method: 'post',
    url: `/v1/tweets/unlike/${id}`,
  });
}

function commentTweetById(id: string, comment: string) {
  return fetchWrap({
    method: 'post',
    url: `/v1/tweets/unlike/${id}`,
    data: { comment },
  });
}

export default {
  createTweet,
  getTweetsByUserId,
  deleteTweetById,
  likeTweetById,
  unlikeTweetById,
  commentTweetById,
};
