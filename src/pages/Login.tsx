import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import loginWithEmailAndPass from '../utils/loginWithEmail&Pass';
import setErrorMessage from '../utils/setErrorMessage.js';
import OrSeparator from '../components/OrSeparator';
import HaveAnAccount from '../components/HaveAnAccount';
import ProviderButtons from '../components/ProviderButtons';

const Login = () => {
  const [emailVal, handleEmail] = useInput();
  const [passwordVal, handlePassword] = useInput();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await loginWithEmailAndPass(emailVal, passwordVal);
    setSubmitting(false);

    if (result) navigate('/');
    else {
      // error
    }
  };

  useEffect(() => {
    if (location.state) {
      let message;
      switch (location.state.error) {
        case 'reauth':
          message = 'Please re-authenticate before continuing.';
          break;

        case 'no-login':
          message = 'You must be signed in to continue.';
          break;

        default:
          message = 'Something went wrong. Please try again.';
          break;
      }

      setErrorMessage('.login-form .error', message);
    }

    return () => {};
  }, [location.state]);

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <div className='login-provider error' />
        <ProviderButtons mode='Log in' />
        <OrSeparator />
        <div className='login-email error' />
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
        <button type='submit'>{submitting ? 'Logging In...' : 'Log In'}</button>
        <HaveAnAccount />
      </form>
    </div>
  );
};

export default Login;
