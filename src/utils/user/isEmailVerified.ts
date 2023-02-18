import { auth } from '../../firebase-config';
import isUserSignedIn from './isUserSignedIn';

export default function isEmailVerified() {
  if (!isUserSignedIn()) return undefined;
  return auth.currentUser!.emailVerified;
}
