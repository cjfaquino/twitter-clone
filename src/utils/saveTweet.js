import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import Tweet from './Tweet';

// converts Tweet for firestore
const tweetConverter = {
  toFirestore: (tweet) => ({
    USER_ID: tweet.USER_ID,
    USER_NAME: tweet.USER_NAME,
    USER_ICON: tweet.USER_ICON,
    text: tweet.text,
    timestamp: tweet.timestamp,
    privacy: tweet.privacy,
  }),
  // fromFirestore: (snapshot, options) => {
  //   const data = snapshot.data(options);
  //   return data;
  // },
};

// Save all tweets to tweets doc

const saveTweet = async (messageText, setPrivacy = false) => {
  try {
    const collectionRef = collection(db, 'tweets').withConverter(
      tweetConverter
    );
    const docRef = await addDoc(
      collectionRef,
      new Tweet(messageText, setPrivacy)
    );
    return docRef.id;
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
    return false;
  }
};

export default saveTweet;
