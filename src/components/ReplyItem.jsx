import React from 'react';

function ReplyItem({ replyObj }) {
  const { name, text, profilePicUrl, timestamp, uidReply } = replyObj;

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
            title={timestamp && timestamp.toDate().toLocaleString()}
          >
            {timestamp && timestamp.toDate().toLocaleDateString()}
          </div>
        </div>
        <div className='reply-item-message'>{text}</div>
        <div className='reply-item-buttons'>
          <span>stats</span> <span>retweet</span> <span>like</span>{' '}
          <span>share</span>
        </div>

        <button type='button' onClick=''>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ReplyItem;
