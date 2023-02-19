import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase-config';
import useInput from '../hooks/useInput';
import SubmitButton from './SubmitButton';

const ResetPasswordPopup = ({
  toggleResetPopup,
}: {
  toggleResetPopup: React.MouseEventHandler<Element>;
}) => {
  const [email, handleEmail] = useInput();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSubmitting(false);
        toggleResetPopup(e as React.MouseEvent);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div id='popup-background' aria-hidden onClick={toggleResetPopup} />
      <div id='reset-password'>
        <button type='button' className='btn-cancel' onClick={toggleResetPopup}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <h2>Reset your password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='reset-email'>
            Email
            <input
              type='email'
              name='email'
              id='reset-email'
              value={email}
              onChange={handleEmail}
            />
          </label>
          <SubmitButton
            submitting={submitting}
            text='Send'
            width={85}
            disabled={!email}
          />
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPopup;
