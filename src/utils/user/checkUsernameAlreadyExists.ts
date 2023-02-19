import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../firebase-config';

const checkUserNameAlreadyExists = async (name: string): Promise<boolean> => {
  try {
    const queryRef = query(
      collection(db, 'users'),
      where('userName', '==', name)
    );

    const qSnap = await getDocs(queryRef);
    return Boolean(qSnap.docs.length);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default checkUserNameAlreadyExists;
