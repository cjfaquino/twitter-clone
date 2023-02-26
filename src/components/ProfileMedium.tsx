import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFollowStatus from '../hooks/useFollowStatus';
import { UserProfile } from '../interfaces/UserProfile';
import checkMatchingUser from '../utils/user/checkMatchingUser';
import FormattedText from './FormattedText';
import WithProfilePopup from './WithProfilePopup';

interface IProps {
  userProfile: UserProfile;
}

const ProfileMedium = ({ userProfile }: IProps) => {
  const [followed, handleFollow] = useFollowStatus(userProfile);
  const navigate = useNavigate();
  const customClass = 'user-card-medium';

  const navToPage = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLElement;

    const targetName = element.className;
    if (!targetName.includes('btn-follow'))
      navigate(`/${userProfile.userName}`);
  };

  const { photoURL, displayName, userName, id, bio } = userProfile;

  return (
    <div className='profile-medium'>
      {userProfile && (
        <div className={`${customClass}`} onClick={navToPage} aria-hidden>
          <WithProfilePopup userProfile={userProfile} type='profile-icon'>
            <div className='img-container profile-link'>
              <img src={photoURL} alt='' className='profile-link' />
            </div>
          </WithProfilePopup>
          <div className={`${customClass}-body`}>
            <div className={`${customClass}-info`}>
              <div className='contact'>
                <WithProfilePopup userProfile={userProfile} type='display-name'>
                  {displayName}
                </WithProfilePopup>
                <WithProfilePopup userProfile={userProfile} type='username'>
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
            <div>
              {bio && (
                <FormattedText
                  text={bio}
                  customClass={customClass}
                  itemID={id}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMedium;
