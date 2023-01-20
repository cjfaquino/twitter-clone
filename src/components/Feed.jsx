import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useTweets from '../utils/useTweets';
import TweetItem from './TweetItem';

function Feed({ newTweet, clrNewTweet }) {
  const [tweets, addTweetToDOM, isTweetsLoading] = useTweets();

  useEffect(() => {
    if (newTweet) {
      addTweetToDOM(newTweet);
      clrNewTweet();
    }

    return () => {};
  }, [newTweet]);

  return (
    <div id='feed'>
      <div>search bar</div>
      <div>
        {isTweetsLoading && <div>loading</div>}
        {tweets &&
          tweets.map((twt) => <TweetItem tweetObj={twt} key={twt.id} />)}
      </div>
    </div>
  );
}

Feed.propTypes = {
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

Feed.defaultProps = {
  newTweet: null,
};

export default Feed;
