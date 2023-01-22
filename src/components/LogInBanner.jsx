import React from 'react';
import PropTypes from 'prop-types';
import { signIn } from '../firebase';

function LogInBanner({ toggleSignUpPopup }) {
  return (
    <div id='login-banner'>
      <ul>
        <li>
          <h2>Miss what&apos;s happening!</h2>
          <div>People on Twtter Clone are the last to know.</div>
        </li>
        <li className='logout'>
          <button type='button' onClick={signIn} className='btn-banner-login'>
            Sign in with Google
          </button>
        </li>
        <li className='banner-signup'>
          <button
            type='button'
            onClick={toggleSignUpPopup}
            className='btn-banner-signup'
          >
            Sign Up
          </button>
        </li>
      </ul>
    </div>
  );
}

LogInBanner.propTypes = {
  toggleSignUpPopup: PropTypes.func.isRequired,
};

export default LogInBanner;
