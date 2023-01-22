import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../utils/useInput';

function SignUp({ toggleSignUpPopup }) {
  const [nameVal, handleName] = useInput();
  const [userVal, handleUser] = useInput();
  const [emailVal, handleEmail] = useInput();
  const [pwdVal, handlePwd] = useInput();
  const [confirmPwdVal, handleConfirmPwd] = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div id='popup-background' onClick={toggleSignUpPopup} aria-hidden />
      <div id='sign-up-popup'>
        <form onSubmit={handleSubmit} className='sign-up-form'>
          <div>Sign Up</div>
          <label htmlFor='displayName'>
            Display Name
            <input
              type='text'
              id='displayName'
              value={nameVal}
              onChange={handleName}
            />
          </label>
          <label htmlFor='userName'>
            Username
            <input
              type='text'
              id='useName'
              value={userVal}
              onChange={handleUser}
            />
          </label>
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
            <input
              type='password'
              id='pwd'
              value={pwdVal}
              onChange={handlePwd}
            />
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
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
}

SignUp.propTypes = {
  toggleSignUpPopup: PropTypes.func.isRequired,
};

export default SignUp;
