import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

const deleteReply = async (replyID, mainTweetID) => {
  try {
    // delete ref from replies collection
    const replyRef = doc(db, 'tweets', mainTweetID, 'replies', replyID);
    // delete actual tweet
    const tweetRef = doc(db, 'tweets', replyID);

    await Promise.all([deleteDoc(replyRef), deleteDoc(tweetRef)]);
  } catch (error) {
    console.log(error);
  }
};

export default deleteReply;
