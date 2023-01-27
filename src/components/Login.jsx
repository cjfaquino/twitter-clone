import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { signInWithGooglePopup, signInWithEmailAndPass } from '../firebase';

function Login() {
  const [emailVal, handleEmail] = useInput();
  const [passwordVal, handlePassword] = useInput();
  const [submitting, setSubmitting] = useState(null);
  const navigate = useNavigate();

  const handleProviderLogin = (provider, email, password) => async () => {
    let user;
    setSubmitting(true);
    if (provider === 'google') {
      user = await signInWithGooglePopup();
    }

    if (provider === 'emailPass') {
      user = await signInWithEmailAndPass(email, password);
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
          <button type='submit'>
            {submitting ? 'Logging In...' : 'Log In'}
          </button>
        </label>
      </form>
    </div>
  );
}

export default Login;
