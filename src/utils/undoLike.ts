import { deleteDoc, doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import eventProfileEdit from '../events/eventProfileEdit';
import getUserUid from './getUserUid';
import { TweetObj } from '../interfaces/TweetObj';

const undoLike = async (tweetObj: TweetObj) => {
  try {
    const likesRef = doc(db, 'users', getUserUid(), 'likes', tweetObj.id);
    const tweetLikesRef = doc(db, 'tweets', tweetObj.id, 'likes', getUserUid());
    const tweetRef = doc(db, 'tweets', tweetObj.id);

    // remove liked tweetObj from users>likes collection
    deleteDoc(likesRef);
    deleteDoc(tweetLikesRef);

    // update tweet document
    updateDoc(tweetRef, { likes: increment(-1) });

    eventProfileEdit();
  } catch (error) {
    console.log(error);
  }
};

export default undoLike;
