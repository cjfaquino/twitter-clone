import React from 'react';
import PropTypes from 'prop-types';
import { deleteReply } from '../firebase';

function ReplyItem({ replyObj, uidTweet }) {
  const { name, text, profilePicUrl, timestamp, uidReply } = replyObj;

  const handleDelete = () => {
    deleteReply(uidTweet, uidReply);
  };

  return (
    <div className='reply-item' id={uidReply}>
      <div className='reply-item-img-container'>
        <img src={profilePicUrl} alt={name} />
      </div>

      <div className='reply-item-right-half'>
        <div className='reply-item-info'>
          <div className='reply-item-name'>{name}</div>
          <div
            className='reply-item-time'
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
        <div className='reply-item-message'>{text}</div>
        <div className='reply-item-buttons'>
          <span>stats</span> <span>retweet</span> <span>like</span>
          <span>share</span>
        </div>

        <button type='button' onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

ReplyItem.propTypes = {
  replyObj: PropTypes.shape({
    text: PropTypes.string,
    name: PropTypes.string,
    timestamp: PropTypes.shape({
      toDate: PropTypes.func,
    }),
    profilePicUrl: PropTypes.string,
    uidReply: PropTypes.string,
  }).isRequired,
  uidTweet: PropTypes.string.isRequired,
};

export default ReplyItem;
