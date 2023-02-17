import React, { useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import useAuthStateObserver from './hooks/useAuthStateObserver';
import LogInBanner from './components/LogInBanner';
import MyNav from './components/MyNav';
import MySidebar from './components/MySidebar';
import Explore from './pages/Explore';
import TweetPage from './pages/TweetPage/TweetPage';
import TweetPopup from './components/TweetPopup';
import useToggle from './hooks/useToggle';
import ProfileSettings from './pages/ProfileSettings';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Search from './pages/Search';
import FollowsPage from './pages/FollowsPage';
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import ProfileContext from './context/ProfileContext';
import { TweetObj } from './interfaces/TweetObj';

const App = () => {
  const [currentUser, userProfile] = useAuthStateObserver();
  const [showTweetPopup, toggleTweetPopup] = useToggle();
  const [newTweet, setNewTweet] = useState<TweetObj | null>(null);

  const clrNewTweet = () => {
    setNewTweet(null);
  };

  return (
    <ProfileContext.Provider value={userProfile}>
      <div className='app wrapper'>
        <LogInBanner isSignedIn={!!currentUser} />
        <MyNav
          currentUser={currentUser}
          userProfile={userProfile}
          toggleTweetPopup={toggleTweetPopup}
        />
        <div id='centerbar'>
          <Routes>
            {!currentUser &&
              ['/home', '/settings'].map((path) => (
                <Route
                  key={`redirect-${path}`}
                  path={path}
                  element={<Navigate to='/explore' replace />}
                />
              ))}
            <Route path='/home' element={<Home />} />
            <Route
              path='/explore'
              element={
                <Explore newTweet={newTweet} clrNewTweet={clrNewTweet} />
              }
            />
            <Route path='/search' element={<Search />} />

            <Route
              path='/signup'
              element={<SignupPage currentUser={currentUser} />}
            />
            <Route path='/login' element={<Login google github email />} />
            <Route
              path='/:username/*'
              element={
                <ProfilePage
                  currentUser={currentUser}
                  userProfile={userProfile}
                />
              }
            />
            <Route path='/:username/tweet/:tweet/*' element={<TweetPage />}>
              <Route path='likes' element={<Outlet />} />
            </Route>
            {['followers', 'following', 'followers_you_follow'].map((path) => (
              <Route
                key={`profile-${path}`}
                path={`/:username/${path}`}
                element={<FollowsPage />}
              />
            ))}

            <Route
              path='/settings'
              element={
                <ProfileSettings
                  currentUser={currentUser}
                  userProfile={userProfile}
                />
              }
            />
            <Route
              path='/[deleted]'
              element={
                <div className='missing'> That item doesn&apos;t exist</div>
              }
            />

            <Route path='*' element={<Navigate to='/explore' replace />} />
          </Routes>
        </div>
        <MySidebar isSignedIn={!!currentUser} />
      </div>

      {currentUser && showTweetPopup && (
        <TweetPopup
          toggleTweetPopup={toggleTweetPopup}
          setNewTweet={setNewTweet}
        />
      )}
    </ProfileContext.Provider>
  );
};

export default App;
