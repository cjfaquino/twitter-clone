import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import isUserSignedIn from '../utils/user/isUserSignedIn';
import saveTweet from '../utils/tweets/saveTweet';
import Tweet from '../classes/Tweet';
import { TweetObj } from '../interfaces/TweetObj';
import TweetForm from './TweetForm';

interface IProps {
  toggleTweetPopup: React.MouseEventHandler<Element>;
  setNewTweet: React.Dispatch<React.SetStateAction<TweetObj | null>>;
}

const TweetPopup = ({ toggleTweetPopup, setNewTweet }: IProps) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    if (isUserSignedIn()) {
      // save tweet
      const docID = await saveTweet({
        messageText: input,
        messageImgFile: selectedImg,
      });
      if (docID) {
        // send a local tweet to Explore
        setNewTweet({
          id: docID,
          ...new Tweet({ messageText: input }),
        } as TweetObj);
        (toggleTweetPopup as Function)();
      }
    } else {
      // show login popup
      navigate('/login', { state: { error: 'no-login' } });
    }
    setSubmitting(false);
  };

  return (
    <>
      <div
        id='popup-background'
        onClick={toggleTweetPopup}
        aria-hidden='true'
      />
      <div className='tweet-popup'>
        <button
          type='button'
          className='btn-cancel-tweet'
          title='Close'
          onClick={toggleTweetPopup}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>

        <TweetForm
          btnText='Tweet'
          placeholder={"Nothing's happening!"}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          submitting={submitting}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
        />
      </div>
    </>
  );
};

export default TweetPopup;
