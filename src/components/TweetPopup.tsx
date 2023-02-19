import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faImage } from '@fortawesome/free-solid-svg-icons';
import isUserSignedIn from '../utils/user/isUserSignedIn';
import saveTweet from '../utils/tweets/saveTweet';
import Tweet from '../classes/Tweet';
import getProfilePicUrl from '../utils/user/getProfilePicUrl';
import SubmitButton from './SubmitButton';
import { TweetObj } from '../interfaces/TweetObj';

interface IProps {
  toggleTweetPopup: React.MouseEventHandler<Element>;
  setNewTweet: React.Dispatch<React.SetStateAction<TweetObj | null>>;
}

const TweetPopup = ({ toggleTweetPopup, setNewTweet }: IProps) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);

  const resetImg = () => {
    setImgURL(getProfilePicUrl());
    (inputRef.current! as HTMLInputElement).value = '';
    setSelectedImg(null);
  };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImg(e.target.files![0]);
    setImgURL(URL.createObjectURL(e.target.files![0]));
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = '5px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

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
        <div className='input-container'>
          <div className='tweet-popup-img-container img-container'>
            <img src={getProfilePicUrl()} alt='no user icon' />
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              name='tweet'
              id='tweet-input'
              placeholder="Nothing's happening!"
              onChange={handleInput}
              value={input}
              minLength={1}
              maxLength={280}
            />
            {selectedImg && (
              <div className='tweet-img-container'>
                <img src={imgURL} alt='' />
                <button type='button' onClick={resetImg}>
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
            )}
            <div className='hor-line' />
            <section className='tweet-popup-buttons'>
              <label htmlFor='tweet-img' className='upload-tweet-img'>
                <FontAwesomeIcon icon={faImage} />
                <input
                  ref={inputRef}
                  type='file'
                  name='tweet-img'
                  id='tweet-img'
                  onChange={handleImg}
                  accept='image/jpeg'
                />
              </label>
              <SubmitButton submitting={submitting} text='Tweet' width={100} />
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default TweetPopup;
