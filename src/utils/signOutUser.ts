import { getAuth, signOut } from 'firebase/auth';

const signOutUser = () => {
  // Sign out of Firebase.
  signOut(getAuth());
};

export default signOutUser;
