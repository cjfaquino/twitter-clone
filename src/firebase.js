import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from 'firebase/auth';
import { setDoc, serverTimestamp } from 'firebase/firestore';

export const signInWithGooglePopup = async () => {
  // Sign in Firebase using popup auth and Google as the identity provider.
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
};

export const signOutUser = () => {
  // Sign out of Firebase.
  console.log(getAuth());
  signOut(getAuth());
};

// Returns the signed-in user's profile Pic URL.
export const getProfilePicUrl = () =>
  getAuth().currentUser.photoURL || 'add placeholder img here';

// Returns the signed-in user's display name.
export const getDisplayName = () => getAuth().currentUser.displayName;

// Returns the signed-in user's display name.
export const getUserUid = () => getAuth().currentUser.uid;

// Returns true if a user is signed-in.
export function isUserSignedIn() {
  return !!getAuth().currentUser;
}

// Returns true if matching users
export const checkMatchingUser = (userID) => {
  if (!isUserSignedIn()) return false;
  return getUserUid() === userID;
};
