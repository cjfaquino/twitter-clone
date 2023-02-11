import { useState, useEffect } from 'react';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '../firebase-config';
import { UserProfile } from '../interfaces/UserProfile';

export default function useFindByUsername(username: string) {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'no-id',
    doneLoading: false,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const getUser = async () => {
    const usersRef = query(collection(db, 'users'));
    const uSnap = await getDocs(usersRef);
    uSnap.forEach(async (item) => {
      if (item.data().userName === username) {
        const userObj = { id: item.id, ...item.data(), doneLoading: true };

        setUserProfile(userObj);
        setLoading(false);
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

    // things that will refresh profile page
    // local follow changes
    // editing current user profile
    document.addEventListener('profile edit', getUser);

    return () => {
      document.removeEventListener('profile edit', getUser);
      setUserProfile({
        id: 'no-id',
        doneLoading: false,
      });
    };
  }, [username]);

  return {
    userProfile,
    doneLoading: !loading && userProfile.id !== 'no-id',
  };
}
