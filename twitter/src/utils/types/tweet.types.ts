export interface IComment {
  id: string;
  createdAt: string;
  content: string;
  commentator: string;
}

export interface ITweet {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
  likes: string[];
  comments?: IComment[];
  commentsCount?: number;
}
