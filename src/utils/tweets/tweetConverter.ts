import { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import { TweetObj } from '../../interfaces/TweetObj';

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
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return data;
  },
};

export default tweetConverter;
