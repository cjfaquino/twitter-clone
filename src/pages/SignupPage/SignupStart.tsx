import React, { useState } from 'react';
import { User } from 'firebase/auth';
import useInput from '../../hooks/useInput';
import HaveAnAccount from '../../components/HaveAnAccount';
import createUser from '../../utils/createUser';
import SubmitButton from '../../components/SubmitButton';
import validatePassword from '../../utils/validatePassword';
import setErrorMessage from '../../utils/setErrorMessage';
import InputPasswordConfirm from '../../components/InputPasswordConfirm';

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
      const passCheck = validatePassword(password, confirmPassword);

      if (!passCheck.validity) {
        throw Error(passCheck.errorMessage);
      }

      const created = await createUser(email, password);

      if (!created) {
        // error
      }
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;

      if (errorMessage === 'should be matching') {
        setErrorMessage('.verify-confirm-password', errorMessage);
      } else {
        setErrorMessage('.verify-password', errorMessage);
      }
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className='sign-up-form'>
      <h2>Create your account</h2>
      <label htmlFor='email'>
        Email
        <input
          type='email'
          id='email'
          value={email}
          onChange={handleEmail}
          disabled={!!currentUser}
          required
        />
      </label>
      {!currentUser && (
        <>
          <InputPasswordConfirm
            password={password}
            confirmPassword={confirmPassword}
            handlePassword={handlePassword}
            handleConfirmPassword={handleConfirmPassword}
          />

          <SubmitButton submitting={submitting} text='Continue' width={120} />
          <HaveAnAccount exists />
        </>
      )}
    </form>
  );
};

export default SignupStart;
