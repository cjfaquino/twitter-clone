import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import updateProfile from '../utils/createProfile';
import eventProfileEdit from '../utils/eventProfileEdit';
import doesProfileExist from '../utils/doesProfileExist';
import updateUserEmail from '../utils/updateEmail';

function ProfileSettings({ currentUser, userProfile }) {
  const [displayName, handleDisplayName, setDisplayName] = useInput();
  const [userName, handleUserName, setUserName] = useInput();
  const [email, handleEmail, setEmail] = useInput();
  const [loading, setLoading] = useState(true);
  const [submitting1, setSubmitting1] = useState(null);
  const [submitting2, setSubmitting2] = useState(null);
  const navigate = useNavigate();

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setSubmitting1(true);
    // create profile
    const userID = await updateProfile({
      user: currentUser,
      userName,
      displayName,
    });
    setSubmitting1(false);
    if (userID) {
      // makes useUserProfile grab the new profile
      eventProfileEdit();
      // then navgiate to page
      navigate('/');
    } else {
      // error
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setSubmitting2(true);
    await updateUserEmail(email);
    setSubmitting2(false);
  };

  const setFields = async () => {
    // update inputs if data is available
    setDisplayName(currentUser.displayName);
    setEmail(currentUser.email || '');

    if (userProfile) {
      setUserName(userProfile.userName);
      setLoading(false);
    } else if (!(await doesProfileExist(currentUser.uid))) {
      // no user profile in db
      setLoading(false);
    }
  };

  useEffect(() => {
    // must be signed in
    // User session expired, needs to reauthenticate
    if (!currentUser || currentUser.isAnonymous) {
      navigate('/login');
    }

    setFields();
  }, [userProfile]);

  return (
    <div className='sign-up-form'>
      {!loading && (
        <div>
          <form onSubmit={handleSubmit1}>
            <div>Create your profile</div>
            <label htmlFor='displayName'>
              Display Name
              <input
                type='text'
                id='displayName'
                value={displayName}
                onChange={handleDisplayName}
              />
            </label>
            <label htmlFor='userName'>
              Username
              <input
                type='text'
                id='userName'
                value={userName}
                onChange={handleUserName}
              />
            </label>
            <button type='submit'>
              {submitting1 ? 'Submitting...' : 'Submit'}
            </button>
          </form>
          <form onSubmit={handleSubmit2}>
            <div>Contact Details</div>
            <label htmlFor='email'>
              Email
              <input
                type='text'
                id='email'
                value={email}
                onChange={handleEmail}
              />
            </label>
            <button type='submit'>
              {submitting2 ? 'Submitting...' : 'Submit'}
            </button>
          </form>
          <div>
            <span>Created at: </span>{' '}
            <span>
              {currentUser &&
                new Date(
                  Number(currentUser.metadata.createdAt)
                ).toLocaleString()}
            </span>
          </div>
          <div>
            <span>Last login at: </span>{' '}
            <span>
              {currentUser &&
                new Date(
                  Number(currentUser.metadata.lastLoginAt)
                ).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

ProfileSettings.propTypes = {
  currentUser: PropTypes.shape({
    metadata: PropTypes.shape({
      createdAt: PropTypes.string,
      lastLoginAt: PropTypes.string,
    }),
    displayName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    uid: PropTypes.string,
    isAnonymous: PropTypes.bool,
  }),
  userProfile: PropTypes.shape({
    userName: PropTypes.string,
  }),
};

ProfileSettings.defaultProps = {
  currentUser: null,
  userProfile: null,
};

export default ProfileSettings;
