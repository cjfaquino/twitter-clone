import React from 'react';
import { TweetObj } from '../interfaces/TweetObj';
import TweetItem from './TweetItem';

interface IProps {
  tweets: TweetObj[];
  customClass: string;
}
const ListOfTweets = ({ tweets, customClass }: IProps) => (
  <div className='list'>
    {tweets.map((reply: TweetObj) => (
      <TweetItem key={`${customClass}-${reply.id}`} tweetObj={reply} />
    ))}
  </div>
);

export default ListOfTweets;
