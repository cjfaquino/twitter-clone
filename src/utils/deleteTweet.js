import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

// delete tweet by tweet uid from firestore

const deleteTweet = async (tweetID) => {
  try {
    const tweet = doc(db, 'tweets', tweetID);
    await deleteDoc(tweet);
    return true;
  } catch (error) {
    console.error('Error deleting message from Firebase Database', error);
    return false;
  }
};

export default deleteTweet;
