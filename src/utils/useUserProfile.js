import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';

function useUserProfile(userObj) {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const getUserProfile = () => {
    if (userObj) {
      const docRef = doc(db, 'users', userObj.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists() && profile !== docSnap.data()) {
          setProfile(docSnap.data());
        } else {
          // no user exists in firestore db users
          // create user profile
          navigate(`/signup/${userObj.uid}`);
        }
      });
    }
  };

  useEffect(() => {
    getUserProfile();
    document.addEventListener('profile edit', getUserProfile);

    return () => {
      setProfile(null);
      document.removeEventListener('profile edit', getUserProfile);
    };
  }, [userObj]);

  return [profile];
}

export default useUserProfile;
