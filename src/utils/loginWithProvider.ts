import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import firebaseErrorMessage from './firebaseErrorMessages';
import setErrorMessage from './setErrorMessage';

export default async function loginWithProvider(providerName: string) {
  try {
    let provider;
    switch (providerName) {
      case 'google':
        provider = new GoogleAuthProvider();
        break;

      case 'github':
        provider = new GithubAuthProvider();
        break;

      default:
        throw Error('No provider');
    }
    const auth = getAuth();
    await signInWithPopup(auth, provider);

    return true;
  } catch (error: any) {
    const message = firebaseErrorMessage(error.code);

    setErrorMessage('.login-form .login-provider.error', message);

    return false;
  }
}
