import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import getProfilePicUrl from '../utils/user/getProfilePicUrl';
import SubmitButton from './SubmitButton';

interface IProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  btnText: string;
  selectedImg: File | null;
  setSelectedImg: React.Dispatch<React.SetStateAction<File | null>>;
  submitting: boolean;
  handleSubmit: any;
}

const TweetForm = ({
  handleSubmit,
  submitting,
  selectedImg,
  setSelectedImg,
  input,
  setInput,
  placeholder,
  btnText,
}: IProps) => {
  const [imgURL, setImgURL] = useState('');
  const inputRef = useRef(null);
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
              accept='image/jpeg'
            />
          </label>
          <SubmitButton submitting={submitting} text={btnText} width={100} />
        </section>
      </form>
    </section>
  );
};

export default TweetForm;
