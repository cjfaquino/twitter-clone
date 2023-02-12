import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function useRandomUsers() {
  const [users, setUsers] = useState<Object[]>([]);
  const [loading, setLoading] = useState(true);

  const shuffle = (array: Object[]) => array.sort(() => Math.random() - 0.5);

  const getUsers = async () => {
    try {
      const queryRef = query(collection(db, 'users'), limit(3));
      const qSnap = await getDocs(queryRef);

      const userArr = qSnap.docs.map((item) => ({
        id: item.id,
        ...item.data(),
        doneLoading: true,
        // for algolia
        objectID: item.id,
      }));

      const shuffled = shuffle(userArr);
      setUsers(shuffled);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  let ran = false;
  useEffect(() => {
    if (!ran) {
      getUsers();
      ran = true;
    }

    return () => {
      setUsers([]);
      setLoading(true);
    };
  }, []);

  return [users, loading];
}
