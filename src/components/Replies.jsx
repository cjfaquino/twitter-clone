import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import TweetItem from './TweetItem';
import saveTweet from '../utils/saveTweet';
import useReplies from '../hooks/useReplies';
import Tweet from '../utils/Tweet';
import getDisplayName from '../utils/getDisplayName';
import getProfilePicUrl from '../utils/getProfilePicUrl';
import isUserSignedIn from '../utils/isUserSignedIn';

const Replies = ({ tweetObj }) => {
  const params = useParams();

  const [fetchedReplies] = useReplies(params.tweet);
  const [replyMessage, setReplyMessage] = useState('');

  const handleReplyInput = (e) => {
    setReplyMessage(e.target.value);

    e.target.style.height = '5px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!isUserSignedIn()) {
      return; // show login popup
    }

    const docID = await saveTweet(replyMessage, tweetObj);
    if (docID) {
      // send to TweetPage
      const replyObj = { id: docID, ...new Tweet(replyMessage, tweetObj) };
      fetchedReplies.push(replyObj);
      setReplyMessage('');
    } else {
      // error sending
    }
  };

  return (
    <div>
      {isUserSignedIn() && (
        <form onSubmit={handleSubmitReply} className='reply-input-container'>
          <div className='reply-input-img-container img-container'>
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
            Reply
          </button>
        </form>
      )}
      {fetchedReplies.map((reply) => (
        <TweetItem key={reply.id} tweetObj={reply} replyToID={tweetObj.id} />
      ))}
    </div>
  );
};

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
};

export default Replies;
