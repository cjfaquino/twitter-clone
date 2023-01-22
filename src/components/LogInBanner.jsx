import React from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../firebase';

function LogInBanner() {
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
          <Link to='/signup'>
            <button type='button' className='btn-banner-signup'>
              Sign Up
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default LogInBanner;
