import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import createProfile from '../utils/createProfile';
import getProfilePicUrl from '../utils/getProfilePicUrl';

interface IProps {
  currentUser: User;
}

const SignUpContinue = ({ currentUser }: IProps) => {
  const [userName, handleUsername] = useInput();
  const [displayName, handleDisplayName] = useInput();
  const [submitting, setSubmitting] = useState(false);
  const [photoURL, setPhotoURL] = useState(getProfilePicUrl());
  const [selectedImage, setSelectedImage] = useState<Blob | MediaSource | null>(
    null
  );
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    const created = await createProfile({
      userName,
      displayName,
      photoURL,
      user: currentUser,
    });
    setSubmitting(false);

    if (created) {
      navigate(`/explore`);
    } else {
      // error
    }
  };

  const resetImg = () => {
    setPhotoURL(getProfilePicUrl());
    setSelectedImage(null);
  };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files[0]);
    setSelectedImage(e.target.files[0]);
    setPhotoURL(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <form onSubmit={handleSubmit} className='sign-up-form continue-signup'>
      <h2>Create your profile</h2>
      <img alt='not found' width='100px' src={photoURL} />
      <button type='button' onClick={resetImg}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <input type='file' name='myImage' onChange={handleImg} />

      <label htmlFor='displayName'>
        Display name
        <input
          type='text'
          id='displayName'
          value={displayName}
          onChange={handleDisplayName}
          required
        />
      </label>
      <label htmlFor='userName'>
        Username @
        <input
          type='text'
          id='userName'
          value={userName}
          onChange={handleUsername}
          autoComplete='off'
          required
        />
      </label>
      <button type='submit'>{submitting ? 'Submitting...' : 'Submit'}</button>
    </form>
  );
};

export default SignUpContinue;
