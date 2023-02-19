import React, { useState } from 'react';
import InputUsername from '../../components/InputUsername';
import SubmitButton from '../../components/SubmitButton';
import { UserProfile } from '../../interfaces/UserProfile';
import setErrorMessage from '../../utils/setErrorMessage';
import updateProfile from '../../utils/user/updateProfile';
import validateUsername from '../../utils/validateUsername';

interface IProps {
  userName: string;
  handleUserName: React.ChangeEventHandler<HTMLInputElement>;
  userProfile: UserProfile;
}

const ChangeUsernameForm = ({
  userName,
  handleUserName,
  userProfile,
}: IProps) => {
  const [submittingUsername, setSubmittingUsername] = useState(false);

  const handleSubmitUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // clear error on try
    setErrorMessage('.verify-username', '');
    setSubmittingUsername(true);

    try {
      await validateUsername(userName);

      await updateProfile({ userProfile, userName });
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
    setSubmittingUsername(false);
  };

  return (
    <form onSubmit={handleSubmitUsername}>
      <h2>Your Profile</h2>
      <InputUsername userName={userName} handleUserName={handleUserName} />
      <SubmitButton
        submitting={submittingUsername}
        text='Change'
        width={100}
        disabled={userName === userProfile.userName}
      />
    </form>
  );
};

export default ChangeUsernameForm;
