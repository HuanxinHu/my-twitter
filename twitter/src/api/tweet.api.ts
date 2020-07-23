import fetchWrap from 'utils/fetch';

const resource = (userId: string) => `/v1/users/${userId}/tweets`;
const tweetResource = '/v1/tweets';

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

function getTweetById(id: string) {
  return fetchWrap({
    url: `${tweetResource}/${id}`,
  });
}

function deleteTweetById(id: string) {
  return fetchWrap({
    method: 'delete',
    url: `${tweetResource}/${id}`,
  });
}

function likeTweetById(id: string) {
  return fetchWrap({
    method: 'post',
    url: `${tweetResource}/like/${id}`,
  });
}

function unlikeTweetById(id: string) {
  return fetchWrap({
    method: 'post',
    url: `${tweetResource}/unlike/${id}`,
  });
}

function commentTweetById(id: string, comment: string) {
  return fetchWrap({
    method: 'post',
    url: `${tweetResource}/unlike/${id}`,
    data: { comment },
  });
}

export default {
  createTweet,
  getTweetById,
  getTweetsByUserId,
  deleteTweetById,
  likeTweetById,
  unlikeTweetById,
  commentTweetById,
};
