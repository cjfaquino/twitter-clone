import React from 'react';
import PropTypes from 'prop-types';
import { signOutUser } from '../firebase';

function MyNav({ isSignedIn, currentUser }) {
  return (
    <nav>
      <ul>
        <li>stuff</li>
        <li className='nav-user'>{currentUser && currentUser.displayName}</li>
        {isSignedIn && (
          <li>
            <button type='button' onClick={signOutUser}>
              Log Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

MyNav.propTypes = {
  isSignedIn: PropTypes.bool,
  currentUser: PropTypes.shape({
    displayName: PropTypes.string,
  }),
};

MyNav.defaultProps = {
  isSignedIn: false,
  currentUser: { displayName: '' },
};

export default MyNav;
