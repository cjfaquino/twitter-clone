import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import useInput from '../hooks/useInput';
import loginWithEmailAndPass from '../utils/loginWithEmail&Pass';
import setErrorMessage from '../utils/setErrorMessage.js';
import OrSeparator from '../components/OrSeparator';
import HaveAnAccount from '../components/HaveAnAccount';
import GoogleIcon from '../components/GoogleIcon';
import loginWithProvider from '../utils/loginWithProvider';

const Login = () => {
  const [emailVal, handleEmail] = useInput();
  const [passwordVal, handlePassword] = useInput();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProviderLogin =
    (provider: string, email?: string, password?: string) => async () => {
      let result;
      setSubmitting(true);

      if (provider === 'emailPass') {
        result = await loginWithEmailAndPass(email, password);
      } else {
        result = await loginWithProvider(provider);
      }

      setSubmitting(false);

      if (result) navigate(-1);
      else {
        // error
      }
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={handleSubmit}>
        <div className='login-provider error' />
        <button
          type='button'
          onClick={handleProviderLogin('google.com')}
          className='btn-with-provider'
        >
          <GoogleIcon /> Log In with Google
        </button>
        <button
          type='button'
          onClick={handleProviderLogin('github.com')}
          className='btn-with-provider'
        >
          <FontAwesomeIcon icon={faGithub} /> Log In with Github
        </button>
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
