import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import useInput from '../hooks/useInput';
import updateProfile from '../utils/updateProfile';
import updateUserEmail from '../utils/updateEmail';
import linkWithGooglePopup from '../utils/linkWithGooglePopup';
import isEmailVerified from '../utils/isEmailVerified';
import sendEmailVerification from '../utils/sendEmailVerification';
import validateUsername from '../utils/validateUsername';
import { UserProfile } from '../interfaces/UserProfile';
import GoogleIcon from '../components/GoogleIcon';

interface IProps {
  currentUser: User;
  userProfile: UserProfile;
}

const ProfileSettings = ({ currentUser, userProfile }: IProps) => {
  const [userName, handleUserName, setUserName] = useInput();
  const [email, handleEmail, setEmail] = useInput();
  const [submittingProfile, setSubmittingProfile] = useState(false);
  const [submittingEmail, setSubmittingEmail] = useState(false);
  const navigate = useNavigate();

  const handleSubmitProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(await validateUsername(userName, 2, 20))) {
      return;
    }

    setSubmittingProfile(true);
    // create profile
    await updateProfile({
      user: currentUser,
      userName,
    });
    setSubmittingProfile(false);
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

  const setFields = async () => {
    // update inputs if data is available
    setEmail(currentUser.email || '');

    if (userProfile.doneLoading) {
      setUserName(userProfile.userName);
    }
  };

  const linkGoogle = async () => {
    await linkWithGooglePopup('github');
  };

  useEffect(() => {
    // must be signed in
    // User session expired, needs to reauthenticate
    if (!currentUser || currentUser.isAnonymous) {
      return navigate('/login');
    }

    // has not finished signup
    if (userProfile.id === 'no-id' && userProfile.doneLoading) {
      return navigate('/signup/continue');
    }

    setFields();
    return undefined;
  }, [userProfile]);

  return (
    userProfile.id !== 'no-id' &&
    userProfile.doneLoading && (
      <div className='settings-forms'>
        <form onSubmit={handleSubmitProfile}>
          <h2>Your Profile</h2>
          <label htmlFor='userName'>
            Username <span className='verify-username error' />
            <input
              type='text'
              id='userName'
              value={userName}
              onChange={handleUserName}
              minLength={2}
              maxLength={20}
            />
          </label>
          <button type='submit'>
            {submittingProfile ? 'Submitting...' : 'Change'}
          </button>
        </form>
        <form onSubmit={handleSubmitEmail} className='email-form'>
          <h2>Contact Details</h2>
          <label htmlFor='email'>
            Email{' '}
            <span
              className={
                isEmailVerified() ? 'verify-email verified' : 'verify-email'
              }
            >
              {isEmailVerified() ? (
                'verified ✓'
              ) : (
                <button
                  type='button'
                  onClick={sendEmailVerification}
                  className='btn-verify-email'
                >
                  Verify email
                </button>
              )}
            </span>
            <input
              type='text'
              id='email'
              value={email}
              onChange={handleEmail}
            />
          </label>

          <button type='submit'>
            {submittingEmail ? 'Submitting...' : 'Change'}
          </button>
        </form>

        <div className='link-google-account'>
          <button
            type='button'
            onClick={linkGoogle}
            className='btn-with-provider'
          >
            <GoogleIcon />
            Link Google account
          </button>
          <span className='error' />
        </div>

        <div className='account-stats'>
          <div>
            <span>Created at: </span>{' '}
            <span>
              {new Date(
                Number(userProfile.metadata.createdAt)
              ).toLocaleString()}
            </span>
          </div>
          <div>
            <span>Last login at: </span>{' '}
            <span>
              {new Date(
                Number(userProfile.metadata.lastLoginAt)
              ).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileSettings;
