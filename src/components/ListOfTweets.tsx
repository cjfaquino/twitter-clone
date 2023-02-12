import React from 'react';
import { TweetObj } from '../interfaces/TweetObj';
import TweetItem from './TweetItem';

interface IProps {
  tweets: TweetObj[];
  customClass: string;
  missingText?: string;
}

const defaultProps = {
  missingText: "There's nothing here",
};

const ListOfTweets = ({
  tweets,
  customClass,
  missingText,
}: IProps & typeof defaultProps) => (
  <div className='list'>
    {tweets.length !== 0 ? (
      tweets.map((reply: TweetObj) => (
        <TweetItem key={`${customClass}-${reply.id}`} tweetObj={reply} />
      ))
    ) : (
      <div className='missing'>{missingText}</div>
    )}
  </div>
);

ListOfTweets.defaultProps = defaultProps;

export default ListOfTweets;
