import { useState, useEffect } from 'react';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function useFindByUsername(username) {
  const tUser = JSON.parse(localStorage.getItem('targetUser'));

  const [userProfile, setUserProfile] = useState(tUser && tUser.userProfile);
  const [followers, setFollowers] = useState((tUser && tUser.followers) || []);
  const [following, setFollowing] = useState((tUser && tUser.following) || []);

  const getFollwers = async (userObj) => {
    const followersRef = collection(db, 'users', userObj.id, 'followers');
    const flrSnap = await getDocs(followersRef);
    flrSnap.forEach((item) => {
      setFollowers((prev) => [...prev, { id: item.id, ...item.data() }]);
    });
  };

  const getFollowing = async (userObj) => {
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
        await Promise.all([getFollowing(userObj), getFollwers(userObj)]);

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

    return () => {
      localStorage.removeItem('targetUser');
    };
  }, [username, followers, following]);

  return { userProfile, followers, following };
}
