import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { UserProfile } from '../interfaces/UserProfile';

function useUserProfile(userID: string | null): [UserProfile, boolean] {
  const noProfile = { id: 'no-id', doneLoading: false };
  const [profile, setProfile] = useState<DocumentData>(noProfile);
  const navigate = useNavigate();

  const getUserProfile = async () => {
    if (!userID) return undefined;

    const docRef = doc(db, 'users', userID);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && profile !== docSnap.data()) {
      return { id: docSnap.id, ...docSnap.data() };
    }

    // no user exists in firestore db users
    setProfile({ ...noProfile, doneLoading: true });
    // create user profile
    navigate(`/signup`);

    return { ...noProfile, doneLoading: true };
  };

  const getLikes = async () => {
    if (!userID) return undefined;

    const queryRef = query(collection(db, 'users', userID, 'likes'));

    const qSnap = await getDocs(queryRef);

    return qSnap.docs.map((item) => item.data());
  };

  const getRetweets = async () => {
    if (!userID) return undefined;

    const queryRef = query(collection(db, 'users', userID, 'retweets'));

    const qSnap = await getDocs(queryRef);

    return qSnap.docs.map((item) => ({ id: item.id, ...item.data() }));
  };

  const getUser = async () => {
    if (userID) {
      const [fetchedProfile, fetchedLikes, fetchedRetweets] = await Promise.all(
        [getUserProfile(), getLikes(), getRetweets()]
      );

      const finished = {
        ...fetchedProfile,
        doneLoading: true,
        likes: fetchedLikes,
        retweets: fetchedRetweets,
      };

      setProfile(finished);
    }
  };

  useEffect(() => {
    getUser();
    document.addEventListener('profile edit', getUser);

    return () => {
      setProfile(noProfile);
      document.removeEventListener('profile edit', getUser);
    };
  }, [userID]);

  return [profile as UserProfile, profile.id !== 'no-id'];
}

export default useUserProfile;
