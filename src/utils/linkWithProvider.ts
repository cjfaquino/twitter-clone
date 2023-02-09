import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  linkWithPopup,
} from 'firebase/auth';
import firebaseErrorMessage from './firebaseErrorMessages';
import setErrorMessage from './setErrorMessage';

export default async function linkWithProvider(providerName: string) {
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
    const result = await linkWithPopup(auth.currentUser!, provider);
    return result.user;
  } catch (error: any) {
    const message = firebaseErrorMessage(error.code);

    setErrorMessage('.link-accounts > .error', message);
    return false;
  }
}
