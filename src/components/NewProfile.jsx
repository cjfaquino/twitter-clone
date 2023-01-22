import React from 'react';
import useInput from '../utils/useInput';

function NewProfile() {
  const [displayName, handleDisplayName] = useInput();
  const [userName, handleUserName] = useInput();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // update profile
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
