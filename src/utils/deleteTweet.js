import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import deleteReply from './deleteReply';

// delete tweet by tweet uid from firestore

const deleteTweet = async (tweetObj) => {
  try {
    if (tweetObj.aReplyTo) {
      // if a reply to another tweet
      await deleteReply(tweetObj.id, tweetObj.aReplyTo.id);
    } else {
      // delete tweet
      const tweetRef = doc(db, 'tweets', tweetObj.id);
      await deleteDoc(tweetRef);
    }

    return true;
  } catch (error) {
    console.error('Error deleting message from Firebase Database', error);
    return false;
  }
};

export default deleteTweet;
