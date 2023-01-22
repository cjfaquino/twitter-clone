import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

function useUserProfile(userObj) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (userObj) {
      const docRef = doc(db, 'users', userObj.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists() && profile !== docSnap.data()) {
          setProfile(docSnap.data());
        } else {
          // no user exists in firestore db users
          console.log('No such document!');
          // create user profile
        }
      });
    }

    return () => {
      setProfile(null);
    };
  }, [userObj]);

  return [profile];
}

export default useUserProfile;
