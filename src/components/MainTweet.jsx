import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { checkMatchingUser, getUserUid } from '../firebase';
import deleteTweet from '../utils/deleteTweet';
import ThreeDots from './ThreeDots';
import useToggle from '../utils/useToggle';
import getTimeString from '../utils/getTimeString';

function MainTweet({ tweetObj }) {
  const navigate = useNavigate();
  const [showOptionsPopup, toggleOptionsPopup] = useToggle();

  const handleDelete = async () => {
    if (checkMatchingUser(getUserUid())) {
      await deleteTweet(tweetObj);
      navigate('/');
    }
  };

  const customClass = 'main-tweet';

  if (!tweetObj) return <div id={`${customClass}-container`} />;

  const { text, timestamp, replies, USER_ICON, USER_NAME, USER_ID } =
    tweetObj.data;
  const { id: TWEET_ID } = tweetObj.id;

  return (
    <div id={`${customClass}-container`}>
      <div id={TWEET_ID} className={`${customClass}-item`}>
        <div className={`${customClass}-item-user`}>
          <div className={`${customClass}-item-img-container`}>
            <img src={USER_ICON} alt={USER_NAME} />
          </div>
          <div className={`${customClass}-item-right-half`}>
            <div className={`${customClass}-item-info`}>
              <div className={`${customClass}-item-name`}>{USER_NAME}</div>
            </div>
          </div>
          <div
            className='dots-container'
            onClick={toggleOptionsPopup}
            aria-hidden='true'
          >
            <ThreeDots />
            {showOptionsPopup && (
              <>
                <div className='options-popup'>
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
                <div className='options-background' aria-hidden='true' />
              </>
            )}
          </div>
        </div>

        <div className={`${customClass}-item-message`}>{text}</div>

        <div
          className={`${customClass}-item-time`}
          title={getTimeString(timestamp)}
        >
          {getTimeString(timestamp)} <span>stats</span>
        </div>
        <div className={`${customClass}-item-buttons`}>
          <span>reply {replies.length > 0 && replies.length}</span>
          <span>retweet</span> <span>like</span> <span>share</span>
        </div>
      </div>
    </div>
  );
}

MainTweet.propTypes = {
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
  }),
};

MainTweet.defaultProps = {
  tweetObj: null,
};

export default MainTweet;
