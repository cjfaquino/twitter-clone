import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  getDisplayName,
  getProfilePicUrl,
  isUserSignedIn,
  saveReply,
} from '../firebase';
import ReplyItem from './ReplyItem';

function Replies({ replies, uidTweet }) {
  const [replyMessage, setReplyMessage] = useState('');
  const handleReplyInput = (e) => {
    setReplyMessage(e.target.value);

    // change textarea height
    const height = e.target.offsetHeight;
    if (height < e.target.scrollHeight) {
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (isUserSignedIn()) {
      saveReply(uidTweet, replyMessage);
    }
  };

  return (
    <div>
      Replies
      {isUserSignedIn() && (
        <form onSubmit={handleReply} className='reply-input-container'>
          <div className='reply-input-img-container'>
            <img src={getProfilePicUrl()} alt={getDisplayName()} />
          </div>
          <textarea
            type='text'
            rows={1}
            placeholder='Tweet your reply'
            value={replyMessage}
            onChange={handleReplyInput}
            className='reply-input'
          />
          <button type='submit'>Tweet</button>
        </form>
      )}
      {replies.map((reply) => (
        <ReplyItem key={reply.uidReply} replyObj={reply} uidTweet={uidTweet} />
      ))}
    </div>
  );
}

Replies.propTypes = {
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      name: PropTypes.string,
      timestamp: PropTypes.shape({
        toDate: PropTypes.func,
      }),
      profilePicUrl: PropTypes.string,
      uidReply: PropTypes.string,
    })
  ),
  uidTweet: PropTypes.string,
};

Replies.defaultProps = {
  replies: [],
};
export default Replies;
