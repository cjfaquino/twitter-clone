import React from 'react';
import useTweetsFromDB from '../utils/useTweetsFromDB';

function Feed() {
  const [tweets, isTweetsLoading] = useTweetsFromDB();

  return (
    <div id='feed'>
      <div>search bar</div>
      <div>
        {tweets.map((twt) => {
          const { text, name, timestamp } = twt;
          return (
            <div>
              <div>{name}</div>
              <div>{text}</div>
              <div>{timestamp && timestamp.toDate().toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Feed;
