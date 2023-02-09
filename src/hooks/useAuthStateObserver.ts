import { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import useUserProfile from './useUserProfile';

function useAuthStateObserver() {
  // will be null when signed out
  const cUser: User | null = JSON.parse(localStorage.getItem('firebaseUser'));

  const [isSignedIn, setIsSignedIn] = useState(!!cUser);
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
    const unsub = onAuthStateChanged(getAuth(), authStateObserver);

    return () => {
      unsub();
    };
  }, [userProfile]);

  useEffect(() => {
    if (currentUser) {
      setIsSignedIn(true);
    } else setIsSignedIn(false);
  }, [currentUser]);

  return [isSignedIn, currentUser, userProfile];
}

export default useAuthStateObserver;
