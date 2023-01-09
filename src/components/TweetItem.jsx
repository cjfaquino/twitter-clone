import React from 'react';

function TweetItem({ tweetObj }) {
  const { text, name, timestamp, profilePicUrl } = tweetObj;
  console.log(profilePicUrl);
  return (
    <div className='tweet-item'>
      <div className='tweet-item-img-container'>
        <img src={profilePicUrl} alt={name} />
      </div>

      <div className='tweet-item-right-half'>
        <div className='tweet-item-info'>
          <div className='tweet-item-name'>{name}</div>
          <div
            className='tweet-item-time'
            title={timestamp.toDate().toLocaleString()}
          >
            {timestamp && timestamp.toDate().toLocaleDateString()}
          </div>
        </div>
        <div className='tweet-item-message'>{text}</div>
        <div className='tweet-item-buttons'>
          <span>stats</span> <span>retweet</span> <span>like</span>{' '}
          <span>share</span>
        </div>
      </div>
    </div>
  );
}

export default TweetItem;
