import React from 'react';

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
            <button type='button' onClick={handleDelete}>
              Delete
            </button>
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

export default MainTweet;
