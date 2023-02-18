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

    const res = await validateUsername(userName);

    if (res.validity) {
      await updateProfile({ userProfile, userName });
    } else {
      setErrorMessage('.verify-username', res.errorMessage);
    }
    setSubmittingUsername(false);
  };

  return (
    <form onSubmit={handleSubmitUsername}>
      <h2>Your Profile</h2>
      <InputUsername userName={userName} handleUserName={handleUserName} />
      <SubmitButton submitting={submittingUsername} text='Change' width={100} />
    </form>
  );
};

export default ChangeUsernameForm;
