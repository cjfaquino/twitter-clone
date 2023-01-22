import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyFooter from './MyFooter/MyFooter';

function MySidebar({ isSignedIn }) {
  return (
    <div id='sidebar'>
      {!isSignedIn && (
        <div className='sidebar-signup'>
          <Link to='/signup'>
            <button type='button' className='btn-sidebar-signup'>
              Sign Up
            </button>
          </Link>
        </div>
      )}
      <div id='who-to-follow'>Who To Follow</div>
      <MyFooter />
    </div>
  );
}

MySidebar.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

export default MySidebar;
