import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import HaveAnAccount from '../components/HaveAnAccount';
import createUser from '../utils/createUser';
import SubmitButton from '../components/SubmitButton';

const SignUp = () => {
  const [email, handleEmail] = useInput();
  const [password, handlePwd] = useInput();
  const [confirmPassword, handleConfirmPwd] = useInput();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const checkSamePass = () => password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkSamePass) return;

    setSubmitting(true);
    const created = await createUser(email, password);
    setSubmitting(false);

    if (created) {
      navigate(`/signup/continue`);
    } else {
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
          required
        />
      </label>
      <label htmlFor='pwd'>
        Password
        <input
          type='password'
          id='pwd'
          value={password}
          onChange={handlePwd}
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
          required
        />
      </label>
      <SubmitButton submitting={submitting} text='Continue' width={120} />

      <HaveAnAccount exists />
      <p className='disclaimer'>
        <strong>Disclaimer</strong>: This project is for educational purposes
        only and is not intended for commercial use or to be relied upon for any
        practical applications. The information and materials presented here are
        for general informational purposes only and do not constitute any
        professional advice. The author and contributors make no representations
        or warranties of any kind, express or implied, about the completeness,
        accuracy, reliability, suitability or availability with respect to the
        information, products, services, or related graphics contained in this
        project for any purpose. Any reliance you place on such information is
        strictly at your own risk.
      </p>
    </form>
  );
};

export default SignUp;
