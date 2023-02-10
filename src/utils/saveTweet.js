import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
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
    tags: tweet.tags,
    timestamp: tweet.timestamp,
    retweets: tweet.retweets,
    likes: tweet.likes,
    views: tweet.views,
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
    const tweetRef = collection(db, 'tweets').withConverter(tweetConverter);

    const tweet = new Tweet(messageText, aReplyTo);
    let docRef;

    if (aReplyTo) {
      // if is a reply
      // create new tweet
      docRef = await addDoc(tweetRef, tweet);

      // add to aReplyTo's replies collection
      const replyRef = doc(
        db,
        'tweets',
        aReplyTo.id,
        'replies',
        docRef.id
      ).withConverter(tweetConverter);
      setDoc(replyRef, tweet);
    } else {
      // create normal tweet
      docRef = await addDoc(tweetRef, { ...tweet, aReplyTo });
    }

    // return firebase doc id
    return docRef.id;
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
    return false;
  }
};

export default saveTweet;
