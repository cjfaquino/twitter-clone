import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { UserProfile } from '../interfaces/UserProfile';
import getUpdatedUserByID from '../utils/user/getUpdatedUserByID';

export default (tweetID: string): [UserProfile[], boolean] => {
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      setLoading(true);
      const likesRef = query(
        collection(db, 'tweets', tweetID, 'likes'),
        orderBy('likedAt', 'asc')
      );

      const qSnap = await getDocs(likesRef);
      const listPromise = qSnap.docs.map((usr) => getUpdatedUserByID(usr.id));

      const list = await Promise.all(listPromise);

      setUsers(list);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();

    return () => {
      setUsers([]);
    };
  }, [tweetID]);

  return [users as UserProfile[], loading];
};
