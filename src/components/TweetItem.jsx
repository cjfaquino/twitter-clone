import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkMatchingUser } from '../firebase';
import deleteTweet from '../utils/deleteTweet';
import deleteReply from '../utils/deleteReply';
import deleteTweetFromDOM from '../utils/deleteTweetFromDOM';
import ThreeDots from './ThreeDots';
import useToggle from '../utils/useToggle';
import getTimeString from '../utils/getTimeString';

function TweetItem({ tweetObj, replyToID }) {
  const navigate = useNavigate();
  const { text, timestamp, replies, USER_ICON, USER_ID, USER_NAME } =
    tweetObj.data;
  const { id: TWEET_ID } = tweetObj;

  const [showOptionsPopup, toggleOptionsPopup] = useToggle();

  const handleDelete = async () => {
    // delete from DB
    if (checkMatchingUser(USER_ID)) {
      if (replyToID) {
        await deleteReply(replyToID, TWEET_ID);
      } else {
        await deleteTweet(TWEET_ID);
      }

      deleteTweetFromDOM(TWEET_ID);
    }
  };

  const checkElementClicked = (targetString, conditions) =>
    conditions.some((el) => targetString.includes(el));

  const navToPage = (e) => {
    const targetName = e.target.className;
    // conditions
    const toUser = ['name', 'img'];
    const toTweetPage = ['info', 'right-half', 'message', 'time', 'buttons'];

    if (checkElementClicked(targetName, toTweetPage)) {
      // go to tweet page
      navigate(`/tweet/${TWEET_ID}`, { state: { tweetObj } });
    } else if (checkElementClicked(targetName, toUser)) {
      // go to user page
    }
  };

  const customClass = replyToID ? 'reply' : 'tweet';

  return (
    <div
      className={`${customClass}-item`}
      id={TWEET_ID}
      onClick={navToPage}
      aria-hidden
    >
      <div className={`${customClass}-item-img-container`}>
        <img src={USER_ICON} alt={USER_NAME} />
      </div>

      <div className={`${customClass}-item-right-half`}>
        <div className={`${customClass}-item-info`}>
          <div className={`${customClass}-item-name`}>{USER_NAME}</div>
          <div
            className={`${customClass}-item-time`}
            title={getTimeString(timestamp)}
          >
            {getTimeString(timestamp, 'localeDate')}
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
        <div className={`${customClass}-item-buttons`}>
          <span>stats</span>
          <span>reply {replies.length > 0 && replies.length}</span>
          <span>retweet</span> <span>like</span>
          <span>share</span>
        </div>
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
