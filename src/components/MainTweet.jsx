import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { checkMatchingUser, getUserUid } from '../firebase';
import deleteTweet from '../utils/deleteTweet';
import ThreeDots from './ThreeDots';
import useToggle from '../hooks/useToggle';
import getTimeString from '../utils/getTimeString';
import updateLike from '../utils/updateLike';
import updateView from '../utils/updateView';

function MainTweet({ tweetObj }) {
  const navigate = useNavigate();
  const [showOptionsPopup, toggleOptionsPopup] = useToggle();

  const handleDelete = async () => {
    if (checkMatchingUser(getUserUid())) {
      await deleteTweet(tweetObj);
      navigate('/');
    }
  };

  const handleLike = () => {
    updateLike(tweetObj);
  };

  const customClass = 'main-tweet';

  useEffect(() => {
    if (tweetObj) {
      updateView(tweetObj);
    }
  }, [tweetObj]);

  if (!tweetObj) return <div id={`${customClass}-container`} />;

  const {
    views,
    retweets,
    likes,
    text,
    timestamp,
    USER_ICON,
    USER_NAME,
    USER_DISPLAY,
    USER_ID,
  } = tweetObj.data;
  const TWEET_ID = tweetObj.id;

  return (
    <div id={`${customClass}-container`}>
      <div id={TWEET_ID} className={`${customClass}-item`}>
        <div className={`${customClass}-item-user`}>
          <div className={`${customClass}-item-img-container`}>
            <img src={USER_ICON} alt={USER_NAME} />
          </div>
          <div className={`${customClass}-item-right-half`}>
            <div className={`${customClass}-item-info`}>
              <div className={`${customClass}-item-display`}>
                {USER_DISPLAY}
              </div>
              <div className={`${customClass}-item-name`}>@{USER_NAME}</div>
            </div>
          </div>
          <div className='dots-container'>
            <ThreeDots onClick={toggleOptionsPopup} />
            {showOptionsPopup && (
              <>
                <div className='options-popup popup'>
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
                <div
                  className='options-background'
                  onClick={toggleOptionsPopup}
                  aria-hidden='true'
                />
              </>
            )}
          </div>
        </div>

        <div className={`${customClass}-item-message`}>{text}</div>

        <div
          className={`${customClass}-item-time`}
          title={getTimeString(timestamp)}
        >
          {getTimeString(timestamp)}{' '}
        </div>
        <div className={`${customClass}-item-stats`}>
          <span className='views'>
            <span className='views-number'>{views}</span> Views
          </span>
          <span className='retweets'>
            <span className='retweets-number'>{retweets}</span> Retweets
          </span>
          <span className='likes'>
            <span className='likes-number'>{likes}</span> Likes
          </span>
        </div>
        <div className={`${customClass}-item-buttons`}>
          <button type='button'>reply</button>
          <button type='button'>retweet</button>
          <button type='button' onClick={handleLike}>
            like
          </button>
          <button type='button'>share</button>
        </div>
      </div>
    </div>
  );
}

MainTweet.propTypes = {
  tweetObj: PropTypes.shape({
    data: PropTypes.shape({
      replies: PropTypes.arrayOf(PropTypes.string),
      views: PropTypes.number,
      likes: PropTypes.number,
      retweets: PropTypes.number,
      text: PropTypes.string,
      timestamp: PropTypes.shape({
        toDate: PropTypes.func,
      }),
      USER_ICON: PropTypes.string,
      USER_ID: PropTypes.string,
      USER_NAME: PropTypes.string,
      USER_DISPLAY: PropTypes.string,
    }),
    id: PropTypes.string,
  }),
};

MainTweet.defaultProps = {
  tweetObj: null,
};

export default MainTweet;
