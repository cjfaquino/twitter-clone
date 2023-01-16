import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkMatchingUser, deleteTweet } from '../firebase';
import useReplies from '../utils/useReplies';
import deleteTweetFromDOM from '../utils/deleteTweetFromDOM';

function TweetItem({ tweetObj }) {
  const navigate = useNavigate();
  const { text, timestamp, USER_ICON, USER_ID, USER_NAME } = tweetObj.data;
  const { id: TWEET_ID } = tweetObj;
  const [, repLength] = useReplies(tweetObj.id);

  const handleDelete = async () => {
    // delete from DB
    if (checkMatchingUser(USER_ID)) {
      await deleteTweet(TWEET_ID);

      deleteTweetFromDOM(TWEET_ID);
    }
  };

  const navToPage = (e) => {
    const targetName = e.target.className;
    if (targetName.includes('delete' || 'name' || 'time') === false)
      navigate(`/tweet/${TWEET_ID}`);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      type='button'
      className='tweet-item'
      id={TWEET_ID}
      onClick={navToPage}
      aria-hidden='true'
    >
      <div className='tweet-item-img-container'>
        <img src={USER_ICON} alt={USER_NAME} />
      </div>

      <div className='tweet-item-right-half'>
        <div className='tweet-item-info'>
          <div className='tweet-item-name'>{USER_NAME}</div>
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

        {checkMatchingUser(USER_ID) && (
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
    data: PropTypes.shape({
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

export default TweetItem;
