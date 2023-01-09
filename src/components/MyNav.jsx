import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { signOutUser, saveTweet } from '../firebase';

function MyNav({ isSignedIn, currentUser }) {
  const [tweetInput, setTweetInput] = useState('');

  const handleInput = (e) => {
    setTweetInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTweet(tweetInput).then((success) => {
      if (success) {
        setTweetInput('');
      }
    });
  };

  return (
    <nav id='options'>
      <ul>
        <li>stuff</li>
        <li>
          <form onSubmit={handleSubmit}>
            <label htmlFor='tweet'>
              <input
                type='text'
                name='tweet'
                id='tweet'
                onChange={handleInput}
                value={tweetInput}
                maxLength='50'
              />
            </label>
            <button type='submit'>Tweet</button>
          </form>
        </li>
        <li className='nav-user'>{currentUser && currentUser.displayName}</li>
        {isSignedIn && (
          <li>
            <button type='button' onClick={signOutUser}>
              Log Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

MyNav.propTypes = {
  isSignedIn: PropTypes.bool,
  currentUser: PropTypes.shape({
    displayName: PropTypes.string,
  }),
};

MyNav.defaultProps = {
  isSignedIn: false,
  currentUser: { displayName: '' },
};

export default MyNav;
