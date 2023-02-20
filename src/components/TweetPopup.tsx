import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Tweet from '../classes/Tweet';
import { TweetObj } from '../interfaces/TweetObj';
import TweetForm from './TweetForm';

interface IProps {
  toggleTweetPopup: React.MouseEventHandler<Element>;
  setTweets: React.Dispatch<React.SetStateAction<TweetObj[]>>;
}

const TweetPopup = ({ toggleTweetPopup, setTweets }: IProps) => {
  // adds a temp local copy on top of current page between Home, Explore, or Profile Pages
  const addToExplore = ({
    id,
    messageImg,
    messageText,
  }: {
    id: string;
    messageImg: string;
    messageText: string;
  }) => {
    const newTweet = {
      id,
      ...new Tweet({ messageText, messageImg }),
    } as TweetObj;
    setTweets((prev) => [newTweet, ...prev]);

    // close popup
    (toggleTweetPopup as Function)();
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
          successCallback={addToExplore}
        />
      </div>
    </>
  );
};

export default TweetPopup;
