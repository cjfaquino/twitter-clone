import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import Tweet from './Tweet';

// converts Tweet for firestore
const tweetConverter = {
  toFirestore: (tweet) => ({
    USER_ID: tweet.USER_ID,
    USER_NAME: tweet.USER_NAME,
    USER_DISPLAY: tweet.USER_DISPLAY,
    USER_ICON: tweet.USER_ICON,
    text: tweet.text,
    timestamp: tweet.timestamp,
    replies: tweet.replies,
    retweets: tweet.retweets,
    likes: tweet.likes,
    aReplyTo: tweet.aReplyTo,
  }),
  // fromFirestore: (snapshot, options) => {
  //   const data = snapshot.data(options);
  //   return data;
  // },
};

// Save all tweets to tweets doc

const saveTweet = async (messageText, aReplyTo = null) => {
  try {
    const collectionRef = collection(db, 'tweets').withConverter(
      tweetConverter
    );
    const docRef = await addDoc(
      collectionRef,
      new Tweet(messageText, aReplyTo)
    );

    return docRef.id;
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
    return false;
  }
};

export default saveTweet;
