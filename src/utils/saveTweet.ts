import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { indexTweets } from '../algolia-config';
import { db } from '../firebase-config';
import { TweetObj } from '../interfaces/TweetObj';
import Tweet from './Tweet';

// converts Tweet for firestore
const tweetConverter = {
  toFirestore: (tweet: TweetObj) => ({
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

const saveTweet = async (
  messageText: string,
  aReplyTo: TweetObj | null = null
) => {
  try {
    const tweetRef = collection(db, 'tweets').withConverter(tweetConverter);

    let tweet = new Tweet(messageText, aReplyTo);
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
      console.log(tweet, { ...tweet, aReplyTo });
      tweet = { ...tweet, aReplyTo };
      docRef = await addDoc(tweetRef, tweet);
    }

    // add to algolia 'tweets' index
    const timeInSeconds = new Date().getTime() / 1000;
    indexTweets.saveObject({
      ...tweet,
      objectID: docRef.id,
      timestamp: { seconds: timeInSeconds },
    });

    // return firebase doc id
    return docRef.id;
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
    return false;
  }
};

export default saveTweet;
