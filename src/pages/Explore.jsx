import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useTweets from '../hooks/useTweets';
import TweetItem from '../components/TweetItem';

function Explore({ newTweet, clrNewTweet }) {
  const [tweets, addTweetToDOM, isTweetsLoading] = useTweets('tweets');

  useEffect(() => {
    if (newTweet) {
      addTweetToDOM(newTweet);
      clrNewTweet();
    }

    return () => {};
  }, [newTweet]);

  return (
    <>
      <div>search bar</div>
      <div>
        {isTweetsLoading && <div>loading</div>}
        {tweets &&
          tweets.map((twt) => <TweetItem tweetObj={twt} key={twt.id} />)}
      </div>
    </>
  );
}

Explore.propTypes = {
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
};

export default Explore;
