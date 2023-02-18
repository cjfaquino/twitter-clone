import { User } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import InputPasswordConfirm from '../../components/InputPasswordConfirm';
import SubmitButton from '../../components/SubmitButton';
import useInput from '../../hooks/useInput';
import addPassword from '../../utils/auth/addPassword';
import setErrorMessage from '../../utils/setErrorMessage';
import updatePassword from '../../utils/auth/updatePassword';
import validatePassword from '../../utils/validatePassword';

interface IProps {
  toggleLoginPopup: Function;
  currentUser: User | null;
  emailProviderStatus: boolean | null;
  setEmailProvider: Function;
  email: string;
}

const ChangePasswordForm = ({
  toggleLoginPopup,
  currentUser,
  emailProviderStatus,
  setEmailProvider,
  email,
}: IProps) => {
  const [newPass, handleNewPass, setNewPass] = useInput();
  const [confirmNewPass, handleConfirmNewPass, setConfirmNewPass] = useInput();
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const passwordRef = useRef(null);

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (passwordRef.current! as HTMLElement).textContent = '';
    if (!currentUser) return;

    // clear error on try
    setErrorMessage('.verify-password', '');
    setErrorMessage('.verify-confirm-password', '');
    setSubmittingPassword(true);

    try {
      // will throw error if invalid
      validatePassword(newPass, confirmNewPass);

      let res;
      if (emailProviderStatus) {
        res = await updatePassword(currentUser, newPass, toggleLoginPopup);
      } else {
        res = await addPassword(currentUser, email, newPass, toggleLoginPopup);
      }

      if (res === true) {
        // cleanup inputs
        setNewPass('');
        setConfirmNewPass('');
        (passwordRef.current! as HTMLElement).textContent = `Successfully ${
          emailProviderStatus ? 'changed' : 'added'
        } password`;
        setEmailProvider(true);
      } else {
        // error code
        console.log(res);
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
    setSubmittingPassword(false);
  };

  return (
    <form className='change-password-form' onSubmit={handleSubmitPassword}>
      <h2>{emailProviderStatus ? 'Change' : 'Add'} password</h2>
      <InputPasswordConfirm
        password={newPass}
        confirmPassword={confirmNewPass}
        handlePassword={handleNewPass}
        handleConfirmPassword={handleConfirmNewPass}
      />
      <SubmitButton
        submitting={submittingPassword}
        text={emailProviderStatus ? 'Change' : 'Add'}
        width={100}
      />
      <div className='success-password success' ref={passwordRef} />
    </form>
  );
};

export default ChangePasswordForm;
