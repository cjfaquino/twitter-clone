import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteTweet, saveReply } from '../firebase';
import Replies from './Replies';
import useReplies from '../utils/useReplies';

function TweetItem({ tweetObj }) {
  const [replyMessage, setReplyMessage] = useState('');
  const { text, name, timestamp, profilePicUrl, uidTweet } = tweetObj;
  const [replies, repliesLength, isAllRepliesLoading] = useReplies(uidTweet);

  const handleDelete = () => {
    // delete from DB
    deleteTweet(uidTweet);
  };

  return (
    <Link
      to={`/tweet/${uidTweet}`}
      state={{ tweetObj }}
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
            title={timestamp && timestamp.toDate().toLocaleString()}
          >
            {timestamp && timestamp.toDate().toLocaleDateString()}
          </div>
        </div>
        <div className='tweet-item-message'>{text}</div>
        <div className='tweet-item-buttons'>
          <span>stats</span>{' '}
          <span>reply {repliesLength > 0 && repliesLength}</span>
          <span>retweet</span> <span>like</span> <span>share</span>
        </div>

        <button type='button' onClick={handleDelete}>
          Delete
        </button>
        {/* <Replies replies={replies} uidTweet={uidTweet} /> */}
      </div>
    </Link>
  );
}

export default TweetItem;
