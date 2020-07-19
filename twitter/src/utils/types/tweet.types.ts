export interface IComment {
  createdAt: string;
  comment: string;
  commentator: string;
}

export interface ITweet {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
  likes: string[];
  comments: IComment[];
}
