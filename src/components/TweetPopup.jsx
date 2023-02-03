import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isUserSignedIn from '../utils/isUserSignedIn';
import saveTweet from '../utils/saveTweet';
import Tweet from '../utils/Tweet';

function TweetPopup({ toggleTweetPopup, setNewTweet }) {
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
      <div id='tweet-popup' className='popup'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='tweet'>
            <input
              type='text'
              name='tweet'
              id='tweet'
              onChange={(e) => setInput(e.target.value)}
              value={input}
              maxLength='280'
            />
          </label>
          <button type='submit'>Tweet</button>
        </form>
      </div>
    </>
  );
}

TweetPopup.propTypes = {
  toggleTweetPopup: PropTypes.func.isRequired,
  setNewTweet: PropTypes.func.isRequired,
};

export default TweetPopup;
