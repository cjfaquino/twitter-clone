import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import deleteTweet from '../utils/deleteTweet';
import ThreeDots from './ThreeDots';
import useToggle from '../hooks/useToggle';
import getTimeString from '../utils/getTimeString';
import updateView from '../utils/updateView';
import checkMatchingUser from '../utils/checkMatchingUser';
import getUserUid from '../utils/getUserUid';
import likeTweet from '../utils/likeTweet';
import undoLike from '../utils/undoLike';
import checkAlreadyLiked from '../utils/checkAlreadyLiked';

const MainTweet = ({ tweetObj, userProfile }) => {
  const [showOptionsPopup, toggleOptionsPopup] = useToggle();
  const [likes, setLikes] = useState(null);
  const navigate = useNavigate();
  const tweetRef = useRef(null);

  const customClass = 'main-tweet';

  useEffect(() => {
    if (tweetObj) {
      setLikes(tweetObj.likes);
    }

    return () => {};
  }, [tweetObj]);

  useEffect(() => {
    if (!tweetObj) return undefined;

    // increase view on tweetObj load
    updateView(tweetObj);

    // dynamically scroll past .replying-to-tweet-item on load
    if (tweetObj.aReplyTo) {
      const replyingTo = tweetRef.current.parentNode.querySelector(
        '.replying-to-tweet-item'
      );
      window.scrollTo(0, replyingTo.clientHeight);
    }

    return () => {
      // reset scroll when navigating
      window.scrollTo(0, 0);
    };
  }, [tweetObj]);

  if (!tweetObj) return <div id={`${customClass}-container`} />;

  const {
    views,
    retweets,
    text,
    timestamp,
    USER_ICON,
    USER_NAME,
    USER_DISPLAY,
    USER_ID,
    id: TWEET_ID,
  } = tweetObj;

  const handleDelete = async () => {
    if (checkMatchingUser(getUserUid())) {
      await deleteTweet(tweetObj);
      navigate('/');
    }
  };

  const handleLike = async () => {
    if (await checkAlreadyLiked(TWEET_ID)) {
      // already liked
      await undoLike(tweetObj, userProfile);
      setLikes((prev) => prev - 1);
    } else {
      // not yet liked
      await likeTweet(tweetObj, userProfile);
      setLikes((prev) => prev + 1);
    }
  };

  const navToPage = async (e) => {
    const targetName = e.target.className;
    // conditions
    if (targetName.includes('profile-link')) {
      // go to user page
      navigate(`/${USER_NAME}`);
    }
  };

  return (
    <div
      id={`${customClass}-container`}
      onClick={navToPage}
      aria-hidden
      ref={tweetRef}
    >
      <div id={TWEET_ID} className={`${customClass}-item`}>
        <div className={`${customClass}-item-user`}>
          <div className={`${customClass}-item-img-container profile-link`}>
            <img src={USER_ICON} alt={USER_NAME} className='profile-link' />
          </div>
          <div className={`${customClass}-item-right-half`}>
            <div className={`${customClass}-item-info`}>
              <div className={`${customClass}-item-display profile-link`}>
                {USER_DISPLAY}
              </div>
              <div
                className={`${customClass}-item-name profile-link grey username`}
              >
                @{USER_NAME}
              </div>
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
        {tweetObj.aReplyTo && (
          <div className='replying-to-info'>
            Replying to{' '}
            <span className='profile-link username'>
              @{tweetObj.aReplyTo.USER_NAME}
            </span>
          </div>
        )}
        <div className={`${customClass}-item-message`}>{text}</div>
        <div
          className={`${customClass}-item-time grey`}
          title={getTimeString(timestamp)}
        >
          {getTimeString(timestamp)}{' '}
        </div>
        <div className={`${customClass}-item-stats`}>
          <span className='views grey'>
            <span className='views-number'>{views}</span> Views
          </span>
          <span className='retweets grey'>
            <span className='retweets-number'>{retweets}</span> Retweets
          </span>
          <span className='likes grey'>
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
};

MainTweet.propTypes = {
  userProfile: PropTypes.shape({}),
  tweetObj: PropTypes.shape({
    aReplyTo: PropTypes.shape({
      USER_NAME: PropTypes.string,
    }),
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

    id: PropTypes.string,
  }),
};

MainTweet.defaultProps = {
  tweetObj: null,
  userProfile: null,
};

export default MainTweet;
