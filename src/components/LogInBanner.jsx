import React from 'react';

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
      </ul>
    </div>
  );
}

export default LogInBanner;
