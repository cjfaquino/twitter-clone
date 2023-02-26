import React, { MutableRefObject, useRef, useState } from 'react';

import { UserProfile } from '../interfaces/UserProfile';
import ProfilePopup from './ProfilePopup';

interface IProps {
  userProfile: UserProfile;
  type: string;
  grey?: boolean;
  children: React.ReactNode;
}

const WithProfilePopup = ({ userProfile, type, grey, children }: IProps) => {
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
        className={`profile-link ellipsis ${grey ? 'grey' : ''} ${type}`}
      >
        {children}
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

WithProfilePopup.defaultProps = {
  grey: false,
};

export default WithProfilePopup;
