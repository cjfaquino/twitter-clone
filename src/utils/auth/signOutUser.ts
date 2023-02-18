import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';

const signOutUser = () => {
  // Sign out of Firebase.
  signOut(auth);
};

export default signOutUser;
