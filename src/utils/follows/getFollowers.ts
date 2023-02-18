import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import getUserUid from '../getUserUid';
import isUserSignedIn from '../isUserSignedIn';

export default async function getFollowers(): Promise<DocumentData[]> {
  try {
    if (!isUserSignedIn()) throw Error('Must be signed-in to get followers');

    const queryRef = collection(db, 'users', getUserUid(), 'following');
    const qSnap = await getDocs(queryRef);

    const users = qSnap.docs.map((item) => ({
      id: item.id,
      ...item.data(),
      // for algolia 'users' index
      objectID: item.id,
    }));

    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
}
