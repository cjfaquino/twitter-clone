import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAuth,
  signOut,
} from 'firebase/auth';

export const signInWithGooglePopup = async () => {
  // Sign in Firebase using popup auth and Google as the identity provider.
  const provider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(), provider);
};

export const signInWithEmailAndPass = async (email, password) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Signed in
    const { user } = userCredential;
    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const signOutUser = () => {
  // Sign out of Firebase.
  console.log(getAuth());
  signOut(getAuth());
};

// Returns the signed-in user's profile Pic URL.
export const getProfilePicUrl = () =>
  getAuth().currentUser.photoURL ||
  'https://firebasestorage.googleapis.com/v0/b/twitter-clone-a66e7.appspot.com/o/user-icon.png?alt=media&token=a38933c1-8fe4-4561-abd9-4423b25c88a2';

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
