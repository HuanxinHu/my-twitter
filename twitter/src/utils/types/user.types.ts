import { ITweet } from './tweet.types';

export interface User {
  username: string;
  name: string;
  avatar: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  role: string;
  following: [];
  followers: [];
  createdAt: string;
  tweets: ITweet[];
  tweetsCount: number;
  id: string;
}
