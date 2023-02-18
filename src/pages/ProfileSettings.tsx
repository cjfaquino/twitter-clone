import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendEmailVerification, User } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
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
import addPassword from '../utils/addPassword';
import useToggle from '../hooks/useToggle';
import Login from './Login';
import setErrorMessage from '../utils/setErrorMessage';
import validatePassword from '../utils/validatePassword';
import UserName from '../classes/UserName';

interface IProps {
  currentUser: User | null;
  userProfile: UserProfile;
}

const ProfileSettings = ({ currentUser, userProfile }: IProps) => {
  useWindowTitle('Settings');
  const [showLoginPopup, toggleLoginPopup] = useToggle();
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
  const [emailProviderStatus, handleEmailProvider, setEmailProvider] =
    useProviderLinkStatus(currentUser, 'password');

  const navigate = useNavigate();
  const passwordRef = useRef(null);

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
    (passwordRef.current! as HTMLElement).textContent = '';
    if (!currentUser) return;

    // clear error on try
    setErrorMessage('.verify-password', '');
    setErrorMessage('.verify-confirm-password', '');
    setSubmittingPassword(true);

    try {
      const password = validatePassword(newPass, confirmNewPass);

      if (!password.validity) {
        throw Error(password.errorMessage);
      }

      let res;
      if (emailProviderStatus) {
        res = await updatePassword(currentUser, newPass, toggleLoginPopup);
      } else {
        res = await addPassword(currentUser, email, newPass, toggleLoginPopup);
      }

      if (res === true) {
        // cleanup inputs
        setNewPass('');
        setConfirmNewPass('');
        (passwordRef.current! as HTMLElement).textContent = `Successfully ${
          emailProviderStatus ? 'changed' : 'added'
        } password`;
        setEmailProvider(true);
      } else {
        // error code
        console.log(res);
      }
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;

      if (errorMessage === 'should be matching') {
        setErrorMessage('.verify-confirm-password', errorMessage);
      } else {
        setErrorMessage('.verify-password', errorMessage);
      }
    }
    setSubmittingPassword(false);
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
          Username <span className='verify-username verify error' />
          <input
            type='text'
            id='userName'
            value={userName}
            onChange={handleUserName}
            minLength={UserName.min}
            maxLength={UserName.max}
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
        <span
          className={`verify-email verify ${
            isEmailVerified() ? 'success' : ''
          }`}
        >
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
            type='email'
            id='email'
            value={email}
            onChange={handleEmail}
            required
          />
        </label>

        <SubmitButton submitting={submittingEmail} text='Change' width={100} />
      </form>

      <form className='change-password-form' onSubmit={handleSubmitPassword}>
        <h2>{emailProviderStatus ? 'Change' : 'Add'} password</h2>
        <label htmlFor='password'>
          New password <span className='verify-password verify error' />
          <input
            type='password'
            id='password'
            value={newPass}
            onChange={handleNewPass}
            required
          />
        </label>
        <label htmlFor='confirm-password'>
          Confirm new password{' '}
          <span className='verify-confirm-password verify error' />
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
        />
        <div className='success-password success' ref={passwordRef} />
      </form>

      <div className='link-accounts'>
        <span className='error' />

        {emailProviderStatus && (
          <button
            type='button'
            onClick={handleEmailProvider}
            className='btn-with-provider'
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            Unlink Email account
          </button>
        )}

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

      {showLoginPopup && (
        <>
          <div id='popup-background' onClick={toggleLoginPopup} aria-hidden />
          <div className='login-popup'>
            <Login
              toggleLoginPopup={toggleLoginPopup}
              asPopup
              reauthenticate
              google={googleStatus}
              github={githubStatus}
              email={emailProviderStatus}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileSettings;
