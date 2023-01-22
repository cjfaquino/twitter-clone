import React from 'react';
import useInput from '../utils/useInput';
import { signInWithGooglePopup } from '../firebase';

function Login() {
  const [emailVal, handleEmail] = useInput();
  const [passwordVal, handlePassword] = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='login-form'>
      <button type='button' onClick={signInWithGooglePopup}>
        Log In with Google
      </button>
      <div>or</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email-login'>
          Email
          <input
            type='text'
            id='email-login'
            value={emailVal}
            onChange={handleEmail}
          />
        </label>
        <label htmlFor='password-login'>
          Password
          <input
            type='password'
            id='password-login'
            value={passwordVal}
            onChange={handlePassword}
          />
          <button type='submit'>Log In</button>
        </label>
      </form>
    </div>
  );
}

export default Login;
