import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteTweet, saveReply } from '../firebase';
import useReplies from '../utils/useReplies';

function TweetItem({ tweetObj }) {
  const [replyMessage, setReplyMessage] = useState('');

  const { text, name, timestamp, profilePicUrl, uidTweet } = tweetObj;
  const [replies, repLength] = useReplies(uidTweet);

  const handleDelete = () => {
    // delete from DB
    deleteTweet(uidTweet);
  };

  return (
    <Link
      to={`/tweet/${uidTweet}`}
      state={{ tweetObj, replies }}
      className='tweet-item'
      id={uidTweet}
    >
      <div className='tweet-item-img-container'>
        <img src={profilePicUrl} alt={name} />
      </div>

      <div className='tweet-item-right-half'>
        <div className='tweet-item-info'>
          <div className='tweet-item-name'>{name}</div>
          <div
            className='tweet-item-time'
            title={
              timestamp
                ? timestamp.toDate().toLocaleString()
                : new Date().toLocaleString()
            }
          >
            {timestamp
              ? timestamp.toDate().toLocaleDateString()
              : new Date().toLocaleDateString()}
          </div>
        </div>
        <div className='tweet-item-message'>{text}</div>
        <div className='tweet-item-buttons'>
          <span>stats</span> <span>reply {repLength > 0 && repLength}</span>
          <span>retweet</span> <span>like</span> <span>share</span>
        </div>

        <button type='button' onClick={handleDelete}>
          Delete
        </button>
      </div>
    </Link>
  );
}

TweetItem.propTypes = {
  tweetObj: PropTypes.shape({
    text: PropTypes.string,
    name: PropTypes.string,
    timestamp: PropTypes.shape({
      toDate: PropTypes.func,
    }),
    profilePicUrl: PropTypes.string,
    uidTweet: PropTypes.string,
  }).isRequired,
};

export default TweetItem;
