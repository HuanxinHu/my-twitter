import React from "react";
import { ITweet } from "utils/types/tweet.types";
interface IProps {
  tweet: ITweet;
}

const Tweet: React.FC<IProps> = ({ tweet }) => {
  return <div>{tweet.content}</div>;
};

export default Tweet;
