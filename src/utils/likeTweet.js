import { doc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import eventProfileEdit from './eventProfileEdit';
import getUserUid from './getUserUid';

const likeTweet = async (tweetObj) => {
  // add tweet to like in user profile
  try {
    const likesRef = doc(db, 'users', getUserUid(), 'likes', tweetObj.id);
    const tweetRef = doc(db, 'tweets', tweetObj.id);

    // add to likes collection in users
    setDoc(likesRef, tweetObj);

    // update tweet document
    updateDoc(tweetRef, { likes: increment(1) });

    eventProfileEdit();
  } catch (error) {
    console.log(error);
  }
};

export default likeTweet;
