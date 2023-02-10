import { useState, useEffect } from 'react';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '../firebase-config';
import { UserProfile } from '../interfaces/UserProfile';
import getUserName from '../utils/getUserName';

export default function useFindByUsername(username: string) {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'no-id',
    doneLoading: false,
  });
  const [followers, setFollowers] = useState<UserProfile[]>([]);
  const [following, setFollowing] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getFollowers = async (userObj: UserProfile) => {
    const followersRef = collection(db, 'users', userObj.id, 'followers');
    const flrSnap = await getDocs(followersRef);
    flrSnap.forEach((item) => {
      setFollowers((prev) => [
        ...prev,
        { id: item.id, ...item.data(), doneLoading: true },
      ]);
    });
  };

  const getFollowing = async (userObj: UserProfile) => {
    const followingRef = collection(db, 'users', userObj.id, 'following');
    const flgSnap = await getDocs(followingRef);

    flgSnap.forEach((item) => {
      setFollowing((prev) => [
        ...prev,
        { id: item.id, ...item.data(), doneLoading: true },
      ]);
    });
  };

  const getUser = async () => {
    const usersRef = query(collection(db, 'users'));
    const uSnap = await getDocs(usersRef);
    uSnap.forEach(async (item) => {
      if (item.data().userName === username) {
        const userObj = { id: item.id, ...item.data(), doneLoading: true };
        await Promise.all([getFollowing(userObj), getFollowers(userObj)]);

        setLoading(false);
        setUserProfile(userObj);
      }
    });
    return undefined;
  };

  let ran = false;
  useEffect(() => {
    if (!ran) {
      getUser();
      ran = true;
    }

    if (username === getUserName()) {
      // only add listener if currentUser
      console.log('added listener');
      document.addEventListener('profile edit', getUser);
    }

    return () => {
      document.removeEventListener('profile edit', getUser);
      setUserProfile({
        id: 'no-id',
        doneLoading: false,
      });
      setFollowers([]);
      setFollowing([]);
    };
  }, [username]);

  return {
    userProfile,
    followers,
    following,
    doneLoading: !loading && userProfile.id !== 'no-id',
  };
}
