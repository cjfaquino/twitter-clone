import React from 'react';
import { deleteTweet } from '../firebase';

function TweetItem({ tweetObj }) {
  const { text, name, timestamp, profilePicUrl, uidTweet } = tweetObj;

  const handleDelete = () => {
    // delete from DB
    deleteTweet(uidTweet);
  };

  return (
    <div className='tweet-item' id={uidTweet}>
      <div className='tweet-item-img-container'>
        <img src={profilePicUrl} alt={name} />
      </div>

      <div className='tweet-item-right-half'>
        <div className='tweet-item-info'>
          <div className='tweet-item-name'>{name}</div>
          <div
            className='tweet-item-time'
            title={timestamp && timestamp.toDate().toLocaleString()}
          >
            {timestamp && timestamp.toDate().toLocaleDateString()}
          </div>
        </div>
        <div className='tweet-item-message'>{text}</div>
        <div className='tweet-item-buttons'>
          <span>stats</span> <span>retweet</span> <span>like</span>{' '}
          <span>share</span>
        </div>
        <button type='button' onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TweetItem;
