import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { saveReply } from '../firebase';
import ReplyItem from './ReplyItem';

function Replies({ replies, uidTweet }) {
  const [replyMessage, setReplyMessage] = useState('');
  const handleReplyInput = (e) => {
    setReplyMessage(e.target.value);
  };

  const handleReply = (e) => {
    e.preventDefault();
    saveReply(uidTweet, replyMessage);
  };

  return (
    <div>
      Replies
      <form onSubmit={handleReply}>
        <input type='text' value={replyMessage} onChange={handleReplyInput} />
      </form>
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
  uidTweet: PropTypes.string.isRequired,
};

Replies.defaultProps = {
  replies: [],
};
export default Replies;
