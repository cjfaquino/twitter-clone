import React, { useEffect } from 'react';
import useTweets from '../hooks/useTweets';
import SearchHeader from '../components/SearchHeader';
import { TweetObj } from '../interfaces/TweetObj';
import ListOfTweets from '../components/ListOfTweets';
import Spinner from '../components/Loaders/Spinner';
import useWindowTitle from '../hooks/useWindowTitle';

interface IProps {
  tweets: TweetObj[];
  setTweets: React.Dispatch<React.SetStateAction<TweetObj[]>>;
}

const Explore = ({ tweets, setTweets }: IProps) => {
  useWindowTitle('Explore');
  const [fetchedTweets, addTweetToDOM, isTweetsLoading] = useTweets('explore');

  useEffect(() => {
    setTweets(fetchedTweets);

    return () => {};
  }, [fetchedTweets]);

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
