import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFollowStatus from '../hooks/useFollowStatus';
import checkMatchingUser from '../utils/user/checkMatchingUser';
import { UserProfile } from '../interfaces/UserProfile';
import WithProfilePopup from './WithProfilePopup';

interface IProps {
  userProfile: UserProfile;
}

const ProfileSmall = ({ userProfile }: IProps) => {
  const [followed, handleFollow] = useFollowStatus(userProfile);
  const navigate = useNavigate();
  const customClass = 'user-card-small';

  const navToPage = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLElement;
    const targetName = element.className;
    if (!targetName.includes('btn-follow'))
      navigate(`/${userProfile.userName}`);
  };

  const { photoURL, userName, displayName, id } = userProfile;

  return (
    <div className='profile-small'>
      {userProfile && (
        <div className={`${customClass}`} onClick={navToPage} aria-hidden>
          <WithProfilePopup userProfile={userProfile} type='profile-icon'>
            <Link
              to={`/${userProfile.userName}`}
              className={`${customClass}-img-container img-container profile-link`}
            >
              <img src={photoURL} alt='' className='profile-link' />
            </Link>
          </WithProfilePopup>
          <div className='contact'>
            <WithProfilePopup userProfile={userProfile} type='display-name'>
              {displayName}
            </WithProfilePopup>
            <WithProfilePopup userProfile={userProfile} type='username' grey>
              @{userName}
            </WithProfilePopup>
          </div>
          {followed !== null && !checkMatchingUser(id) && (
            <button
              type='button'
              onClick={handleFollow}
              className={followed ? 'btn-follow following' : 'btn-follow'}
            >
              {followed ? (
                <span className='following'>Following</span>
              ) : (
                <span>Follow</span>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileSmall;
