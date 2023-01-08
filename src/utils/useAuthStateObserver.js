import { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

function useAuthStateObserver() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const authStateObserver = (user) => {
    if (user) {
      // User is signed in!
      setIsSignedIn(true);
      setCurrentUser(user);
    } else {
      // User is signed out!
      setIsSignedIn(false);
      setCurrentUser(null);
    }
  };

  const initFirebaseAuth = () => {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), authStateObserver);
  };

  useEffect(() => {
    initFirebaseAuth();

    return () => {};
  }, []);

  return [isSignedIn, currentUser];
}

export default useAuthStateObserver;
