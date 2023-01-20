import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase-config';

const updateTweet = async (tweetID, replyID) => {
  try {
    const docRef = doc(db, 'tweets', tweetID);
    await updateDoc(docRef, {
      replies: arrayUnion(replyID),
    });
  } catch (error) {
    console.log(error);
  }
};

export default updateTweet;
