import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import getUserUid from '../user/getUserUid';

export default async (type: string, userID?: string) => {
  const listRef = collection(db, 'users', userID || getUserUid(), type);

  const qSnap = await getDocs(listRef);
  const users = qSnap.docs.map((item) => item.id);

  return users;
};
