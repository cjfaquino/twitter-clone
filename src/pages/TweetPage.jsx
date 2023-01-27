import React from 'react';
import { useParams } from 'react-router-dom';
import Replies from '../components/Replies';
import MainTweet from '../components/MainTweet';
import useOneTweet from '../hooks/useOneTweet';
import GoBackHeader from '../components/GoBackHeader';

function TweetPage() {
  const params = useParams();
  const [tweet] = useOneTweet(params.tweet);

  return (
    <>
      <GoBackHeader />
      <MainTweet tweetObj={tweet} />
      {tweet && <Replies replies={tweet.data.replies} tweetObj={tweet} />}
    </>
  );
}

export default TweetPage;
