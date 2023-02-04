import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import deleteTweet from '../utils/deleteTweet';
import OptionsPopup from './OptionsPopup';
import useToggle from '../hooks/useToggle';
import getTimeString from '../utils/getTimeString';
import checkMatchingUser from '../utils/checkMatchingUser';
import deleteTweetFromDOM from '../utils/deleteTweetFromDOM';
import useReplies from '../hooks/useReplies';
import checkAlreadyLiked from '../utils/checkAlreadyLiked';
import undoLike from '../utils/undoLike';
import likeTweet from '../utils/likeTweet';
import isUserSignedIn from '../utils/isUserSignedIn';

const TweetItem = ({ tweetObj, userProfile }) => {
  const [likes, setLikes] = useState(tweetObj.likes);
  const likesRef = useRef(null);

  const navigate = useNavigate();
  const {
    views,

    text,
    timestamp,
    USER_ICON,
    USER_ID,
    USER_NAME,
    USER_DISPLAY,
    id: TWEET_ID,
  } = tweetObj;

  const [showOptionsPopup, toggleOptionsPopup] = useToggle(false);
  const [, repLength] = useReplies(TWEET_ID);

  const customClass = 'tweet';

  const handleDelete = async () => {
    // delete from DB
    if (checkMatchingUser(USER_ID)) {
      await deleteTweet(tweetObj);
      deleteTweetFromDOM(`${customClass}-${TWEET_ID}`);
    }
  };

  const checkElementClicked = (targetString, conditions) =>
    conditions.some((el) => targetString.includes(el));

  const navToPage = async (e) => {
    const targetName = e.target.className;
    // conditions
    const toUser = ['profile-link'];
    const toTweetPage = [
      'info',
      'right-half',
      'message',
      'time',
      'buttons',
      'repl',
    ];

    if (checkElementClicked(targetName, toTweetPage)) {
      // go to tweet page
      navigate(`/${USER_NAME}/tweet/${TWEET_ID}`);
    } else if (checkElementClicked(targetName, toUser)) {
      // go to user page
      navigate(`/${USER_NAME}`);
    }
  };

  const handleLike = async () => {
    if (!isUserSignedIn()) return navigate('/login');

    if (await checkAlreadyLiked(TWEET_ID)) {
      // already liked
      await undoLike(tweetObj, userProfile);
      likesRef.current.classList.remove('liked');
      setLikes((prev) => prev - 1);
    } else {
      // not yet liked
      await likeTweet(tweetObj, userProfile);
      likesRef.current.classList.add('liked');
      setLikes((prev) => prev + 1);
    }

    return undefined;
  };

  useEffect(() => {
    const updateLikes = async () => {
      if (await checkAlreadyLiked(TWEET_ID)) {
        likesRef.current.classList.add('liked');
      } else {
        likesRef.current.classList.remove('liked');
      }
    };

    updateLikes();
    document.addEventListener('auth state changed', updateLikes);

    return () => {
      document.removeEventListener('auth state changed', updateLikes);
    };
  }, []);

  return (
    <div
      className={`${customClass}-item`}
      id={`${customClass}-${TWEET_ID}`}
      onClick={navToPage}
      aria-hidden
    >
      <div className={`${customClass}-item-left-half`}>
        <div
          className={`${customClass}-item-img-container img-container profile-link`}
        >
          <img src={USER_ICON} alt={USER_NAME} className='profile-link' />
        </div>
        <div className='vert-line' />
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
          <div
            className={`${customClass}-item-time grey`}
            title={getTimeString(timestamp)}
          >
            {getTimeString(timestamp, 'localeDate')}
          </div>
          <OptionsPopup
            toggleOptionsPopup={toggleOptionsPopup}
            showOptionsPopup={showOptionsPopup}
            handleDelete={handleDelete}
            userID={USER_ID}
          />
        </div>
        {tweetObj.aReplyTo && (
          <div className='replying-to-info'>
            Replying to{' '}
            <span className='username profile-link'>
              @{tweetObj.aReplyTo.USER_NAME}
            </span>
          </div>
        )}

        <div className={`${customClass}-item-message`}>{text}</div>
        <div className={`${customClass}-item-buttons`}>
          <button type='button' className='btn-views'>
            stats <span className='views-number'>{views}</span>
          </button>
          <button type='button' className='btn-replies'>
            reply{' '}
            <span className='replies-number'>{repLength > 0 && repLength}</span>
          </button>
          <button type='button' className='btn-retweets'>
            retweet
          </button>{' '}
          <button
            type='button'
            className='btn-likes'
            onClick={handleLike}
            ref={likesRef}
          >
            likes <span className='likes-number'>{likes}</span>
          </button>
          <button type='button' className='btn-share'>
            share
          </button>
        </div>
      </div>
    </div>
  );
};

TweetItem.propTypes = {
  userProfile: PropTypes.shape({}),
  tweetObj: PropTypes.shape({
    aReplyTo: PropTypes.shape({
      USER_NAME: PropTypes.string,
    }),
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
  }).isRequired,
};

TweetItem.defaultProps = {
  userProfile: null,
};

export default TweetItem;
