import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore';

import { db } from './firebase-config';
import Reply from './utils/Reply';
import Tweet from './utils/Tweet';

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

// converts Tweet for firestore
const tweetConverter = {
  toFirestore: (tweet) => ({
    USER_ID: tweet.USER_ID,
    USER_NAME: tweet.USER_NAME,
    USER_ICON: tweet.USER_ICON,
    text: tweet.text,
    timestamp: tweet.timestamp,
    privacy: tweet.privacy,
  }),
  // fromFirestore: (snapshot, options) => {
  //   const data = snapshot.data(options);
  //   return data;
  // },
};

// Save all tweets to tweets doc
export const saveTweet = async (messageText, setPrivacy = false) => {
  try {
    const collectionRef = collection(db, 'tweets').withConverter(
      tweetConverter
    );
    const docRef = await addDoc(
      collectionRef,
      new Tweet(messageText, setPrivacy)
    );
    return docRef.id;
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
    return false;
  }
};

// delete tweet by tweet uid from firestore
export const deleteTweet = async (tweetID) => {
  try {
    const tweet = doc(db, 'tweets', tweetID);
    await deleteDoc(tweet);
    return true;
  } catch (error) {
    console.error('Error deleting message from Firebase Database', error);
    return false;
  }
};

// converts Reply for firestore
const replyConverter = {
  toFirestore: (reply) => ({
    USER_ID: reply.USER_ID,
    USER_NAME: reply.USER_NAME,
    USER_ICON: reply.USER_ICON,
    text: reply.text,
    timestamp: reply.timestamp,
  }),
  // fromFirestore: (snapshot, options) => {
  //   const data = snapshot.data(options);
  //   return data;
  // },
};

// Save all replies to tweets doc
export const saveReply = async (tweetID, messageText) => {
  try {
    const collectionRef = collection(
      db,
      'tweets',
      tweetID,
      'replies'
    ).withConverter(replyConverter);
    const docRef = await addDoc(collectionRef, new Reply(messageText));
    return docRef.id;
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
    return false;
  }
};

// delete reply by tweet id & reply id from firestore
export const deleteReply = async (tweetID, replyID) => {
  try {
    const reply = doc(db, 'tweets', tweetID, 'replies', replyID);
    await deleteDoc(reply);
    return true;
  } catch (error) {
    console.error('Error deleting message from Firebase Database', error);
    return false;
  }
};
