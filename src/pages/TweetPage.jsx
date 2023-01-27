import React from 'react';
import { useParams } from 'react-router-dom';
import Replies from '../components/Replies';
import MainTweet from '../components/MainTweet';
import useOneTweet from '../hooks/useOneTweet';

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
