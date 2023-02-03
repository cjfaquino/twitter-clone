import { deleteDoc, doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import eventProfileEdit from './eventProfileEdit';
import getUserUid from './getUserUid';

const undoLike = async (tweetObj) => {
  try {
    const likesRef = doc(db, 'users', getUserUid(), 'likes', tweetObj.id);
    const tweetRef = doc(db, 'tweets', tweetObj.id);

    // remove liked tweetObj from users>likes collection
    deleteDoc(likesRef);

    // update tweet document
    updateDoc(tweetRef, { likes: increment(-1) });

    eventProfileEdit();
  } catch (error) {
    console.log(error);
  }
};

export default undoLike;
