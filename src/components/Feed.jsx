import React from 'react';

import useTweets from '../utils/useTweets';
import TweetItem from './TweetItem';

function Feed() {
  const [tweets, isTweetsLoading] = useTweets();

  return (
    <div id='feed'>
      <div>search bar</div>
      <div>
        {isTweetsLoading && <div>loading</div>}
        {tweets &&
          tweets.map((twt) => <TweetItem tweetObj={twt} key={twt.uidTweet} />)}
      </div>
    </div>
  );
}

export default Feed;
