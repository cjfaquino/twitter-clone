import React from 'react';
import { Link } from 'react-router-dom';
import MyFooter from './MyFooter/MyFooter';
import useRandomUsers from '../hooks/useRandomUsers';
import ListOfUsers from './ListOfUsers';
import OrSeparator from './OrSeparator';
import GoogleIcon from './GoogleIcon';
import HaveAnAccount from './HaveAnAccount';

interface IProps {
  isSignedIn: boolean;
}

const MySidebar = ({ isSignedIn }: IProps) => {
  const users = useRandomUsers();

  return (
    <div id='sidebar'>
      {!isSignedIn ? (
        <div className='sidebar-signup'>
          <h3>New to Twitter Clone?</h3>
          <p>Sign up now to get your own personalized timeline!</p>
          <button type='button' className='btn-with-provider'>
            <GoogleIcon /> Sign up with Google
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
        <div id='who-to-follow'>
          <h3>Who To Follow</h3>
          <ListOfUsers users={users} compact />
        </div>
      )}
      <MyFooter />
    </div>
  );
};

export default MySidebar;
