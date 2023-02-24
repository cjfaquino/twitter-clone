import {
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
} from 'firebase/firestore';
import { TweetObj } from '../../interfaces/TweetObj';

// converts Tweet for firestore
const retweetConverter = {
  toFirestore: (tweet: TweetObj) => ({
    USER_ID: tweet.USER_ID,
    retweetedAt: serverTimestamp(),
  }),
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return data;
  },
};

export default retweetConverter;
