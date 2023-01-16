import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import useAuthStateObserver from './utils/useAuthStateObserver';
import LogInBanner from './components/LogInBanner';
import MyNav from './components/MyNav';
import MySidebar from './components/MySidebar';
import Feed from './components/Feed';
import TweetPage from './components/TweetPage';
import TweetPopup from './components/TweetPopup';
import useToggle from './utils/useToggle';

function App() {
  const [isSignedIn, currentUser] = useAuthStateObserver();
  const [showTweetPopup, toggleTweetPopup] = useToggle();

  return (
    <>
      <div className='app wrapper'>
        <MyNav
          currentUser={currentUser}
          isSignedIn={isSignedIn}
          toggleTweetPopup={toggleTweetPopup}
        />
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/tweet/:tweet' element={<TweetPage />} />
        </Routes>
        <MySidebar />
      </div>

      {showTweetPopup && <TweetPopup toggleTweetPopup={toggleTweetPopup} />}
      {!isSignedIn && <LogInBanner isSignedIn={isSignedIn} />}
    </>
  );
}

export default App;
