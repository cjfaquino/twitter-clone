import React from 'react';
import './App.css';
import useAuthStateObserver from './utils/useAuthStateObserver';
import LogInBanner from './components/LogInBanner';
import MyNav from './components/MyNav';
import Feed from './components/Feed';

function App() {
  const [isSignedIn, currentUser] = useAuthStateObserver();

  return (
    <>
      <div className='app wrapper'>
        <MyNav currentUser={currentUser} isSignedIn={isSignedIn} />
        <Feed />
        <div>Screen3</div>
      </div>

      {!isSignedIn && <LogInBanner isSignedIn={isSignedIn} />}
    </>
  );
}

export default App;
