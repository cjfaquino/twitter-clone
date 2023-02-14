import { User } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangeProfileIcon from '../components/ChangeProfileIcon';
import SubmitButton from '../components/SubmitButton';
import useInput from '../hooks/useInput';
import createProfile from '../utils/createProfile';
import getProfilePicUrl from '../utils/getProfilePicUrl';
import uploadImage from '../utils/uploadImage';

interface IProps {
  currentUser: User;
}

const SignUpContinue = ({ currentUser }: IProps) => {
  const [userName, handleUsername] = useInput();
  const [displayName, handleDisplayName] = useInput();
  const [submitting, setSubmitting] = useState(false);
  const [photoURL, setPhotoURL] = useState(getProfilePicUrl());
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newPhotoURL = photoURL;

    if (selectedPhoto) {
      newPhotoURL = await uploadImage(
        `/users/${currentUser.uid}/icon`,
        selectedPhoto
      );
    }

    setSubmitting(true);
    const created = await createProfile({
      userName,
      displayName,
      photoURL: newPhotoURL,
      user: currentUser,
    });
    setSubmitting(false);

    if (created) {
      navigate(`/explore`);
    } else {
      // error
    }
  };

  return (
    <form onSubmit={handleSubmit} className='sign-up-form continue-signup'>
      <h2>Create your profile</h2>
      <div className='signup-card'>
        <ChangeProfileIcon
          photoURL={photoURL}
          setPhotoURL={setPhotoURL}
          setSelectedPhoto={setSelectedPhoto}
          selectedPhoto={selectedPhoto}
        />
        <section>
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
        </section>
      </div>
      <SubmitButton submitting={submitting} text='Submit' width={100} />
    </form>
  );
};

export default SignUpContinue;
