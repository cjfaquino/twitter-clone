import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const deletePointerTweet = async (
  collectionName: string,
  pointerID: string,
  mainTweetID: string
) => {
  try {
    // delete ref from sub-collection
    const replyRef = doc(db, 'tweets', mainTweetID, collectionName, pointerID);
    // delete actual tweet
    const tweetRef = doc(db, 'tweets', pointerID);

    await Promise.all([deleteDoc(replyRef), deleteDoc(tweetRef)]);
  } catch (error) {
    console.log(error);
  }
};

export default deletePointerTweet;
