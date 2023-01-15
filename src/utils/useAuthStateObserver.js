import { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

function useAuthStateObserver() {
  // will be null when signed out
  const cUser = JSON.parse(localStorage.getItem('firebaseUser'));

  const [isSignedIn, setIsSignedIn] = useState(!!cUser);
  const [currentUser, setCurrentUser] = useState(cUser);

  const authStateObserver = (user) => {
    if (user) {
      // User is signed in!
      setCurrentUser(user);
      localStorage.setItem('firebaseUser', JSON.stringify(user));
    } else {
      // User is signed out!
      setCurrentUser(null);
      localStorage.removeItem('firebaseUser');
    }
  };

  useEffect(() => {
    // Listen to auth state changes.
    const unsub = onAuthStateChanged(getAuth(), authStateObserver);

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      setIsSignedIn(true);
    } else setIsSignedIn(false);
  }, [currentUser]);

  return [isSignedIn, currentUser];
}

export default useAuthStateObserver;
