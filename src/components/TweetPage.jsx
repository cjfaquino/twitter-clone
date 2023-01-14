import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import Replies from './Replies';
import MainTweet from './MainTweet';
import useOneTweet from '../utils/useOneTweet';
import useReplies from '../utils/useReplies';

function TweetPage() {
  const location = useLocation();
  const params = useParams();
  const [tweet, setTweet, isTweetLoading] = useOneTweet(params.tweet);
  const [replies, repLength, allRepliesLoading] = useReplies(params.tweet);

  useEffect(() => {
    if (location.state !== null && !tweet) {
      const { tweetObj } = location.state;
      let newObj = tweetObj;

      if (!(tweetObj.timestamp instanceof Timestamp)) {
        // convert timestamp object back into firestore custom Timestamp object
        const timestamp = new Timestamp(
          tweetObj.timestamp.seconds,
          tweetObj.timestamp.nanoseconds
        );

        // set updated tweetObj
        newObj = { ...tweetObj, timestamp };
      }

      setTweet(newObj);
    }
  }, []);

  return (
    <div id='feed'>
      <div>TweetPage</div>
      <MainTweet tweetObj={tweet} repLength={repLength} />
      <Replies replies={replies} uidTweet={params.tweet} />
    </div>
  );
}

export default TweetPage;
