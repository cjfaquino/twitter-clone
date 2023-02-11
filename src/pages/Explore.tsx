import React, { useEffect } from 'react';
import useTweets from '../hooks/useTweets';
import SearchHeader from '../components/SearchHeader';
import { TweetObj } from '../interfaces/TweetObj';
import ListOfTweets from '../components/ListOfTweets';
import Spinner from '../components/Spinner';

interface IProps {
  newTweet: TweetObj;
  clrNewTweet: Function;
}

const Explore = ({ newTweet, clrNewTweet }: IProps) => {
  const [tweets, addTweetToDOM, isTweetsLoading] = useTweets('explore');

  useEffect(() => {
    if (newTweet) {
      addTweetToDOM(newTweet);
      clrNewTweet();
    }

    return () => {};
  }, [newTweet]);

  return (
    <div id='explore'>
      <SearchHeader />
      <div>
        {isTweetsLoading ? (
          <Spinner />
        ) : (
          <ListOfTweets tweets={tweets} customClass='tweets' />
        )}
      </div>
    </div>
  );
};

export default Explore;
