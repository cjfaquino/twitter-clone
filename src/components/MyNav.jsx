import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signOutUser, isUserSignedIn } from '../firebase';

function MyNav({ isSignedIn, currentUser, toggleTweetPopup }) {
  const handleClick = () => {
    if (isUserSignedIn()) {
      // show tweet popup
      toggleTweetPopup();
    } else {
      // show login popup
    }
  };

  return (
    <nav id='menubar'>
      <ul className='menu-list'>
        <li className='nav-home'>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <button type='button' onClick={handleClick} className='btn-nav-tweet'>
            Tweet
          </button>
        </li>
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
  toggleTweetPopup: PropTypes.func.isRequired,
};

MyNav.defaultProps = {
  isSignedIn: false,
  currentUser: { displayName: '' },
};

export default MyNav;
