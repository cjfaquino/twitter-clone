import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  faGear,
  faHashtag,
  faHomeUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { User } from 'firebase/auth';
import signOutUser from '../utils/signOutUser';
import useToggle from '../hooks/useToggle';
import ThreeDots from './ThreeDots';
import { UserProfile } from '../interfaces/UserProfile';

interface IProps {
  currentUser: User | null;
  userProfile: UserProfile;
  toggleTweetPopup: Function;
}

const MyNav = ({ currentUser, userProfile, toggleTweetPopup }: IProps) => {
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
    (toggleLogoutPopup as Function)();
  };

  return (
    <nav id='menubar'>
      <ul className='menu-list'>
        {currentUser && userProfile.id !== 'no-id' && (
          <li className='nav-list-item'>
            <NavLink to='/home'>
              <div className='link-item'>
                <FontAwesomeIcon icon={faHomeUser} />
                <span>Home</span>
              </div>
            </NavLink>
          </li>
        )}
        <li className='nav-list-item'>
          <NavLink to='/explore'>
            <div className='link-item'>
              <FontAwesomeIcon icon={faHashtag} />
              <span>Explore</span>
            </div>
          </NavLink>
        </li>
        {currentUser && userProfile.id !== 'no-id' ? (
          <>
            <li className='nav-list-item'>
              <NavLink to={`${userProfile.userName}`}>
                <div className='link-item'>
                  <FontAwesomeIcon icon={faUser} />
                  <span>Profile</span>
                </div>
              </NavLink>
            </li>
            <li className='nav-list-item'>
              <NavLink to='/settings'>
                <div className='link-item'>
                  <FontAwesomeIcon icon={faGear} />
                  <span>Settings</span>
                </div>
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
            <li className='nav-user'>
              <div
                className='nav-user-item'
                onClick={toggleLogoutPopup}
                aria-hidden='true'
              >
                <div className='nav-user-img-container img-container'>
                  <img
                    src={currentUser.photoURL!}
                    alt={currentUser.displayName!}
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
            </li>
          </>
        ) : (
          currentUser &&
          userProfile.doneLoading &&
          userProfile.id === 'no-id' && (
            <li className='nav-list-item'>
              <NavLink to='/signup/continue'>
                <div className='link-item'>
                  <FontAwesomeIcon icon={faUser} />
                  Continue sign-up
                </div>
              </NavLink>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default MyNav;
