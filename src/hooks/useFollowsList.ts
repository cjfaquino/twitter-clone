import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { UserProfile } from '../interfaces/UserProfile';
import { db } from '../firebase-config';
import findDuplicatesByField from '../utils/findDuplicatesByField';
import getFollowers from '../utils/follows/getFollowers';
import getFollows from '../utils/follows/getFollows';

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
      const list = await getFollows(type, userID);

      const users = await Promise.all(
        list.map((id) => getUser(id, dontSetList))
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
