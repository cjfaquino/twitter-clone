import { useState, useEffect } from 'react';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function useFindByUsername(username) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const queryRef = query(collection(db, 'users'));

    getDocs(queryRef)
      .then((qSnap) => {
        qSnap.forEach((item) => {
          if (item.data().userName === username)
            setUserProfile({ id: item.id, ...item.data() });
        });
      })
      .catch((err) => console.log(err));

    return () => {};
  }, [username]);

  return [userProfile];
}
