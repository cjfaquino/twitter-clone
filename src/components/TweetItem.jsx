import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkMatchingUser } from '../firebase';
import deleteTweet from '../utils/deleteTweet';
import ThreeDots from './ThreeDots';
import useToggle from '../hooks/useToggle';
import getTimeString from '../utils/getTimeString';
import updateLike from '../utils/updateLike';

function TweetItem({ tweetObj }) {
  const navigate = useNavigate();
  const {
    views,
    likes,
    text,
    timestamp,
    replies,
    USER_ICON,
    USER_ID,
    USER_NAME,
    USER_DISPLAY,
    id: TWEET_ID,
  } = tweetObj;

  const [showOptionsPopup, toggleOptionsPopup] = useToggle();

  const handleDelete = async () => {
    // delete from DB
    if (checkMatchingUser(USER_ID)) {
      await deleteTweet(tweetObj);
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

    console.log(targetName);
    if (checkElementClicked(targetName, toTweetPage)) {
      // go to tweet page
      navigate(`/tweet/${TWEET_ID}`);
    } else if (checkElementClicked(targetName, toUser)) {
      // go to user page
      navigate(`/${USER_NAME}`);
    }
  };

  const handleLike = async () => {
    updateLike(tweetObj);
  };

  const customClass = 'tweet';

  return (
    <div
      className={`${customClass}-item`}
      id={TWEET_ID}
      onClick={navToPage}
      aria-hidden
    >
      <div className={`${customClass}-item-left-half`}>
        <div className={`${customClass}-item-img-container profile-link`}>
          <img src={USER_ICON} alt={USER_NAME} className='profile-link' />
        </div>
        <div className='vert-line' />
      </div>

      <div className={`${customClass}-item-right-half`}>
        <div className={`${customClass}-item-info`}>
          <div className={`${customClass}-item-display profile-link`}>
            {USER_DISPLAY}
          </div>
          <div className={`${customClass}-item-name profile-link`}>
            @{USER_NAME}
          </div>
          <div
            className={`${customClass}-item-time`}
            title={getTimeString(timestamp)}
          >
            {getTimeString(timestamp, 'localeDate')}
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
            <span className='profile-link'>@{tweetObj.aReplyTo.USER_NAME}</span>
          </div>
        )}

        <div className={`${customClass}-item-message`}>{text}</div>
        <div className={`${customClass}-item-buttons`}>
          <button type='button' className='btn-views'>
            stats <span className='views-number'>{views}</span>
          </button>
          <button type='button' className='btn-replies'>
            reply{' '}
            <span className='replies-number'>
              {replies.length > 0 && replies.length}
            </span>
          </button>
          <button type='button' className='btn-retweets'>
            retweet
          </button>{' '}
          <button type='button' className='btn-likes' onClick={handleLike}>
            likes <span className='likes-number'>{likes}</span>
          </button>
          <button type='button' className='btn-share'>
            share
          </button>
        </div>
      </div>
    </div>
  );
}

TweetItem.propTypes = {
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
  }).isRequired,
};

export default TweetItem;
