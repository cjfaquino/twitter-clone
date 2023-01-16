import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  getDisplayName,
  getProfilePicUrl,
  isUserSignedIn,
  saveReply,
} from '../firebase';
import ReplyItem from './ReplyItem';
import Reply from '../utils/Reply';

function Replies({ TWEET_ID, replies, addReplyToDOM }) {
  const [replyMessage, setReplyMessage] = useState('');
  const handleReplyInput = (e) => {
    setReplyMessage(e.target.value);

    // change textarea height
    const height = e.target.offsetHeight;
    if (height < e.target.scrollHeight) {
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!isUserSignedIn()) {
      return; // show login popup
    }

    const docID = await saveReply(TWEET_ID, replyMessage);
    if (docID) {
      // send to TweetPage
      addReplyToDOM({ id: docID, data: new Reply(replyMessage) });
      setReplyMessage('');
    } else {
      // error sending
    }
  };

  return (
    <div>
      Replies
      {isUserSignedIn() && (
        <form onSubmit={handleSubmitReply} className='reply-input-container'>
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
        <ReplyItem key={reply.id} replyObj={reply} TWEET_ID={TWEET_ID} />
      ))}
    </div>
  );
}

Replies.propTypes = {
  addReplyToDOM: PropTypes.func.isRequired,
  TWEET_ID: PropTypes.string.isRequired,
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      tweetObj: PropTypes.shape({
        data: PropTypes.shape({
          text: PropTypes.string,
          timestamp: PropTypes.shape({
            toDate: PropTypes.func,
          }),
          profilePicUrl: PropTypes.string,
          USER_ID: PropTypes.string,
          USER_NAME: PropTypes.string,
        }),
        id: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default Replies;
