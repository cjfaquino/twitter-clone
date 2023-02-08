import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { UserProfile } from '../interfaces/UserProfile';
import { db } from '../firebase-config';

export default function useFollowsList(typeOfList: string, userID: string) {
  const [userList, setUserList] = useState<UserProfile[]>([]);

  const getUser = async (targetID: string) => {
    try {
      const docRef = doc(db, 'users', targetID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserList((prev) => [
          ...prev,
          { id: docSnap.id, doneLoading: true, ...docSnap.data() },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getListOfUsers = async () => {
    try {
      const queryRef = query(collection(db, 'users', userID, typeOfList));

      const qSnap = await getDocs(queryRef);
      await Promise.all(qSnap.docs.map((item) => getUser(item.id)));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListOfUsers();

    return () => {
      setUserList([]);
    };
  }, [typeOfList, userID]);

  return [userList];
}
