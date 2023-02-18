import { unlink } from 'firebase/auth';
import eventProvider from '../../events/eventProvider';
import { auth } from '../../firebase-config';
import firebaseErrorMessage from '../firebaseErrorMessages';
import setErrorMessage from '../setErrorMessage';

export default function unlinkProvider(providerName: string) {
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
