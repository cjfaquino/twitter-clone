import React from 'react';
import useTweetsFromDB from '../utils/useTweetsFromDB';
import TweetItem from './TweetItem';

function Feed() {
  const [tweets, isTweetsLoading] = useTweetsFromDB();

  return (
    <div id='feed'>
      <div>search bar</div>
      <div>
        {tweets.map((twt) => (
          <TweetItem tweetObj={twt} key={twt.uidTweet} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
