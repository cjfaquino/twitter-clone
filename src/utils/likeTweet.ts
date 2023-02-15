import {
  doc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import eventProfileEdit from '../events/eventProfileEdit';
import { db } from '../firebase-config';
import { TweetObj } from '../interfaces/TweetObj';
import getUserUid from './getUserUid';

const likeTweet = async (tweetObj: TweetObj) => {
  // add tweet to like in user profile
  try {
    const likesRef = doc(db, 'users', getUserUid(), 'likes', tweetObj.id);
    const tweetLikesRef = doc(db, 'tweets', tweetObj.id, 'likes', getUserUid());
    const tweetRef = doc(db, 'tweets', tweetObj.id);

    // add to likes collection in users
    const userPromise = setDoc(likesRef, {
      ...tweetObj,
      likedAt: serverTimestamp(),
    });

    // update tweet document
    const tweetPromise = setDoc(tweetLikesRef, {
      id: getUserUid(),
      likedAt: serverTimestamp(),
    });

    await Promise.all([userPromise, tweetPromise]);

    updateDoc(tweetRef, { likes: increment(1) });

    eventProfileEdit();
  } catch (error) {
    console.log(error);
  }
};

export default likeTweet;
