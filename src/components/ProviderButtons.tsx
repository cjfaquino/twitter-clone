import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '../assets/GoogleIcon';
import loginWithProvider from '../utils/loginWithProvider';

const ProviderButtons = ({ mode }: { mode: string }) => {
  const navigate = useNavigate();
  const handleSignUp = (name: string) => async () => {
    const result = await loginWithProvider(name);
    if (result) {
      navigate('/');
    } else {
      // error
    }
  };
  return (
    <>
      <button
        type='button'
        onClick={handleSignUp('google.com')}
        className='btn-with-provider'
      >
        <GoogleIcon /> {mode} with Google
      </button>
      <button
        type='button'
        onClick={handleSignUp('github.com')}
        className='btn-with-provider'
      >
        <FontAwesomeIcon icon={faGithub as IconProp} /> {mode} with Github
      </button>
    </>
  );
};

export default ProviderButtons;
