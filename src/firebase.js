import { getAuth, signOut } from 'firebase/auth';

export const signOutUser = () => {
  // Sign out of Firebase.
  signOut(getAuth());
};

// Returns the signed-in user's profile Pic URL.
export const getProfilePicUrl = () =>
  getAuth().currentUser.photoURL ||
  'https://firebasestorage.googleapis.com/v0/b/twitter-clone-a66e7.appspot.com/o/user-icon.png?alt=media&token=a38933c1-8fe4-4561-abd9-4423b25c88a2';

// Returns the signed-in user's display name.
export const getDisplayName = () => getAuth().currentUser.displayName;

// Returns the signed-in user's display name.
export const getUserUid = async () => {
  const cUser = JSON.parse(localStorage.getItem('firebaseUser'));

  return cUser ? cUser.uid : getAuth().currentUser.uid;
};

// Returns true if a user is signed-in.
export function isUserSignedIn() {
  return !!getAuth().currentUser;
}

// Returns true if matching users
export const checkMatchingUser = (userID) => {
  if (!isUserSignedIn()) return false;
  return getUserUid() === userID;
};
