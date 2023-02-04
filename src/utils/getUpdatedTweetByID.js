import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const getUpdatedTweetByID = async (tweetID) => {
  let tweet = null;
  const repRef = doc(db, 'tweets', tweetID);
  const repSnap = await getDoc(repRef);

  if (repSnap.exists()) {
    tweet = { id: repSnap.id, ...repSnap.data() };
  } else console.log('Tweet does not exist');

  // replyingTo will be a tweetObj or null
  return tweet;
};

export default getUpdatedTweetByID;
