import {
  DocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
} from 'firebase/firestore';
import { UserProfile } from '../../interfaces/UserProfile';

const followsConverter = {
  toFirestore: (user: UserProfile) => ({
    id: user.id,
    followedAt: serverTimestamp(),
  }),
  fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return data;
  },
};

export default followsConverter;
