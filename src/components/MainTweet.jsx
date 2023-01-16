import React from 'react';
import PropTypes from 'prop-types';
import { checkMatchingUser } from '../firebase';

function MainTweet({ tweetObj, repLength }) {
  const handleDelete = () => {};

  const getTimeString = (timestamp) =>
    timestamp
      ? timestamp.toDate().toLocaleString()
      : new Date().toLocaleString();

  const customClass = 'main-tweet';

  if (!tweetObj) return <div id={`${customClass}-container`} />;

  const { text, profilePicUrl, timestamp, USER_NAME, USER_ID } = tweetObj.data;
  const { id: TWEET_ID } = tweetObj.id;

  return (
    <div id={`${customClass}-container`}>
      <div id={TWEET_ID} className={`${customClass}-item`}>
        <div className={`${customClass}-item-user`}>
          <div className={`${customClass}-item-img-container`}>
            <img src={profilePicUrl} alt={USER_NAME} />
          </div>
          <div className={`${customClass}-item-right-half`}>
            <div className={`${customClass}-item-info`}>
              <div className={`${customClass}-item-name`}>{USER_NAME}</div>
            </div>
          </div>
          {checkMatchingUser(USER_ID) && (
            <button type='button' onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>

        <div className={`${customClass}-item-message`}>{text}</div>

        <div
          className={`${customClass}-item-time`}
          title={getTimeString(timestamp)}
        >
          {getTimeString(timestamp)} <span>stats</span>
        </div>
        <div className={`${customClass}-item-buttons`}>
          <span>reply {repLength > 0 && repLength}</span>
          <span>retweet</span> <span>like</span> <span>share</span>
        </div>
      </div>
    </div>
  );
}

MainTweet.propTypes = {
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
  repLength: PropTypes.number,
};

MainTweet.defaultProps = {
  repLength: 0,
  tweetObj: null,
};

export default MainTweet;
