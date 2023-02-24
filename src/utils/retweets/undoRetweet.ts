import { deleteDoc, doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { TweetObj } from '../../interfaces/TweetObj';
import { UserProfile } from '../../interfaces/UserProfile';
import getUserUid from '../user/getUserUid';

export default async (tweetObj: TweetObj, userProfile: UserProfile) => {
  try {
    // find retweet
    const index = userProfile.retweets?.findIndex(
      (item) => item.id === tweetObj.id
    )!;
    const retweet = userProfile.retweets?.[index]!;

    // delete retweet
    const tweetRef = doc(db, 'tweets', retweet.retweet_ID!);
    const tweetPromise = deleteDoc(tweetRef);

    // delete pointer in tweets>retweets
    const retweetRef = doc(
      db,
      'tweets',
      tweetObj.id,
      'retweets',
      retweet.retweet_ID!
    );
    const retweetPromise = deleteDoc(retweetRef);

    // const tweetPromise = deleteTweet(tweetObj);

    // delete retweet pointer in users>retweets
    const userRef = doc(db, 'users', getUserUid(), 'retweets', tweetObj.id);
    const userPromise = deleteDoc(userRef);

    await Promise.all([tweetPromise, retweetPromise, userPromise]);
    // decrement original tweets retweet by 1
    const tweetsRetweetsRef = doc(db, 'tweets', tweetObj.id);
    updateDoc(tweetsRetweetsRef, { retweets: increment(-1) });
  } catch (error) {
    console.log(error);
  }
};
