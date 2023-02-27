import { doc, increment, updateDoc } from 'firebase/firestore';
import { TweetObj } from '../../interfaces/TweetObj';
import { db } from '../../firebase-config';

const updateView = async (tweetObj: TweetObj) => {
  try {
    const tweetRef = doc(db, 'tweets', tweetObj.id);
    // increase view of tweet
    await updateDoc(tweetRef, { views: increment(1) });
  } catch (error) {
    console.log(error);
  }
};

export default updateView;
