import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { db } from '../firebase-config';
import { UserProfile } from '../interfaces/UserProfile';

function useUserProfile(userObj: User | null): [UserProfile, boolean] {
  const noProfile = { id: 'no-id', doneLoading: false };
  const [profile, setProfile] = useState<UserProfile>(noProfile);
  const navigate = useNavigate();

  const getUserProfile = () => {
    if (userObj) {
      const docRef = doc(db, 'users', userObj.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists() && profile !== docSnap.data()) {
          setProfile({ id: docSnap.id, ...docSnap.data(), doneLoading: true });
        } else {
          // no user exists in firestore db users
          setProfile({ ...noProfile, doneLoading: true });
          // create user profile
          navigate(`/signup`);
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
