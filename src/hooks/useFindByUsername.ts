import { useState, useEffect } from 'react';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '../firebase-config';
import { UserProfile } from './useUserProfile';

export default function useFindByUsername(username: string) {
  const [userProfile, setUserProfile] = useState({ id: 'no-id' });
  const [followers, setFollowers] = useState<UserProfile[]>([]);
  const [following, setFollowing] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getFollowers = async (userObj: UserProfile) => {
    const followersRef = collection(db, 'users', userObj.id, 'followers');
    const flrSnap = await getDocs(followersRef);
    flrSnap.forEach((item) => {
      setFollowers((prev) => [...prev, { id: item.id, ...item.data() }]);
    });
  };

  const getFollowing = async (userObj: UserProfile) => {
    const followingRef = collection(db, 'users', userObj.id, 'following');
    const flgSnap = await getDocs(followingRef);

    flgSnap.forEach((item) => {
      setFollowing((prev) => [...prev, { id: item.id, ...item.data() }]);
    });
  };

  const getUser = async () => {
    const usersRef = query(collection(db, 'users'));
    const uSnap = await getDocs(usersRef);
    uSnap.forEach(async (item) => {
      if (item.data().userName === username) {
        const userObj = { id: item.id, ...item.data() };
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

    return () => {
      setFollowers([]);
      setFollowing([]);
    };
  }, [username]);

  useEffect(() => {
    if (userProfile !== null) {
      localStorage.setItem(
        'targetUser',
        JSON.stringify({ userProfile, followers, following })
      );
    }
  }, [username, followers, following]);

  return {
    userProfile,
    followers,
    following,
    doneLoading: !loading && userProfile.id !== 'no-id',
  };
}
