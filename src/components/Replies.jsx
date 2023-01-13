import React, { useState } from 'react';
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

export default Replies;
