import { AuthError, reauthenticateWithPopup } from 'firebase/auth';
import { auth } from '../firebase-config';
import firebaseErrorMessage from './firebaseErrorMessages';
import getProvider from './getProvider';
import setErrorMessage from './setErrorMessage';

export default async (providerName: string, toggleLoginPopup: Function) => {
  try {
    const provider = getProvider(providerName);
    await reauthenticateWithPopup(auth.currentUser!, provider);
    toggleLoginPopup();
    return true;
  } catch (error: unknown) {
    const message = firebaseErrorMessage((error as AuthError).code);

    setErrorMessage('.login-form .login-provider.error', message);

    return false;
  }
};
