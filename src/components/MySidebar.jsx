import React from 'react';
import PropTypes from 'prop-types';
import MyFooter from './MyFooter/MyFooter';

function MySidebar({ toggleSignUpPopup, isSignedIn }) {
  return (
    <div id='sidebar'>
      {!isSignedIn && (
        <div className='sidebar-sign-up'>
          <button type='button' onClick={toggleSignUpPopup}>
            Sign Up
          </button>
        </div>
      )}
      <div id='who-to-follow'>Who To Follow</div>
      <MyFooter />
    </div>
  );
}

MySidebar.propTypes = {
  toggleSignUpPopup: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
};

export default MySidebar;
