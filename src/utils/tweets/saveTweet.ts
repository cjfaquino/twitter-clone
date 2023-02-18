import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { indexTweets } from '../../algolia-config';
import { db } from '../../firebase-config';
import { TweetObj } from '../../interfaces/TweetObj';
import Tweet from '../../classes/Tweet';
import tweetConverter from './tweetConverter';
import replyConverter from './replyConverter';

// Save all tweets to tweets doc

const saveTweet = async (
  messageText: string,
  aReplyTo: TweetObj | null = null
) => {
  try {
    // ref for original tweet
    const tweetRef = collection(db, 'tweets').withConverter(tweetConverter);

    let tweet = new Tweet(messageText, aReplyTo);
    let docRef;

    if (aReplyTo) {
      // if is a reply
      // create new tweet
      docRef = await addDoc(tweetRef, tweet);

      // add to aReplyTo's replies collection pointing to original
      const replyRef = doc(
        db,
        'tweets',
        aReplyTo.id,
        'replies',
        docRef.id
      ).withConverter(replyConverter);
      setDoc(replyRef, tweet);
    } else {
      // create normal tweet
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
