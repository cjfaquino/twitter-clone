import { doc, deleteDoc } from 'firebase/firestore';
import { indexTweets } from '../algolia-config';
import { db } from '../firebase-config';
import { TweetObj } from '../interfaces/TweetObj';
import deleteReply from './deleteReply';

// delete tweet by tweet uid from firestore

const deleteTweet = async (tweetObj: TweetObj) => {
  try {
    if (tweetObj.aReplyTo) {
      // if a reply to another tweet
      await deleteReply(tweetObj.id, tweetObj.aReplyTo.id);
    } else {
      // delete tweet
      const tweetRef = doc(db, 'tweets', tweetObj.id);
      await deleteDoc(tweetRef);
    }

    // delete from algolia 'tweets' index
    indexTweets.deleteObject(
      (tweetObj.aReplyTo && tweetObj.aReplyTo.id) || tweetObj.id
    );

    return true;
  } catch (error) {
    console.error('Error deleting message from Firebase Database', error);
    return false;
  }
};

export default deleteTweet;
