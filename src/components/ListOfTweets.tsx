import React from 'react';
import { TweetObj } from '../interfaces/TweetObj';
import TweetItem from './TweetItem';

interface IProps {
  tweets: TweetObj[];
  customClass: string;
}
const ListOfTweets = ({ tweets, customClass }: IProps) => (
  <>
    {tweets.map((reply: TweetObj) => (
      <TweetItem key={`${customClass}-${reply.id}`} tweetObj={reply} />
    ))}
  </>
);

export default ListOfTweets;
