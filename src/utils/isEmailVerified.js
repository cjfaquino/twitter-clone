import { getAuth } from 'firebase/auth';
import isUserSignedIn from './isUserSignedIn';

export default function isEmailVerified() {
  if (!isUserSignedIn()) return undefined;
  return getAuth().currentUser.emailVerified;
}
