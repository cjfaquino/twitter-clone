import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import loginWithEmailAndPass from '../utils/loginWithEmail&Pass';
import setErrorMessage from '../utils/setErrorMessage.js';
import OrSeparator from '../components/OrSeparator';
import HaveAnAccount from '../components/HaveAnAccount';
import ProviderButtons from '../components/ProviderButtons';
import useToggle from '../hooks/useToggle';
import ResetPasswordPopup from '../components/ResetPasswordPopup';
import SubmitButton from '../components/SubmitButton';
import useWindowTitle from '../hooks/useWindowTitle';
import reauthenticateEmailPass from '../utils/reauthenticateEmail&Pass';
import InputPasswordConfirm from '../components/InputPasswordConfirm';
import InputEmail from '../components/InputEmail';

interface IProps {
  google?: boolean | null;
  github?: boolean | null;
  email?: boolean | null;
  asPopup?: boolean;
  reauthenticate?: boolean;
  toggleLoginPopup?: React.MouseEventHandler<Element>;
}

const defaultProps = {
  google: false,
  github: false,
  email: false,
  asPopup: false,
  reauthenticate: false,
  toggleLoginPopup: () => {},
};

const Login = ({
  asPopup,
  reauthenticate,
  toggleLoginPopup,
  google,
  github,
  email,
}: IProps) => {
  useWindowTitle('Log In');
  const [emailVal, handleEmail] = useInput();
  const [passwordVal, handlePassword] = useInput();
  const [submitting, setSubmitting] = useState(false);
  const [showResetPopup, toggleResetPopup] = useToggle();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);

    let result;
    if (reauthenticate) {
      await reauthenticateEmailPass(emailVal, passwordVal, toggleLoginPopup!);
    } else {
      result = await loginWithEmailAndPass(emailVal, passwordVal);
    }

    setSubmitting(false);

    if (result) navigate('/');
    else {
      // error
    }
  };

  const showSeparator = (email && github) || (email && google);

  useEffect(() => {
    if (location.state) {
      let message;
      switch (location.state.error) {
        case 'reauth':
          message = 'Please re-authenticate before continuing.';
          break;

        case 'no-login':
          message = 'You must be signed in to continue.';
          break;

        default:
          message = 'Something went wrong. Please try again.';
          break;
      }

      setErrorMessage('.login-form .error', message);
    }

    return () => {};
  }, [location.state]);

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        {reauthenticate && <h2>Re-authenticate before continuing</h2>}
        <div className='login-provider error' />
        <ProviderButtons
          mode='Log in'
          reauthenticate={reauthenticate}
          toggleLoginPopup={toggleLoginPopup}
          google={google}
          github={github}
        />
        {showSeparator && <OrSeparator />}
        {email && (
          <>
            <div className='login-email error' />

            <InputEmail email={emailVal} handleEmail={handleEmail} />

            <InputPasswordConfirm
              password={passwordVal}
              handlePassword={handlePassword}
              noConfirm
            />
            <span className='forgot-password'>
              Forgot your password?
              <button
                type='button'
                className='btn-reset-pass'
                onClick={toggleResetPopup}
              >
                Reset
              </button>
            </span>
            <SubmitButton submitting={submitting} text='Log In' width={100} />
            {!asPopup && <HaveAnAccount />}
          </>
        )}
      </form>
      {showResetPopup && (
        <ResetPasswordPopup toggleResetPopup={toggleResetPopup} />
      )}
    </div>
  );
};

Login.defaultProps = defaultProps;

export default Login;
