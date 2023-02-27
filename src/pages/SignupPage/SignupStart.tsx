import React, { useState } from 'react';
import { User } from 'firebase/auth';
import useInput from '../../hooks/useInput';
import HaveAnAccount from '../../components/HaveAnAccount';
import createUser from '../../utils/user/createUser';
import SubmitButton from '../../components/SubmitButton';
import validatePassword from '../../utils/validatePassword';
import setErrorMessage from '../../utils/setErrorMessage';
import InputPasswordConfirm from '../../components/InputPasswordConfirm';
import InputEmail from '../../components/InputEmail';

export interface IProps {
  currentUser: User | null;
}

const SignupStart = ({ currentUser }: IProps) => {
  const [email, handleEmail] = useInput(
    (currentUser && currentUser.email) || ''
  );
  const [password, handlePassword] = useInput();
  const [confirmPassword, handleConfirmPassword] = useInput();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // clear errors on new try
    ['.verify-password', '.verify-confirm-password', '.verify-signup'].forEach(
      (item) => setErrorMessage(item, '')
    );
    setSubmitting(true);

    try {
      // will throw error if invalid
      validatePassword(password, confirmPassword);

      await createUser(email, password);
    } catch (er: unknown) {
      const error = er as Error;
      const errorName = error.name;
      const errorMessage = error.message;

      let errorCss = '';

      switch (errorName) {
        case 'FirebaseError':
          errorCss = 'verify-signup';
          break;

        case 'Confirm Password Error':
          errorCss = '.verify-confirm-password';
          break;
        case 'Password Error':
          errorCss = '.verify-password';
          break;

        default:
          console.log(error);
          break;
      }

      setErrorMessage(errorCss, errorMessage);
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className='sign-up-form'>
      <h2>Create your account</h2>
      <span className='verify-signup verify error' />

      <InputEmail
        email={email}
        handleEmail={handleEmail}
        disabled={!!currentUser}
      />

      {!currentUser && (
        <>
          <InputPasswordConfirm
            password={password}
            confirmPassword={confirmPassword}
            handlePassword={handlePassword}
            handleConfirmPassword={handleConfirmPassword}
          />

          <SubmitButton
            submitting={submitting}
            text='Continue'
            width={120}
            disabled={!(email && password && confirmPassword)}
          />
          <HaveAnAccount exists />
        </>
      )}
    </form>
  );
};

export default SignupStart;
