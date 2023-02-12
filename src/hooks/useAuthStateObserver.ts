import { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  getAuth,
  User,
  NextOrObserver,
} from 'firebase/auth';
import useUserProfile from './useUserProfile';
import { UserProfile } from '../interfaces/UserProfile';
import { auth } from '../firebase-config';

function useAuthStateObserver(): [User | null, UserProfile] {
  // will be null when signed out
  const cUser: User | null = JSON.parse(localStorage.getItem('firebaseUser')!);

  const [currentUser, setCurrentUser] = useState<User | null>(cUser);
  const [userProfile] = useUserProfile(currentUser);

  const authStateObserver = (user: User) => {
    if (user) {
      // User is signed in!
      setCurrentUser(user);
      localStorage.setItem('firebaseUser', JSON.stringify(user.toJSON()));
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    } else {
      // User is signed out!
      setCurrentUser(null);
      localStorage.removeItem('firebaseUser');
      localStorage.removeItem('userProfile');
    }
    const event = new Event('auth state changed');
    document.dispatchEvent(event);
  };

  useEffect(() => {
    // Listen to auth state changes.
    const unsub = onAuthStateChanged(
      auth,
      authStateObserver as NextOrObserver<User>
    );

    return () => {
      unsub();
    };
  }, [userProfile]);

  return [currentUser, userProfile];
}

export default useAuthStateObserver;
