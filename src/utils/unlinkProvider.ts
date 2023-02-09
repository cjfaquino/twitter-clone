import { getAuth, unlink } from 'firebase/auth';
import eventProvider from '../events/eventProvider';
import firebaseErrorMessage from './firebaseErrorMessages';
import setErrorMessage from './setErrorMessage';

export default function unlinkProvider(providerName: string) {
  const auth = getAuth();
  unlink(auth.currentUser!, providerName)
    .then(() => {
      // Auth provider unlinked from account
      // fire event
      eventProvider(providerName);
    })
    .catch((error) => {
      const message = firebaseErrorMessage(error.code);
      setErrorMessage('.error', message);
    });
}
