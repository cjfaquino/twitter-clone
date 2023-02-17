import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendEmailVerification, User } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import useInput from '../hooks/useInput';
import updateProfile from '../utils/updateProfile';
import updateUserEmail from '../utils/updateEmail';
import isEmailVerified from '../utils/isEmailVerified';
import validateUsername from '../utils/validateUsername';
import { UserProfile } from '../interfaces/UserProfile';
import GoogleIcon from '../assets/GoogleIcon';
import useProviderLinkStatus from '../hooks/useProviderLinkStatus';
import SubmitButton from '../components/SubmitButton';
import useWindowTitle from '../hooks/useWindowTitle';
import updatePassword from '../utils/updatePassword';

interface IProps {
  currentUser: User | null;
  userProfile: UserProfile;
}

const ProfileSettings = ({ currentUser, userProfile }: IProps) => {
  useWindowTitle('Settings');
  const [userName, handleUserName, setUserName] = useInput();
  const [email, handleEmail, setEmail] = useInput();
  const [newPass, handleNewPass, setNewPass] = useInput();
  const [confirmNewPass, handleConfirmNewPass, setConfirmNewPass] = useInput();
  const [submittingUsername, setSubmittingUsername] = useState(false);
  const [submittingEmail, setSubmittingEmail] = useState(false);
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const [googleStatus, handleGoogle] = useProviderLinkStatus(
    currentUser,
    'google.com'
  );
  const [githubStatus, handleGithub] = useProviderLinkStatus(
    currentUser,
    'github.com'
  );

  const navigate = useNavigate();

  const handleSubmitUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(await validateUsername(userName, 2, 20))) {
      return;
    }

    setSubmittingUsername(true);
    await updateProfile({ userProfile, userName });
    setSubmittingUsername(false);
  };

  const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittingEmail(true);
    const res = await updateUserEmail(email);
    setSubmittingEmail(false);

    if (res === 'auth/requires-recent-login') {
      navigate('/login', { state: { error: 'reauth' } });
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPass !== confirmNewPass || !currentUser) return;

    setSubmittingPassword(true);
    const res = await updatePassword(currentUser, newPass, navigate);
    setSubmittingPassword(false);

    if (res === true) {
      setNewPass('');
      setConfirmNewPass('');
    }
  };

  const setFields = async () => {
    // update inputs if data is available
    setEmail((currentUser && currentUser.email) || '');

    if (userProfile.doneLoading) {
      setUserName(userProfile.userName!);
    }
  };

  useEffect(() => {
    // must be signed in
    // User session expired, needs to reauthenticate
    if (!currentUser || currentUser.isAnonymous) {
      return navigate('/login');
    }

    // has not finished signup
    if (userProfile.id === 'no-id' && userProfile.doneLoading) {
      return navigate('/signup');
    }

    setFields();
    return () => {};
  }, [userProfile]);

  return (
    <div className='settings-forms'>
      <form onSubmit={handleSubmitUsername}>
        <h2>Your Profile</h2>
        <label htmlFor='userName'>
          Username <span className='verify-username error' />
          <input
            type='text'
            id='userName'
            value={userName}
            onChange={handleUserName}
            minLength={2}
            maxLength={15}
            required
          />
        </label>
        <SubmitButton
          submitting={submittingUsername}
          text='Change'
          width={100}
        />
      </form>
      <form onSubmit={handleSubmitEmail} className='email-form'>
        <h2>Contact Details</h2>
        <span className={`verify-email ${isEmailVerified() ? 'verified' : ''}`}>
          {isEmailVerified() ? (
            'verified ✓'
          ) : (
            <button
              type='button'
              onClick={() => sendEmailVerification(currentUser!)}
              className='btn-verify-email'
            >
              Verify email
            </button>
          )}
        </span>
        <label htmlFor='email'>
          Email
          <input
            type='text'
            id='email'
            value={email}
            onChange={handleEmail}
            required
          />
        </label>

        <SubmitButton submitting={submittingEmail} text='Change' width={100} />
      </form>

      <form className='change-password-form' onSubmit={handleSubmitPassword}>
        <h2>Change password</h2>
        <label htmlFor='password'>
          New password
          <input
            type='password'
            id='password'
            value={newPass}
            onChange={handleNewPass}
            required
          />
        </label>
        <label htmlFor='confirm-password'>
          Confirm new password
          <input
            type='password'
            id='confirm-password'
            value={confirmNewPass}
            onChange={handleConfirmNewPass}
            required
          />
        </label>
        <SubmitButton
          submitting={submittingPassword}
          text='Change'
          width={100}
        />{' '}
      </form>

      <div className='link-accounts'>
        <span className='error' />

        <button
          type='button'
          onClick={handleGithub}
          className='btn-with-provider'
        >
          <FontAwesomeIcon icon={faGithub as IconProp} />
          {githubStatus ? 'Unlink' : 'Link'} Github account
        </button>

        <button
          type='button'
          onClick={handleGoogle}
          className='btn-with-provider'
        >
          <GoogleIcon />
          {googleStatus ? 'Unlink' : 'Link'} Google account
        </button>
      </div>

      <div className='account-stats'>
        <div>
          <span>Created at: </span>{' '}
          <span>
            {currentUser &&
              currentUser.metadata &&
              new Date(currentUser.metadata.creationTime!).toLocaleString()}
          </span>
        </div>
        <div>
          <span>Last login at: </span>{' '}
          <span>
            {currentUser &&
              currentUser.metadata &&
              new Date(currentUser.metadata.lastSignInTime!).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
