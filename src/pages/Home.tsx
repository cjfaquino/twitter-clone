import React from 'react';
import { NavLink } from 'react-router-dom';
import ListOfTweets from '../components/ListOfTweets';
import Spinner from '../components/Loaders/Spinner';
import useFollowsList from '../hooks/useFollowsList';
import useTweets from '../hooks/useTweets';
import findDuplicatesByField from '../utils/findDuplicatesByField';
import getUserUid from '../utils/getUserUid';
import isUserSignedIn from '../utils/isUserSignedIn';

const Home = () => {
  const [tweets, , isTweetsLoading] = useTweets('explore');
  const [followedUsers] = useFollowsList('following', getUserUid());
  const filtered = findDuplicatesByField(
    tweets,
    followedUsers,
    'USER_ID',
    'id'
  );

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
            tweets={filtered}
            customClass='tweets'
            missingText='Follow some users to start seeing a feed of people you follow'
          />
        )}
      </div>
    </div>
  );
};

export default Home;
