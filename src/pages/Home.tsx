import React from 'react';
import { NavLink } from 'react-router-dom';
import Tweet from '../classes/Tweet';
import ListOfTweets from '../components/ListOfTweets';
import Spinner from '../components/Loaders/Spinner';
import TweetForm from '../components/TweetForm';
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

  const addToHome = ({
    id,
    messageImg,
    messageText,
  }: {
    id: string;
    messageImg: string;
    messageText: string;
  }) => {
    const newTweet = {
      id,
      ...new Tweet({ messageText, messageImg }),
    } as TweetObj;
    setTweets((prev) => [newTweet, ...prev]);
  };

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

      <TweetForm
        btnText='Tweet'
        placeholder="Nothing's happening!"
        successCallback={addToHome}
      />
      <section>
        {isTweetsLoading ? (
          <Spinner />
        ) : (
          <ListOfTweets
            tweets={tweets}
            customClass='tweets'
            missingText='Follow some users to start seeing a feed of people you follow'
          />
        )}
      </section>
    </div>
  );
};

export default Home;
