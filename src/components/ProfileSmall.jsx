import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import checkAlreadyFollowing from '../utils/checkAlreadyFollowing';
import followUser from '../utils/followUser';
import unfollowUser from '../utils/unfollowUser';
import isUserSignedIn from '../utils/isUserSignedIn';
import eventFollow from '../utils/eventFollow';
import getUserUid from '../utils/getUserUid';

const ProfileSmall = ({ userProfile }) => {
  const [followed, setFollowed] = useState(null);
  const navigate = useNavigate();
  const customClass = 'user-card-small';

  const handleFollow = async (e) => {
    const currentUserProfileObj = JSON.parse(
      localStorage.getItem('userProfile')
    );
    const btnText = e.target.textContent;

    if (!isUserSignedIn()) {
      return navigate('/login');
    }

    if (btnText === 'Follow') {
      await followUser(currentUserProfileObj, userProfile);
      setFollowed(true);
    }

    if (btnText === 'Unfollow') {
      await unfollowUser(userProfile);
      setFollowed(false);
    }

    return eventFollow(userProfile.id);
  };

  const updateFollow = () =>
    checkAlreadyFollowing(userProfile.id).then(setFollowed);

  useEffect(() => {
    // set initial follow status
    if (isUserSignedIn()) {
      updateFollow();
    }

    document.addEventListener(
      `change follow for ${userProfile.id}`,
      updateFollow
    );

    document.addEventListener('auth state changed', updateFollow);

    return () => {
      document.removeEventListener(
        `change follow for ${userProfile.id}`,
        updateFollow
      );
      document.removeEventListener('auth state changed', updateFollow);
    };
  }, []);

  const navToPage = (e) => {
    const targetName = e.target.className;
    if (targetName !== 'btn-follow') navigate(`/${userProfile.userName}`);
  };

  return (
    <div className='profile-small'>
      {userProfile && (
        <div className={`${customClass}`} onClick={navToPage} aria-hidden>
          <div className={`${customClass}-img-container profile-link`}>
            <img
              src={userProfile.photoUrl}
              alt={userProfile.displayName}
              className='profile-link'
            />
          </div>
          <div className={`${customClass}-contact`}>
            <div className={`${customClass}-display-name profile-link`}>
              {userProfile.displayName}
            </div>
            <div
              className={`${customClass}-user-name profile-link grey username`}
            >
              @{userProfile.userName}
            </div>
          </div>

          {getUserUid() !== userProfile.id && (
            <button type='button' onClick={handleFollow} className='btn-follow'>
              {followed ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

ProfileSmall.propTypes = {
  userProfile: PropTypes.shape({
    photoUrl: PropTypes.string,
    displayName: PropTypes.string,
    userName: PropTypes.string,
    id: PropTypes.string,
  }),
};

ProfileSmall.defaultProps = {
  userProfile: null,
};

export default ProfileSmall;
