import fetchWrap from 'utils/fetch';

const resource = '/v1/comments';

function commentTweetById(id: string, content: string) {
  return fetchWrap({
    method: 'post',
    url: `${resource}/tweet/${id}`,
    data: { content },
  });
}

export default {
  commentTweetById,
};
