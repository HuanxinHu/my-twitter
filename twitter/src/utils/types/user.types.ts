import { ITweet } from './tweet.types';

export interface UserState {
  user: User;
}

export interface User {
  role: string;
  following: [];
  followers: [];
  name: string;
  email: string;
  createdAt: string;
  tweets: ITweet[];
  tweetsCount: number;
  id: string;
}
