import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import loginWithGooglePopup from '../utils/loginWithGooglePopup';
import loginWithEmailAndPass from '../utils/loginWithEmail&Pass';

function Login() {
  const [emailVal, handleEmail] = useInput();
  const [passwordVal, handlePassword] = useInput();
  const [submitting, setSubmitting] = useState(null);
  const navigate = useNavigate();

  const handleProviderLogin = (provider, email, password) => async () => {
    let user;
    setSubmitting(true);
    if (provider === 'google') {
      user = await loginWithGooglePopup();
    }

    if (provider === 'emailPass') {
      user = await loginWithEmailAndPass(email, password);
    }

    setSubmitting(false);

    if (user) navigate('/');
    else {
      // error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleProviderLogin('emailPass', emailVal, passwordVal)();
  };

  return (
    <div className='login-form'>
      <button type='button' onClick={handleProviderLogin('google')}>
        Log In with Google
      </button>
      <div className='login-or'>
        <span className='hor-line' /> OR <span className='hor-line' />
      </div>
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
        </label>
        <button type='submit'>{submitting ? 'Logging In...' : 'Log In'}</button>
      </form>
    </div>
  );
}

export default Login;
