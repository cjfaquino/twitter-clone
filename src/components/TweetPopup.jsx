import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isUserSignedIn from '../utils/isUserSignedIn';
import saveTweet from '../utils/saveTweet';
import Tweet from '../utils/Tweet';
import getProfilePicUrl from '../utils/getProfilePicUrl';

const TweetPopup = ({ toggleTweetPopup, setNewTweet }) => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUserSignedIn()) {
      // save tweet
      const docID = await saveTweet(input);
      if (docID) {
        // send to Feed
        setNewTweet({ id: docID, ...new Tweet(input) });
        toggleTweetPopup();
      }
    } else {
      // show login popup
    }
  };
  return (
    <>
      <div
        id='popup-background'
        onClick={toggleTweetPopup}
        aria-hidden='true'
      />
      <div className='tweet-popup popup'>
        <button
          type='button'
          className='btn-cancel-tweet'
          title='Close'
          onClick={toggleTweetPopup}
        >
          &#215;
        </button>
        <div className='input-container'>
          <div className='tweet-popup-img-container img-container'>
            <img src={getProfilePicUrl()} alt='' />
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              type='text'
              name='tweet'
              id='tweet-input'
              placeholder="Nothing's happening!"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              maxLength='280'
            />
            <div className='hor-line' />
            <button type='submit'>Tweet</button>
          </form>
        </div>
      </div>
    </>
  );
};

TweetPopup.propTypes = {
  toggleTweetPopup: PropTypes.func.isRequired,
  setNewTweet: PropTypes.func.isRequired,
};

export default TweetPopup;
