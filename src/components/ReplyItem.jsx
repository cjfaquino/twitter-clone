import React from 'react';
import PropTypes from 'prop-types';
import { deleteReply, checkMatchingUser } from '../firebase';
import deleteTweetFromDOM from '../utils/deleteTweetFromDOM';

function ReplyItem({ replyObj, TWEET_ID }) {
  const { text, timestamp, USER_ICON, USER_NAME, USER_ID } = replyObj.data;
  const { id: REPLY_ID } = replyObj;

  const handleDelete = async () => {
    if (checkMatchingUser(USER_ID)) {
      await deleteReply(TWEET_ID, REPLY_ID);
      deleteTweetFromDOM(REPLY_ID);
    }
  };

  const customClass = 'reply';

  return (
    <div className={`${customClass}-item`} id={REPLY_ID}>
      <div className={`${customClass}-item-img-container`}>
        <img src={USER_ICON} alt={USER_NAME} />
      </div>

      <div className={`${customClass}-item-right-half`}>
        <div className={`${customClass}-item-info`}>
          <div className={`${customClass}-item-name`}>{USER_NAME}</div>
          <div
            className={`${customClass}-item-time`}
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
        <div className={`${customClass}-item-message`}>{text}</div>
        <div className={`${customClass}-item-buttons`}>
          <span>stats</span> <span>retweet</span> <span>like</span>
          <span>share</span>
        </div>

        {checkMatchingUser(USER_ID) && (
          <button type='button' onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

ReplyItem.propTypes = {
  replyObj: PropTypes.shape({
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
  }),
  TWEET_ID: PropTypes.string.isRequired,
};

ReplyItem.defaultProps = {
  replyObj: null,
};

export default ReplyItem;
