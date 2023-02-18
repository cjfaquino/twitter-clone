import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

export default async (userID: string) => {
  const noProfile = { id: 'no-id', doneLoading: true };
  try {
    const userRef = doc(db, 'users', userID);

    const dSnap = await getDoc(userRef);

    if (dSnap.exists()) {
      return {
        id: dSnap.id,
        ...dSnap.data(),
        doneLoading: true,
        // for algolia 'users' index
        objectID: dSnap.id,
      };
    }
    console.log(`user ${userID} doesn't exist`);
    return noProfile;
  } catch (error) {
    console.log(error);

    return noProfile;
  }
};
