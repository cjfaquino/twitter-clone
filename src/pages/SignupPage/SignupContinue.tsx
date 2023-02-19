import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangeProfileIcon from '../../components/ChangeProfileIcon';
import InputDisplayName from '../../components/InputDisplayName';
import InputUsername from '../../components/InputUsername';
import SubmitButton from '../../components/SubmitButton';
import useInput from '../../hooks/useInput';
import createProfile from '../../utils/user/createProfile';
import getProfilePicUrl from '../../utils/user/getProfilePicUrl';
import setErrorMessage from '../../utils/setErrorMessage';
import uploadImage from '../../utils/uploadImage';
import validateUsername from '../../utils/validateUsername';
import { IProps } from './SignupStart';

const SignupContinue = ({ currentUser }: IProps) => {
  const [userName, handleUserName] = useInput();
  const [displayName, handleDisplayName] = useInput(
    (currentUser && currentUser.displayName) || ''
  );
  const [submitting, setSubmitting] = useState(false);
  const [photoURL, setPhotoURL] = useState(getProfilePicUrl());
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newPhotoURL = photoURL;

    // clear error on new try
    setErrorMessage('.verify-username', '');
    setSubmitting(true);

    try {
      // throw on invalid
      await validateUsername(userName);

      // upload photo & get URL
      if (selectedPhoto) {
        newPhotoURL = await uploadImage(
          `/users/${currentUser!.uid}/icon`,
          selectedPhoto
        );
      }

      // create create new profile
      const created = await createProfile({
        userName,
        displayName,
        photoURL: newPhotoURL,
        user: currentUser!,
      });

      if (created) {
        navigate(`/explore`);
      } else {
        // error
      }
    } catch (er) {
      const error = er as Error;
      const errorName = error.name;
      const errorMessage = error.message;

      switch (errorName) {
        case 'Username Error':
          setErrorMessage('.verify-username', errorMessage);
          break;

        default:
          console.log(error);
          break;
      }
    }
    setSubmitting(false);
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
          <InputDisplayName
            displayName={displayName}
            handleDisplayName={handleDisplayName}
          />

          <InputUsername userName={userName} handleUserName={handleUserName} />
        </section>
      </div>
      <SubmitButton submitting={submitting} text='Submit' width={100} />
    </form>
  );
};

export default SignupContinue;
