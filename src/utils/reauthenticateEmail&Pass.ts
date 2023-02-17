import {
  AuthError,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { auth } from '../firebase-config';
import firebaseErrorMessage from './firebaseErrorMessages';
import setErrorMessage from './setErrorMessage';

export default async (
  email: string,
  password: string,
  toggleLoginPopup: Function
) => {
  try {
    const credential = EmailAuthProvider.credential(email, password);

    await reauthenticateWithCredential(auth.currentUser!, credential);
    toggleLoginPopup();
    return true;
  } catch (error) {
    const message = firebaseErrorMessage((error as AuthError).code);

    setErrorMessage('.login-form .login-email.error', message);
    return false;
  }
};
