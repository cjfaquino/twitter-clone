import { AuthError, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase-config';
import firebaseErrorMessage from '../firebaseErrorMessages';
import getProvider from './getProvider';
import setErrorMessage from '../setErrorMessage';

export default async function loginWithProvider(providerName: string) {
  try {
    const provider = getProvider(providerName);

    await signInWithPopup(auth, provider);

    return true;
  } catch (error: unknown) {
    const message = firebaseErrorMessage((error as AuthError).code);

    setErrorMessage('.login-form .login-provider.error', message);

    return false;
  }
}
