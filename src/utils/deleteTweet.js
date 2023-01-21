import { doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase-config';
import deleteTweetFromDOM from './deleteTweetFromDOM';

// delete tweet by tweet uid from firestore

const deleteTweet = async (tweetObj) => {
  try {
    // delete tweet
    const tweetRef = doc(db, 'tweets', tweetObj.id);
    await deleteDoc(tweetRef);

    if (tweetObj.data.aReplyTo) {
      // if a reply to another tweet
      // remove reference from that tweet
      const aReplyToRef = doc(db, 'tweets', tweetObj.data.aReplyTo.id);
      await updateDoc(aReplyToRef, {
        replies: arrayRemove(tweetObj.id),
      });
    }

    deleteTweetFromDOM(tweetObj.id);
    return true;
  } catch (error) {
    console.error('Error deleting message from Firebase Database', error);
    return false;
  }
};

export default deleteTweet;
