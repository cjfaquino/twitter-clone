import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import TweetItem from './TweetItem';
import Replies from './Replies';
import useOneTweet from '../utils/useOneTweet';

function TweetPage() {
  const location = useLocation();
  const params = useParams();
  const [tweet, setTweet, isTweetLoading] = useOneTweet(params.tweet);

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
      TweetPage
      <div>{tweet && tweet.text}</div>
    </div>
  );
}

export default TweetPage;
