import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isUserSignedIn, saveTweet } from '../firebase';

function TweetPopup({ toggleTweetPopup }) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUserSignedIn()) {
      // save tweet
      const docID = await saveTweet(input);
      if (docID) {
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
      <div id='tweet-popup'>
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
};

export default TweetPopup;
