import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../utils/useInput';
import createUser from '../utils/createUser';

function SignUp({ toggleSignUpPopup }) {
  const [emailVal, handleEmail] = useInput();
  const [pwdVal, handlePwd] = useInput();
  const [confirmPwdVal, handleConfirmPwd] = useInput();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await createUser(emailVal, pwdVal);
    setSubmitting(false);
    toggleSignUpPopup();
  };
  return (
    <div id='feed'>
      <form onSubmit={handleSubmit} className='sign-up-form'>
        <div>Sign Up</div>
        <label htmlFor='email'>
          Email
          <input
            type='text'
            id='email'
            value={emailVal}
            onChange={handleEmail}
          />
        </label>
        <label htmlFor='pwd'>
          Password
          <input type='password' id='pwd' value={pwdVal} onChange={handlePwd} />
        </label>
        <label htmlFor='confirm-pwd'>
          Confirm Password
          <input
            type='password'
            id='confirm-pwd'
            value={confirmPwdVal}
            onChange={handleConfirmPwd}
          />
        </label>
        <button type='submit'>{submitting ? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  );
}

SignUp.propTypes = {
  toggleSignUpPopup: PropTypes.func.isRequired,
};

export default SignUp;
