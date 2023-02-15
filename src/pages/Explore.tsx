import React, { useEffect } from 'react';
import useTweets from '../hooks/useTweets';
import SearchHeader from '../components/SearchHeader';
import { TweetObj } from '../interfaces/TweetObj';
import ListOfTweets from '../components/ListOfTweets';
import Spinner from '../components/Loaders/Spinner';
import useWindowTitle from '../hooks/useWindowTitle';

interface IProps {
  newTweet: TweetObj | null;
  clrNewTweet: Function;
}

const Explore = ({ newTweet, clrNewTweet }: IProps) => {
  useWindowTitle('Explore');
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
          <ListOfTweets tweets={tweets as TweetObj[]} customClass='tweets' />
        )}
      </div>
    </div>
  );
};

export default Explore;
