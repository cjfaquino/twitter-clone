import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useTweets from '../hooks/useTweets';
import TweetItem from '../components/TweetItem';

const Explore = ({ newTweet, clrNewTweet, userProfile }) => {
  const [tweets, addTweetToDOM, isTweetsLoading] = useTweets('tweets');

  useEffect(() => {
    if (newTweet) {
      addTweetToDOM(newTweet);
      clrNewTweet();
    }

    return () => {};
  }, [newTweet]);

  return (
    <div id='explore'>
      <div>search bar</div>
      <div>
        {isTweetsLoading && <div>loading</div>}
        {tweets &&
          tweets.map((twt) => (
            <TweetItem tweetObj={twt} key={twt.id} userProfile={userProfile} />
          ))}
      </div>
    </div>
  );
};

Explore.propTypes = {
  userProfile: PropTypes.shape({}),
  newTweet: PropTypes.shape({
    text: PropTypes.string,
    timestamp: PropTypes.shape({
      toDate: PropTypes.func,
    }),
    USER_ICON: PropTypes.string,
    USER_ID: PropTypes.string,
    USER_NAME: PropTypes.string,
  }),
  clrNewTweet: PropTypes.func.isRequired,
};

Explore.defaultProps = {
  newTweet: null,
  userProfile: null,
};

export default Explore;
