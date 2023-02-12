import {
  GoogleAuthProvider,
  GithubAuthProvider,
  linkWithPopup,
} from 'firebase/auth';
import eventProvider from '../events/eventProvider';
import { auth } from '../firebase-config';
import firebaseErrorMessage from './firebaseErrorMessages';
import setErrorMessage from './setErrorMessage';

export default async function linkWithProvider(providerName: string) {
  try {
    let provider;
    switch (providerName) {
      case 'google.com':
        provider = new GoogleAuthProvider();
        break;

      case 'github.com':
        provider = new GithubAuthProvider();
        break;

      default:
        throw Error('No provider');
    }

    const result = await linkWithPopup(auth.currentUser!, provider);

    // fire event on success
    eventProvider(providerName);

    return result.user;
  } catch (error: any) {
    const message = firebaseErrorMessage(error.code);

    setErrorMessage('.link-accounts > .error', message);
    return false;
  }
}
