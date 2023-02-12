import { auth } from '../firebase-config';

// Returns true if a user is signed-in.

export default function isUserSignedIn() {
  return !!auth.currentUser;
}
