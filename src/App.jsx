import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import useAuthStateObserver from './utils/useAuthStateObserver';
import LogInBanner from './components/LogInBanner';
import MyNav from './components/MyNav';
import MySidebar from './components/MySidebar';
import Feed from './components/Feed';
import TweetPage from './components/TweetPage';

function App() {
  const [isSignedIn, currentUser] = useAuthStateObserver();

  return (
    <>
      <div className='app wrapper'>
        <MyNav currentUser={currentUser} isSignedIn={isSignedIn} />
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/tweet/:tweet' element={<TweetPage />} />
        </Routes>
        <MySidebar />
      </div>

      {!isSignedIn && <LogInBanner isSignedIn={isSignedIn} />}
    </>
  );
}

export default App;
