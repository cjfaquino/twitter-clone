import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const LogInBanner = ({ isSignedIn }: { isSignedIn: boolean }) => (
  <>
    {!isSignedIn && (
      <div id='login-banner'>
        <ul>
          <li>
            <h2>Miss what&apos;s happening!</h2>
            <div>
              People on {import.meta.env.VITE_APP_NAME} are the last to know.
            </div>
          </li>
          <li className='logout'>
            <Link to='/login'>
              <button type='button' className='btn-banner-login'>
                Log In
              </button>
            </Link>
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
    )}

    <Outlet />
  </>
);

export default LogInBanner;
