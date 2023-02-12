import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { UserProfile } from '../interfaces/UserProfile';
import { db } from '../firebase-config';
import findDuplicatesByField from '../utils/findDuplicatesByField';
import getFollowers from '../utils/getFollowers';

export default function useFollowsList(typeOfList: string, userID: string) {
  const [userList, setUserList] = useState<UserProfile[]>([]);

  const getUser = async (
    targetID: string,
    skipSetList?: boolean | undefined
  ) => {
    try {
      const docRef = doc(db, 'users', targetID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const user = {
          id: docSnap.id,
          doneLoading: true,
          ...docSnap.data(),
          // for algolia 'users' index
          objectID: docSnap.id,
        };

        if (!skipSetList) {
          setUserList((prev) => [...prev, user]);
        }

        return user;
      }
    } catch (error) {
      console.log(error);
      return [];
    }
    return [];
  };

  const getListOfUsers = async (
    type: string,
    dontSetList?: boolean | undefined
  ) => {
    try {
      const queryRef = query(collection(db, 'users', userID, type));

      const qSnap = await getDocs(queryRef);
      const users = await Promise.all(
        qSnap.docs.map((item) => getUser(item.id, dontSetList))
      );
      return users;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getListFollowersYouFollow = async (): Promise<
    DocumentData[] | void
  > => {
    const [usersFollowers, targetsFollowers] = await Promise.all([
      getFollowers(),
      getListOfUsers('followers', true),
    ]);

    const filtered = findDuplicatesByField(
      usersFollowers,
      targetsFollowers,
      'id'
    );

    setUserList(filtered);
    return usersFollowers;
  };

  useEffect(() => {
    if (typeOfList !== 'followers_you_follow') {
      getListOfUsers(typeOfList);
    } else {
      getListFollowersYouFollow();
    }

    return () => {
      setUserList([]);
    };
  }, [typeOfList, userID]);

  return [userList];
}
