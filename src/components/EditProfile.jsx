import React from 'react';
import useInput from '../utils/useInput';
import createProfile from '../utils/createProfile';

function NewProfile({ currentUser }) {
  const [displayName, handleDisplayName] = useInput(
    currentUser.displayName || ''
  );
  const [userName, handleUserName] = useInput();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // update profile
    await createProfile(currentUser, userName, displayName);
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
      <button type='submit'>Submit</button>
    </form>
  );
}

export default NewProfile;
