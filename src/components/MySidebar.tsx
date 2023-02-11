import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import MyFooter from './MyFooter/MyFooter';
import OrSeparator from './OrSeparator';
import GoogleIcon from '../assets/GoogleIcon';
import HaveAnAccount from './HaveAnAccount';
import loginWithProvider from '../utils/loginWithProvider';
import WhoToFollow from './WhoToFollow';

interface IProps {
  isSignedIn: boolean;
}

const MySidebar = ({ isSignedIn }: IProps) => {
  const handleSignUp = (name: string) => () => {
    loginWithProvider(name);
  };

  return (
    <div id='sidebar'>
      {!isSignedIn ? (
        <div className='sidebar-signup'>
          <h3>New to Twitter Clone?</h3>
          <p>Sign up now to get your own personalized timeline!</p>
          <button
            type='button'
            onClick={handleSignUp('google.com')}
            className='btn-with-provider'
          >
            <GoogleIcon /> Sign up with Google
          </button>
          <button
            type='button'
            onClick={handleSignUp('github.com')}
            className='btn-with-provider'
          >
            <FontAwesomeIcon icon={faGithub} /> Sign up with Github
          </button>
          <OrSeparator />
          <Link to='/signup'>
            <button type='button' className='btn-sidebar-signup'>
              Create account
            </button>
          </Link>
          <HaveAnAccount exists />
          <p>
            This is only a project for learning. Any feedback will help to
            improve your overall experience.
          </p>
        </div>
      ) : (
        <WhoToFollow />
      )}
      <MyFooter />
    </div>
  );
};

export default MySidebar;
