import React from 'react';
import { useParams } from 'react-router-dom';
import Replies from './Replies';
import MainTweet from './MainTweet';
import useOneTweet from '../utils/useOneTweet';

function TweetPage() {
  const params = useParams();
  const [tweet] = useOneTweet(params.tweet);

  return (
    <>
      <div>TweetPage</div>
      <MainTweet tweetObj={tweet} />
      {tweet && <Replies replies={tweet.data.replies} tweetObj={tweet} />}
    </>
  );
}

export default TweetPage;
