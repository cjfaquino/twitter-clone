import { db } from '../firebase-config';
import { collection, query, getDocs, where } from 'firebase/firestore';

const checkUserNameAlreadyExists = async (name: string): Promise<boolean> => {
  const queryRef = query(
    collection(db, 'users'),
    where('userName', '==', name)
  );

  const qSnap = await getDocs(queryRef);

  return Boolean(qSnap.docs.length);
};

export default checkUserNameAlreadyExists;
