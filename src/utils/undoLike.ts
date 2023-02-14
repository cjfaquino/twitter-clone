import { deleteDoc, doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import eventProfileEdit from '../events/eventProfileEdit';
import getUserUid from './getUserUid';

const undoLike = async (
  tweetID: string,
  userID?: string | undefined,
  alreadyDeleted?: boolean
) => {
  try {
    // gets passed users's like
    // otherwise get current user's like
    const likesRef = doc(db, 'users', userID || getUserUid(), 'likes', tweetID);
    const tweetLikesRef = doc(
      db,
      'tweets',
      tweetID,
      'likes',
      userID || getUserUid()
    );
    const tweetRef = doc(db, 'tweets', tweetID);

    // remove liked tweetObj from users>likes collection
    deleteDoc(likesRef);
    deleteDoc(tweetLikesRef);

    if (!alreadyDeleted) {
      // update tweet document
      updateDoc(tweetRef, { likes: increment(-1) });
    }

    eventProfileEdit();
  } catch (error) {
    console.log(error);
  }
};

export default undoLike;
