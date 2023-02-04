import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import signOutUser from '../utils/signOutUser';
import useToggle from '../hooks/useToggle';
import ThreeDots from './ThreeDots';

const MyNav = ({ currentUser, userProfile, toggleTweetPopup }) => {
  const [logoutPopup, toggleLogoutPopup] = useToggle();
  const navigate = useNavigate();

  const handleClick = () => {
    if (currentUser) {
      // show tweet popup
      toggleTweetPopup();
    } else {
      // go to login
      navigate('/login');
    }
  };

  const handleSignOut = () => {
    signOutUser();
    toggleLogoutPopup();
  };

  const styleNavLink = ({ isActive }) => ({
    color: isActive ? 'var(--theme-color)' : 'white',
  });

  return (
    <nav id='menubar'>
      <ul className='menu-list'>
        <li className='nav-explore'>
          <NavLink to='/explore' style={styleNavLink}>
            Explore
          </NavLink>
        </li>
        {userProfile && (
          <>
            <li className='nav-profile'>
              <NavLink to={`${userProfile.userName}`} style={styleNavLink}>
                Profile
              </NavLink>
            </li>
            <li className='nav-settings'>
              <NavLink to='/settings' style={styleNavLink}>
                Settings
              </NavLink>
            </li>
            <li>
              <button
                type='button'
                onClick={handleClick}
                className='btn-nav-tweet'
              >
                Tweet
              </button>
            </li>
          </>
        )}

        <li className='nav-user'>
          {currentUser && (
            <>
              <div
                className='nav-user-item'
                onClick={toggleLogoutPopup}
                aria-hidden='true'
              >
                <div className='nav-user-img-container img-container'>
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName}
                  />
                </div>
                <div>{currentUser.displayName}</div>
                <ThreeDots />
              </div>
              {logoutPopup && (
                <>
                  <div
                    className='options-background'
                    onClick={toggleLogoutPopup}
                    aria-hidden='true'
                  />
                  <div className='nav-options-popup popup'>
                    <button
                      type='button'
                      onClick={handleSignOut}
                      className='btn-nav-logout'
                    >
                      Log Out {currentUser.displayName}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

MyNav.propTypes = {
  currentUser: PropTypes.shape({
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
  userProfile: PropTypes.shape({
    userName: PropTypes.string,
  }),
  toggleTweetPopup: PropTypes.func.isRequired,
};

MyNav.defaultProps = {
  currentUser: { displayName: '' },
  userProfile: { userName: '' },
};

export default MyNav;
