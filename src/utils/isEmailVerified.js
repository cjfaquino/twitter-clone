import { getAuth } from 'firebase/auth';
import { isUserSignedIn } from '../firebase';

export default function isEmailVerified() {
  if (!isUserSignedIn()) return undefined;
  return getAuth().currentUser.emailVerified;
}
