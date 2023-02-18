import { AuthError, sendEmailVerification, User } from 'firebase/auth';
import React, { ChangeEventHandler, useState } from 'react';
import InputEmail from '../../components/InputEmail';
import SubmitButton from '../../components/SubmitButton';
import isEmailVerified from '../../utils/user/isEmailVerified';
import updateUserEmail from '../../utils/user/updateEmail';

interface IProps {
  email: string;
  handleEmail: ChangeEventHandler<HTMLInputElement>;
  currentUser: User | null;
  toggleLoginPopup: Function;
}

const VerifyEmailForm = ({
  email,
  handleEmail,
  currentUser,
  toggleLoginPopup,
}: IProps) => {
  const [submittingEmail, setSubmittingEmail] = useState(false);

  const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmittingEmail(true);
      await updateUserEmail(email);
      sendEmailVerification(currentUser!);
    } catch (error) {
      const errorCode = (error as AuthError).message;
      // error
      switch (errorCode) {
        case 'auth/requires-recent-login':
          toggleLoginPopup();
          break;

        default:
          break;
      }
    }
    setSubmittingEmail(false);
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
