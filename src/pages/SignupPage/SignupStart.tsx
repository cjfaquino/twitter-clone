import React, { useState } from 'react';
import { User } from 'firebase/auth';
import useInput from '../../hooks/useInput';
import HaveAnAccount from '../../components/HaveAnAccount';
import createUser from '../../utils/createUser';
import SubmitButton from '../../components/SubmitButton';

export interface IProps {
  currentUser: User | null;
}

const SignupStart = ({ currentUser }: IProps) => {
  const [email, handleEmail] = useInput(
    (currentUser && currentUser.email) || ''
  );
  const [password, handlePwd] = useInput();
  const [confirmPassword, handleConfirmPwd] = useInput();
  const [submitting, setSubmitting] = useState(false);

  const checkSamePass = () => password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkSamePass) return;

    setSubmitting(true);
    const created = await createUser(email, password);
    setSubmitting(false);

    if (!created) {
      // error
    }
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
          <label htmlFor='pwd'>
            Password
            <input
              type='password'
              id='pwd'
              value={password}
              onChange={handlePwd}
              disabled={!!currentUser}
              required
            />
          </label>
          <label htmlFor='confirm-pwd'>
            Confirm Password
            <input
              type='password'
              id='confirm-pwd'
              value={confirmPassword}
              onChange={handleConfirmPwd}
              disabled={!!currentUser}
              required
            />
          </label>
          <SubmitButton submitting={submitting} text='Continue' width={120} />
          <HaveAnAccount exists />
        </>
      )}
    </form>
  );
};

export default SignupStart;
