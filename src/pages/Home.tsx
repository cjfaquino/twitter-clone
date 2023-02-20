import React from 'react';
import { NavLink } from 'react-router-dom';
import ListOfTweets from '../components/ListOfTweets';
import Spinner from '../components/Loaders/Spinner';
import useStoreTweets from '../hooks/useStoreTweets';
import useTweets from '../hooks/useTweets';
import useWindowTitle from '../hooks/useWindowTitle';
import { TweetObj } from '../interfaces/TweetObj';
import getUserUid from '../utils/user/getUserUid';
import isUserSignedIn from '../utils/user/isUserSignedIn';

interface IProps {
  tweets: TweetObj[];
  setTweets: React.Dispatch<React.SetStateAction<TweetObj[]>>;
}

const Home = ({ tweets, setTweets }: IProps) => {
  useWindowTitle('Home');
  const [fetchedTweets, isTweetsLoading] = useTweets('home', getUserUid());
  useStoreTweets(fetchedTweets, setTweets);

  return (
    <div id='home'>
      <header>
        <h2>Home</h2>
        <div className='filter-buttons-container'>
          {isUserSignedIn() && (
            <NavLink to='/home' className='styled-filter-link'>
              <span>Following</span>
            </NavLink>
          )}
        </div>
      </header>

      <div>
        {isTweetsLoading ? (
          <Spinner />
        ) : (
          <ListOfTweets
            tweets={tweets}
            customClass='tweets'
            missingText='Follow some users to start seeing a feed of people you follow'
          />
        )}
      </div>
    </div>
  );
};

export default Home;
