import { sendEmailVerification, User } from 'firebase/auth';
import React, { ChangeEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputEmail from '../../components/InputEmail';
import SubmitButton from '../../components/SubmitButton';
import isEmailVerified from '../../utils/user/isEmailVerified';
import updateUserEmail from '../../utils/user/updateEmail';

interface IProps {
  email: string;
  handleEmail: ChangeEventHandler<HTMLInputElement>;
  currentUser: User | null;
}

const VerifyEmailForm = ({ email, handleEmail, currentUser }: IProps) => {
  const [submittingEmail, setSubmittingEmail] = useState(false);
  const navigate = useNavigate();

  const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittingEmail(true);
    const res = await updateUserEmail(email);
    setSubmittingEmail(false);

    if (res === 'auth/requires-recent-login') {
      navigate('/login', { state: { error: 'reauth' } });
    }
  };

  return (
    <form onSubmit={handleSubmitEmail} className='email-form'>
      <h2>Contact Details</h2>
      <span
        className={`verify-email verify ${isEmailVerified() ? 'success' : ''}`}
      >
        {isEmailVerified() ? (
          'verified ✓'
        ) : (
          <button
            type='button'
            onClick={() => sendEmailVerification(currentUser!)}
            className='btn-verify-email'
          >
            Verify email
          </button>
        )}
      </span>

      <InputEmail email={email} handleEmail={handleEmail} />

      <SubmitButton submitting={submittingEmail} text='Change' width={100} />
    </form>
  );
};

export default VerifyEmailForm;
