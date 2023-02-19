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
    // clean up inputs
    setErrorMessage('.verify-password', '');
    setErrorMessage('.verify-confirm-password', '');
    setSubmitting(true);

    try {
      // will throw error if invalid
      validatePassword(password, confirmPassword);

      const created = await createUser(email, password);

      if (!created) {
        // error
      }
    } catch (er: unknown) {
      const error = er as Error;
      const errorName = error.name;
      const errorMessage = error.message;

      switch (errorName) {
        case 'Confirm Password Error':
          setErrorMessage('.verify-confirm-password', errorMessage);
          break;
        case 'Password Error':
          setErrorMessage('.verify-password', errorMessage);
          break;

        default:
          console.log(error);
          break;
      }
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className='sign-up-form'>
      <h2>Create your account</h2>

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
