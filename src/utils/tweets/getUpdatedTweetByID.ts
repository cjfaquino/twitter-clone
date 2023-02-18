import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const getUpdatedTweetByID = async (tweetID: string) => {
  let tweet = null;
  const repRef = doc(db, 'tweets', tweetID);
  const repSnap = await getDoc(repRef);

  if (repSnap.exists()) {
    tweet = { id: repSnap.id, ...repSnap.data() };
  } else {
    console.log(`Tweet ${tweetID} does not exist`);
    tweet = { id: `null-${tweetID}`, USER_NAME: '[deleted]' };
  }

  return tweet;
};

export default getUpdatedTweetByID;
