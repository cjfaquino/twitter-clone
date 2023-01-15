import React from 'react';
import PropTypes from 'prop-types';
import { checkMatchingUser } from '../firebase';

function MainTweet({ tweetObj, repLength }) {
  const handleDelete = () => {};

  const getTimeString = () =>
    tweetObj.timestamp
      ? tweetObj.timestamp.toDate().toLocaleString()
      : new Date().toLocaleString();

  const customClass = 'main-tweet';
  return (
    <div id={`${customClass}-container`}>
      {tweetObj && (
        <div id={tweetObj.uidTweet} className={`${customClass}-item`}>
          <div className={`${customClass}-item-user`}>
            <div className={`${customClass}-item-img-container`}>
              <img src={tweetObj.profilePicUrl} alt={tweetObj.name} />
            </div>
            <div className={`${customClass}-item-right-half`}>
              <div className={`${customClass}-item-info`}>
                <div className={`${customClass}-item-name`}>
                  {tweetObj.name}
                </div>
              </div>
            </div>
            {checkMatchingUser(tweetObj.uidUser) && (
              <button type='button' onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>

          <div className={`${customClass}-item-message`}>{tweetObj.text}</div>

          <div className={`${customClass}-item-time`} title={getTimeString()}>
            {getTimeString()} <span>stats</span>
          </div>
          <div className={`${customClass}-item-buttons`}>
            <span>reply {repLength > 0 && repLength}</span>
            <span>retweet</span> <span>like</span> <span>share</span>
          </div>
        </div>
      )}
    </div>
  );
}

MainTweet.propTypes = {
  tweetObj: PropTypes.shape({
    text: PropTypes.string,
    name: PropTypes.string,
    timestamp: PropTypes.shape({
      toDate: PropTypes.func,
    }),
    profilePicUrl: PropTypes.string,
    uidTweet: PropTypes.string,
    uidUser: PropTypes.string,
  }),
  repLength: PropTypes.number,
};

MainTweet.defaultProps = {
  repLength: 0,
  tweetObj: null,
};

export default MainTweet;
