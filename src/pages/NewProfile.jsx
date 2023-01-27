import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import createProfile from '../utils/createProfile';
import eventProfileEdit from '../utils/eventProfileEdit';

function NewProfile({ currentUser, userProfile }) {
  const [displayName, handleDisplayName, setDisplayName] = useInput();
  const [userName, handleUserName, setUserName] = useInput();
  const [loading, setLoading] = useState(null);
  const [submitting, setSubmitting] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // create profile
    const userID = await createProfile(currentUser, userName, displayName);
    setSubmitting(false);
    if (userID) {
      // makes useUserProfile grab the new profile
      eventProfileEdit();
      // then navgiate to page
      navigate('/');
    } else {
      // error
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (userProfile) {
      setLoading('false');
      // update inputs if data is available
      setDisplayName(currentUser.displayName);
      setUserName(userProfile.userName);
    }
  }, [userProfile, currentUser]);

  return (
    <div>
      {loading && (
        <form onSubmit={handleSubmit} className='sign-up-form'>
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
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
}

NewProfile.propTypes = {
  currentUser: PropTypes.shape({
    displayName: PropTypes.string,
  }),
  userProfile: PropTypes.shape({
    userName: PropTypes.string,
  }),
};

NewProfile.defaultProps = {
  currentUser: null,
  userProfile: null,
};

export default NewProfile;
