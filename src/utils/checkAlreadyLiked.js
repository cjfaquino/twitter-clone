import { doc, getDoc } from 'firebase/firestore';
import { getUserUid } from '../firebase';
import { db } from '../firebase-config';

const checkAlreadyLiked = async (tweetID) => {
  const userRef = doc(db, 'users', getUserUid(), 'likes', tweetID);

  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return true;
  }
  return false;
};

export default checkAlreadyLiked;
