import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TweetObj } from '../interfaces/TweetObj';
import saveTweet from '../utils/tweets/saveTweet';
import getProfilePicUrl from '../utils/user/getProfilePicUrl';
import isUserSignedIn from '../utils/user/isUserSignedIn';
import SubmitButton from './SubmitButton';

interface IProps {
  placeholder: string;
  btnText: string;
  successCallback: Function;
  aReplyTo?: TweetObj | null;
}

const TweetForm = ({
  placeholder,
  btnText,
  aReplyTo,
  successCallback,
}: IProps) => {
  const [imgURL, setImgURL] = useState('');
  const [input, setInput] = useState('');
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const type = btnText.toLowerCase();

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
    if (!isUserSignedIn()) {
      // go to login
      navigate('/login', { state: { error: 'no-login' } });
      return;
    }

    setSubmitting(true);

    // save tweet
    const [docID, uploadedImgURL, tweetError] = await saveTweet({
      messageText: input,
      messageImgFile: selectedImg,
      aReplyTo,
    });
    if (docID) {
      // send a local copy to Explore if on Explore
      successCallback({
        id: docID,
        messageImg: uploadedImgURL,
        messageText: input,
        aReplyTo,
      });
      setInput('');
      resetImg();
    }

    if (tweetError) {
      // error
    }

    setSubmitting(false);
  };

  return (
    <section className='input-container'>
      <div className='tweet-popup-img-container img-container'>
        <img src={getProfilePicUrl()} alt='no user icon' />
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          name={`${type}`}
          id={`${type}-input`}
          className='tweet-input'
          placeholder={placeholder}
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
          <label htmlFor={`${type}-img`} className='upload-tweet-img'>
            <FontAwesomeIcon icon={faImage} />
            <input
              ref={inputRef}
              type='file'
              name={`${type}-img`}
              id={`${type}-img`}
              onChange={handleImg}
              accept='image/jpeg, image/webp'
            />
          </label>
          <SubmitButton
            submitting={submitting}
            text={btnText}
            width={100}
            disabled={!input}
          />
        </section>
      </form>
    </section>
  );
};

TweetForm.defaultProps = {
  aReplyTo: null,
};

export default TweetForm;
