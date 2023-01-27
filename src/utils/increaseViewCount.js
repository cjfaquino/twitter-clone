import { doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const increaseViewCount = async (tweetObj) => {
  // add tweet to like in user profile
  try {
    const tweetRef = doc(db, 'tweets', tweetObj.id);
    // update tweet document
    updateDoc(tweetRef, { views: increment(1) });
  } catch (error) {
    console.log(error);
  }
};

export default increaseViewCount;
