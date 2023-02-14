import React from 'react';
import useDelay from '../hooks/useDelay';
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
}: IProps & typeof defaultProps) => {
  const empty = useDelay(500, tweets.length === 0, tweets);

  return (
    <div className='list'>
      {empty ? (
        <div className='missing'>{missingText}</div>
      ) : (
        tweets.map((reply: TweetObj) => (
          <TweetItem key={`${customClass}-${reply.id}`} tweetObj={reply} />
        ))
      )}
    </div>
  );
};

ListOfTweets.defaultProps = defaultProps;

export default ListOfTweets;
