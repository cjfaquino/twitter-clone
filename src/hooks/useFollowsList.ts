import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { UserProfile } from '../interfaces/UserProfile';
import { db } from '../firebase-config';
import getFollows from '../utils/follows/getFollows';
import getUpdatedUserByID from '../utils/user/getUpdatedUserByID';

export default function useFollowsList(
  typeOfList: string,
  userID: string
): [UserProfile[], boolean] {
  const [userList, setUserList] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const getListOfUsers = async (type: string) => {
    setLoading(true);
    try {
      const list = await getFollows(type, userID);

      const users = await Promise.all(list.map((id) => getUpdatedUserByID(id)));

      setUserList(users);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getListFollowersYouFollow = async (): Promise<
    DocumentData[] | void
  > => {
    setLoading(true);
    try {
      // get currentUsers following
      const following = await getFollows('following');

      // get list of target user's followers matching any in [following]
      const listRef = query(
        collection(db, 'users', userID, 'followers'),
        where('__name__', 'in', following)
      );
      const qSnap = await getDocs(listRef);

      const filtered = await Promise.all(
        qSnap.docs.map((item) => getUpdatedUserByID(item.id))
      );

      setUserList(filtered);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (typeOfList === 'followers_you_follow') {
      getListFollowersYouFollow();
    } else {
      getListOfUsers(typeOfList);
    }

    return () => {
      setUserList([]);
      setLoading(true);
    };
  }, [typeOfList, userID]);

  return [userList, loading];
}
