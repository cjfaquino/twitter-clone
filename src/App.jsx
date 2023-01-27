import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import useAuthStateObserver from './hooks/useAuthStateObserver';
import LogInBanner from './components/LogInBanner';
import MyNav from './components/MyNav';
import MySidebar from './components/MySidebar';
import Explore from './pages/Explore';
import TweetPage from './pages/TweetPage';
import TweetPopup from './components/TweetPopup';
import SignUp from './pages/SignUp';
import useToggle from './hooks/useToggle';
import NewProfile from './pages/NewProfile';
import Login from './pages/Login';

function App() {
  const [isSignedIn, currentUser, userProfile] = useAuthStateObserver();
  const [showTweetPopup, toggleTweetPopup] = useToggle();
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
        <div id='centerbar'>
          <Routes>
            <Route
              path='/'
              element={
                <Explore newTweet={newTweet} clrNewTweet={clrNewTweet} />
              }
            />
            <Route path='/tweet/:tweet' element={<TweetPage />} />
            <Route path='/signup' element={<SignUp />} />
            <Route
              path='/signup/:user'
              element={
                <NewProfile
                  currentUser={currentUser}
                  userProfile={userProfile}
                />
              }
            />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
        <MySidebar isSignedIn={isSignedIn} />
      </div>

      {showTweetPopup && (
        <TweetPopup
          toggleTweetPopup={toggleTweetPopup}
          setNewTweet={setNewTweet}
        />
      )}

      {!isSignedIn && <LogInBanner isSignedIn={isSignedIn} />}
    </>
  );
}

export default App;
