import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useInput from '../utils/useInput';
import createProfile from '../utils/createProfile';

function NewProfile({ currentUser }) {
  const [displayName, handleDisplayName] = useInput(
    currentUser.displayName || ''
  );
  const [userName, handleUserName] = useInput();
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
      const event = new Event('profile edit');
      document.dispatchEvent(event);
      // then navgiate to page
      navigate('/');
    } else {
      // error
    }
  };

  return (
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
      <button type='submit'>{submitting ? 'Submitting...' : 'Submit'}</button>
    </form>
  );
}

NewProfile.propTypes = {
  currentUser: PropTypes.shape({
    displayName: PropTypes.string,
  }).isRequired,
};

export default NewProfile;
