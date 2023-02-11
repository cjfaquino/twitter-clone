import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import isUserSignedIn from '../utils/isUserSignedIn';
import saveTweet from '../utils/saveTweet';
import Tweet from '../utils/Tweet';
import getProfilePicUrl from '../utils/getProfilePicUrl';

interface IProps {
  toggleTweetPopup: any;
  setNewTweet: any;
}

const TweetPopup = ({ toggleTweetPopup, setNewTweet }: IProps) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      navigate('/login', { state: { error: 'must be logged in' } });
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
          <FontAwesomeIcon icon={faClose} />
        </button>
        <div className='input-container'>
          <div className='tweet-popup-img-container img-container'>
            <img src={getProfilePicUrl()} alt='no user icon' />
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              name='tweet'
              id='tweet-input'
              placeholder="Nothing's happening!"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              minLength={1}
              maxLength={280}
            />
            <div className='hor-line' />
            <button type='submit'>Tweet</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TweetPopup;
