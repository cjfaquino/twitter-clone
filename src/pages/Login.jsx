import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import loginWithGooglePopup from '../utils/loginWithGooglePopup';
import loginWithEmailAndPass from '../utils/loginWithEmail&Pass';
import setErrorMessage from '../utils/setErrorMessage';
import OrSeparator from '../components/OrSeparator';
import HaveAnAccount from '../components/HaveAnAccount';

const Login = () => {
  const [emailVal, handleEmail] = useInput();
  const [passwordVal, handlePassword] = useInput();
  const [submitting, setSubmitting] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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

    if (user) navigate(-1);
    else {
      // error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleProviderLogin('emailPass', emailVal, passwordVal)();
  };

  useEffect(() => {
    if (location.state && location.state.error === 'reauth') {
      setErrorMessage(
        '.login-form .error',
        'Please re-authenticate before continuing.'
      );
    }

    return () => {};
  }, [location.state]);

  return (
    <div className='login-form'>
      <button type='button' onClick={handleProviderLogin('google')}>
        Log In with Google
      </button>
      <OrSeparator />
      <form onSubmit={handleSubmit}>
        <label htmlFor='email-login'>
          Email
          <input
            type='email'
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
        <div className='error' />
        <button type='submit'>{submitting ? 'Logging In...' : 'Log In'}</button>
        <HaveAnAccount />
      </form>
    </div>
  );
};

export default Login;
