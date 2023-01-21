import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getDisplayName, getProfilePicUrl, isUserSignedIn } from '../firebase';
import TweetItem from './TweetItem';
import saveTweet from '../utils/saveTweet';
import updateTweet from '../utils/updateTweet';
import useReplies from '../utils/useReplies';
import Tweet from '../utils/Tweet';

function Replies({ tweetObj, replies }) {
  const [fetchedReplies] = useReplies(replies);
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

    const docID = await saveTweet(replyMessage, tweetObj);
    if (docID) {
      // send to TweetPage
      const replyObj = { id: docID, data: new Tweet(replyMessage, tweetObj) };
      fetchedReplies.push(replyObj);
      updateTweet(tweetObj.id, docID);
      setReplyMessage('');
    } else {
      // error sending
    }
  };

  return (
    <div>
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
          <button type='submit' className='btn-submit-reply'>
            Tweet
          </button>
        </form>
      )}
      {fetchedReplies.map((reply) => (
        <TweetItem key={reply.id} tweetObj={reply} replyToID={tweetObj.id} />
      ))}
    </div>
  );
}

Replies.propTypes = {
  tweetObj: PropTypes.shape({
    data: PropTypes.shape({
      replies: PropTypes.arrayOf(PropTypes.string),
      likes: PropTypes.number,
      retweets: PropTypes.number,
      text: PropTypes.string,
      timestamp: PropTypes.shape({
        toDate: PropTypes.func,
      }),
      USER_ICON: PropTypes.string,
      USER_ID: PropTypes.string,
      USER_NAME: PropTypes.string,
    }),
    id: PropTypes.string,
  }).isRequired,
  replies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Replies;
