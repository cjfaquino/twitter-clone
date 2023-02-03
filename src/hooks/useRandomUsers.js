import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function useRandomUsers() {
  const [users, setUsers] = useState([]);

  // todo make random
  let count = 0;

  useEffect(() => {
    const getUsers = async () => {
      const queryRef = query(collection(db, 'users'), limit(3));
      const qSnap = await getDocs(queryRef);

      qSnap.forEach((item) =>
        setUsers((prev) => [...prev, { id: item.id, ...item.data() }])
      );
    };

    if (count > 0) {
      getUsers();
    }

    count += 1;
  }, []);

  return users;
}
