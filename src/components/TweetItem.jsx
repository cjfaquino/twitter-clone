import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkMatchingUser, deleteTweet } from '../firebase';
import useReplies from '../utils/useReplies';

function TweetItem({ tweetObj }) {
  const navigate = useNavigate();
  const { text, name, timestamp, profilePicUrl, uidTweet } = tweetObj;
  const [, repLength] = useReplies(uidTweet);

  const handleDelete = () => {
    // delete from DB
    if (checkMatchingUser(tweetObj.uidUser)) {
      deleteTweet(uidTweet);
    }
  };

  const navToPage = (e) => {
    const targetName = e.target.className;
    if (targetName.includes('delete' || 'name' || 'time') === false)
      navigate(`/tweet/${uidTweet}`);
  };

  return (
    <div type='button' className='tweet-item' id={uidTweet} onClick={navToPage}>
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

        {checkMatchingUser(tweetObj.uidUser) && (
          <button
            className='btn-delete-tweet'
            type='button'
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
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
    uidUser: PropTypes.string,
  }).isRequired,
};

export default TweetItem;
