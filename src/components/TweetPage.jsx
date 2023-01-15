import React from 'react';
import { useParams } from 'react-router-dom';
import Replies from './Replies';
import MainTweet from './MainTweet';
import useOneTweet from '../utils/useOneTweet';
import useReplies from '../utils/useReplies';

function TweetPage() {
  const params = useParams();
  const [tweet] = useOneTweet(params.tweet);
  const [replies, repLength] = useReplies(params.tweet);

  return (
    <div id='feed'>
      <div>TweetPage</div>
      <MainTweet tweetObj={tweet} repLength={repLength} />
      <Replies replies={replies} uidTweet={params.tweet} />
    </div>
  );
}

export default TweetPage;
