import React, { useLayoutEffect, useState } from 'react';
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
  const [empty, setEmpty] = useState(false);

  useLayoutEffect(() => {
    let timer: NodeJS.Timeout;
    if (tweets.length === 0) {
      timer = setTimeout(() => {
        setEmpty(true);
      }, 500);
    }
    return () => {
      clearInterval(timer);
      setEmpty(false);
    };
  }, [tweets]);

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
