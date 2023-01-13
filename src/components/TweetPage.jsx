import React from 'react';
import { useLocation } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import TweetItem from './TweetItem';

function TweetPage() {
  const location = useLocation();
  const { tweetObj } = location.state;
  const timestamp = new Timestamp(
    tweetObj.timestamp.seconds,
    tweetObj.timestamp.nanoseconds
  );
  const newObj = { ...tweetObj, timestamp };

  return (
    <div id='feed'>
      TweetPage
      <TweetItem tweetObj={newObj} />
    </div>
  );
}

export default TweetPage;
