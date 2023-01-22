import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import useAuthStateObserver from './utils/useAuthStateObserver';
import LogInBanner from './components/LogInBanner';
import MyNav from './components/MyNav';
import MySidebar from './components/MySidebar';
import Feed from './components/Feed';
import TweetPage from './components/TweetPage';
import TweetPopup from './components/TweetPopup';
import SignUp from './components/SignUp';
import useToggle from './utils/useToggle';
import saveUser from './utils/saveUser';

function App() {
  const [isSignedIn, currentUser] = useAuthStateObserver();
  const [showTweetPopup, toggleTweetPopup] = useToggle();
  const [showSignUpPopup, toggleSignUpPopup] = useToggle();
  const [newTweet, setNewTweet] = useState(null);

  const clrNewTweet = () => {
    setNewTweet(null);
  };

  return (
    <>
      <div className='app wrapper'>
        <MyNav
          currentUser={currentUser}
          isSignedIn={isSignedIn}
          toggleTweetPopup={toggleTweetPopup}
        />
        <Routes>
          <Route
            path='/'
            element={<Feed newTweet={newTweet} clrNewTweet={clrNewTweet} />}
          />
          <Route path='/tweet/:tweet' element={<TweetPage />} />
        </Routes>
        <MySidebar
          isSignedIn={isSignedIn}
          toggleSignUpPopup={toggleSignUpPopup}
        />
      </div>

      {showTweetPopup && (
        <TweetPopup
          toggleTweetPopup={toggleTweetPopup}
          setNewTweet={setNewTweet}
        />
      )}

      {showSignUpPopup && !isSignedIn && (
        <SignUp toggleSignUpPopup={toggleSignUpPopup} />
      )}

      {!isSignedIn && (
        <LogInBanner
          isSignedIn={isSignedIn}
          toggleSignUpPopup={toggleSignUpPopup}
        />
      )}
    </>
  );
}

export default App;
