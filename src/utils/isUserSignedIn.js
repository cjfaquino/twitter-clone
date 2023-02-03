import { getAuth } from 'firebase/auth';

// Returns true if a user is signed-in.

export default function isUserSignedIn() {
  return !!getAuth().currentUser;
}
