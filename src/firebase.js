import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

import { db } from './firebase-config';

export const signIn = async () => {
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
const getUserUid = () => getAuth().currentUser.uid;

// Returns true if a user is signed-in.
export function isUserSignedIn() {
  return !!getAuth().currentUser;
}

// Returns true if matching users
export const checkMatchingUser = (userID) => {
  if (!isUserSignedIn()) return false;
  return getUserUid() === userID;
};

// Save all tweets to tweets doc
export const saveTweet = async (messageText, setPrivacy = false) => {
  const uid = crypto.randomUUID();
  try {
    await setDoc(doc(db, 'tweets', uid), {
      uidTweet: uid,
      uidUser: getUserUid(),
      name: getDisplayName(),
      text: messageText,
      profilePicUrl: getProfilePicUrl(),
      timestamp: serverTimestamp(),
      privacy: setPrivacy,
    });
    return true;
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
    return false;
  }
};

// delete tweet by tweet uid from firestore
export const deleteTweet = async (tweetID) => {
  const tweet = doc(db, 'tweets', tweetID);
  try {
    await deleteDoc(tweet);
  } catch (error) {
    console.error('Error deleting message from Firebase Database', error);
  }
};

// Save all tweets to tweets doc
export const saveReply = async (tweetID, messageText) => {
  const uid = crypto.randomUUID();
  try {
    await setDoc(doc(db, 'tweets', tweetID, 'replies', uid), {
      uidReply: uid,
      uidUser: getUserUid(),
      name: getDisplayName(),
      text: messageText,
      profilePicUrl: getProfilePicUrl(),
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
    return false;
  }
};

// delete reply by tweet id & reply id from firestore
export const deleteReply = async (tweetID, replyID) => {
  const reply = doc(db, 'tweets', tweetID, 'replies', replyID);
  try {
    await deleteDoc(reply);
  } catch (error) {
    console.error('Error deleting message from Firebase Database', error);
  }
};
