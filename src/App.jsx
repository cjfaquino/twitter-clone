import React from 'react';
import './App.css';
import { signIn, signOutUser } from './firebase';
import useAuthStateObserver from './utils/useAuthStateObserver';

function App() {
  const [isSignedIn, currentUser] = useAuthStateObserver();

  return (
    <div className='app'>
      App
      <div>
        {currentUser && currentUser.displayName}

        {!isSignedIn ? (
          <button type='button' onClick={signIn}>
            Sign In
          </button>
        ) : (
          <button type='button' onClick={signOutUser}>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
