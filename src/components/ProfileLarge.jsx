import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import checkAlreadyFollowing from '../utils/checkAlreadyFollowing';
import isUserSignedIn from '../utils/isUserSignedIn';
import followUser from '../utils/followUser';
import unfollowUser from '../utils/unfollowUser';
import eventFollow from '../utils/eventFollow';

const ProfileLarge = ({ currentUser, userProfile, targetUser }) => {
  const [followed, setFollowed] = useState(null);
  const navigate = useNavigate();
  const customClass = 'user-card';

  const formatJoinedDate = () => {
    const joinedDate = new Date(Number(targetUser.userProfile.createdAt));

    const options = {
      year: 'numeric',
      month: 'short',
    };

    return joinedDate.toLocaleDateString('en-us', options);
  };

  const handleFollow = async (e) => {
    const btnText = e.target.textContent;

    if (!isUserSignedIn()) {
      return navigate('/login');
    }

    if (btnText === 'Follow') {
      await followUser(userProfile, targetUser.userProfile);
      setFollowed(true);
    }

    if (btnText === 'Unfollow') {
      await unfollowUser(targetUser.userProfile);
      setFollowed(false);
    }

    return eventFollow(targetUser.userProfile.id);
  };

  const updateFollow = () =>
    checkAlreadyFollowing(targetUser.userProfile.id).then(setFollowed);

  useEffect(() => {
    if (targetUser.userProfile) {
      // set initial follow
      if (isUserSignedIn()) {
        updateFollow();
      }

      document.addEventListener(
        `change follow for ${targetUser.userProfile.id}`,
        updateFollow
      );
      document.addEventListener('auth state changed', updateFollow);
    }

    return () => {
      if (targetUser.userProfile) {
        document.removeEventListener(
          `change follow for ${targetUser.userProfile.id}`,
          updateFollow
        );
      }
      document.removeEventListener('auth state changed', updateFollow);
    };
  }, [targetUser.userProfile]);

  return (
    <div className='profile-large'>
      <div className={`${customClass}`}>
        {targetUser && targetUser.userProfile && (
          <div id={`${customClass}-${targetUser.userProfile.id}`}>
            <div className='top-half' />
            <div className='bottom-half'>
              <div className='user-pic edit'>
                <div className='user-profile-img-container'>
                  <img
                    src={targetUser.userProfile.photoUrl}
                    alt={targetUser.userProfile.displayName}
                  />
                </div>
                {currentUser &&
                currentUser.displayName ===
                  targetUser.userProfile.displayName ? (
                  <button type='button'>Edit Profile</button>
                ) : (
                  <button
                    type='button'
                    onClick={handleFollow}
                    className='btn-follow'
                  >
                    {followed ? 'Unfollow' : 'Follow'}
                  </button>
                )}
              </div>
              <div className={`${customClass}-display-name`}>
                {targetUser.userProfile.displayName}
              </div>
              <div className={`${customClass}-username grey`}>
                @{targetUser.userProfile.userName}
              </div>

              <div className={`${customClass}-bio`}>
                {targetUser.userProfile.bio}
              </div>

              <div className={`${customClass}-joined grey`}>
                Joined {formatJoinedDate()}
              </div>

              <div className={`${customClass}-stats grey`}>
                <span className={`${customClass}-followers`}>
                  <span className={`${customClass}-followers-number`}>
                    {targetUser.followers.length}
                  </span>{' '}
                  Followers
                </span>
                <span className={`${customClass}-following`}>
                  <span className={`${customClass}-following-number`}>
                    {targetUser.following.length}
                  </span>{' '}
                  Following
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div />
    </div>
  );
};

ProfileLarge.propTypes = {
  currentUser: PropTypes.shape({
    displayName: PropTypes.string,
  }),
  targetUser: PropTypes.shape({
    userProfile: PropTypes.shape({
      createdAt: PropTypes.string,
      id: PropTypes.string,
      photoUrl: PropTypes.string,
      displayName: PropTypes.string,
      userName: PropTypes.string,
      bio: PropTypes.string,
    }),
    followers: PropTypes.arrayOf(PropTypes.shape({})),
    following: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  userProfile: PropTypes.shape({}),
};

ProfileLarge.defaultProps = {
  currentUser: null,
  userProfile: null,
  targetUser: null,
};

export default ProfileLarge;
