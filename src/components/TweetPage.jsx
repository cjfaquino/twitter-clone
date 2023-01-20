import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Replies from './Replies';
import MainTweet from './MainTweet';
import useOneTweet from '../utils/useOneTweet';
import useReplies from '../utils/useReplies';

function TweetPage() {
  const params = useParams();
  const location = useLocation();
  const [tweet] = useOneTweet(params.tweet);
  console.log(params);

  // const [replies, repLength, addReplyToDOM] = useReplies(params.tweet);

  return (
    <div id='feed'>
      <div>TweetPage</div>
      <MainTweet tweetObj={tweet} />
      {tweet && <Replies replies={tweet.data.replies} tweetObj={tweet} />}
    </div>
  );
}

export default TweetPage;
