import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '../assets/GoogleIcon';
import loginWithProvider from '../utils/loginWithProvider';
import reauthenticateProvider from '../utils/reauthenticateProvider';

interface IProps {
  google?: boolean | null;
  github?: boolean | null;
  mode: string;
  reauthenticate?: boolean;
  toggleLoginPopup?: React.MouseEventHandler<Element>;
}

const defaultProps = {
  google: false,
  github: false,
  reauthenticate: false,
  toggleLoginPopup: () => {},
};

const ProviderButtons = ({
  google,
  github,
  mode,
  reauthenticate,
  toggleLoginPopup,
}: IProps) => {
  const navigate = useNavigate();

  const handleSignUp = (name: string) => async () => {
    let result;
    if (reauthenticate) {
      await reauthenticateProvider(name, toggleLoginPopup as Function);
    } else {
      result = await loginWithProvider(name);
    }

    if (result) {
      navigate('/');
    } else {
      // error
    }
  };

  return (
    <>
      {google && (
        <button
          type='button'
          onClick={handleSignUp('google.com')}
          className='btn-with-provider'
        >
          <GoogleIcon /> {mode} with Google
        </button>
      )}
      {github && (
        <button
          type='button'
          onClick={handleSignUp('github.com')}
          className='btn-with-provider'
        >
          <FontAwesomeIcon icon={faGithub as IconProp} /> {mode} with Github
        </button>
      )}
    </>
  );
};

ProviderButtons.defaultProps = defaultProps;

export default ProviderButtons;
