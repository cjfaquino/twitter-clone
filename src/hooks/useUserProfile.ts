import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { db } from '../firebase-config';

export interface UserProfile {
  id: string;
  displayName?: string;
  userName?: string;
  photoURL?: string;
}

function useUserProfile(userObj: User) {
  const noProfile = { id: 'no-id' };
  const [profile, setProfile] = useState<UserProfile>(noProfile);
  const navigate = useNavigate();

  const getUserProfile = () => {
    if (userObj) {
      const docRef = doc(db, 'users', userObj.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists() && profile !== docSnap.data()) {
          setProfile({ id: docSnap.id, ...docSnap.data() });
        } else {
          // no user exists in firestore db users
          // create user profile
          navigate(`/settings`);
        }
      });
    }
  };

  useEffect(() => {
    getUserProfile();
    document.addEventListener('profile edit', getUserProfile);

    return () => {
      setProfile(noProfile);
      document.removeEventListener('profile edit', getUserProfile);
    };
  }, [userObj]);

  return [profile, profile.id !== 'no-id'];
}

export default useUserProfile;
