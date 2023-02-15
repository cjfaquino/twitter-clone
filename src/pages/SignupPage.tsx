import { User } from 'firebase/auth';
import React from 'react';
import SignupContinue from '../components/SignupContinue';
import SignupStart from '../components/SignupStart';

interface IProps {
  currentUser: User;
}

const SignupPage = ({ currentUser }: IProps) => (
  <div id='signup'>
    <SignupStart currentUser={currentUser} />
    {currentUser && <SignupContinue currentUser={currentUser} />}

    <p className='disclaimer'>
      <strong>Disclaimer:</strong> This project is for educational purposes only
      and is not intended for commercial use or to be relied upon for any
      practical applications. The information and materials presented here are
      for general informational purposes only and do not constitute any
      professional advice. The author and contributors make no representations
      or warranties of any kind, express or implied, about the completeness,
      accuracy, reliability, suitability or availability with respect to the
      information, products, services, or related graphics contained in this
      project for any purpose. Any reliance you place on such information is
      strictly at your own risk.
    </p>
  </div>
);

export default SignupPage;
