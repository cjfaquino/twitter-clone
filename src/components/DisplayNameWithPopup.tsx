import React, { MutableRefObject, useRef, useState } from 'react';

import { UserProfile } from '../interfaces/UserProfile';
import ProfilePopup from './ProfilePopup';

const DisplayNameWithPopup = ({
  userProfile,
}: {
  userProfile: UserProfile;
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>(
    null
  ) as MutableRefObject<NodeJS.Timeout>;
  const delay = 500;

  const handleEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setShowPopup(true);
    }, delay);
  };

  const handleLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setShowPopup(false);
    }, delay);
  };

  return (
    <div className='profile-popup-wrapper'>
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className='display-name profile-link'
      >
        {userProfile.displayName}
      </div>
      {showPopup && (
        <section
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className='profile-popup popup'
        >
          <ProfilePopup userProfile={userProfile} />
        </section>
      )}
    </div>
  );
};

export default DisplayNameWithPopup;
