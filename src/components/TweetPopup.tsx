import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Tweet from '../classes/Tweet';
import { TweetObj } from '../interfaces/TweetObj';
import TweetForm from './TweetForm';

interface IProps {
  toggleTweetPopup: React.MouseEventHandler<Element>;
  setNewTweet: React.Dispatch<React.SetStateAction<TweetObj | null>>;
}

const TweetPopup = ({ toggleTweetPopup, setNewTweet }: IProps) => {
  // adds a temp local copy on top of Explore
  const addToExplore = ({
    id,
    messageImg,
    messageText,
  }: {
    id: string;
    messageImg: string;
    messageText: string;
  }) => {
    // send a local copy to Explore if on Explore
    setNewTweet({
      id,
      ...new Tweet({ messageText, messageImg }),
    } as TweetObj);
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
