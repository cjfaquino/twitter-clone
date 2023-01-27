import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const doesProfileExist = async (userID) => {
  const userRef = doc(db, 'users', userID);

  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return true;
  }
  return false;
};

export default doesProfileExist;
