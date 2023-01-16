import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

// delete reply by tweet id & reply id from firestore

const deleteReply = async (tweetID, replyID) => {
  try {
    const reply = doc(db, 'tweets', tweetID, 'replies', replyID);
    await deleteDoc(reply);
    return true;
  } catch (error) {
    console.error('Error deleting message from Firebase Database', error);
    return false;
  }
};

export default deleteReply;
