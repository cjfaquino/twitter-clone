import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import updateFollow from '../utils/updateFollow';
import checkAlreadyFollowing from '../utils/checkAlreadyFollowing';

function ProfileLarge({ currentUser, userProfile, targetUserProfile }) {
  const followBtnRef = useRef(null);
  const customClass = 'user-card';

  const formatJoinedDate = () => {
    if (!currentUser) return null;
    const joinedDate = new Date(Number(currentUser.metadata.createdAt));

    const options = {
      year: 'numeric',
      month: 'short',
    };

    return joinedDate.toLocaleDateString('en-us', options);
  };

  const handleFollow = async () => {
    await updateFollow(
      `${customClass}-${targetUserProfile.id}`,
      targetUserProfile,
      userProfile
    );
  };

  useEffect(() => {
    const setFollowBtn = async () => {
      if (await checkAlreadyFollowing(targetUserProfile.id)) {
        followBtnRef.current.textContent = 'Unfollow';
      } else {
        followBtnRef.current.textContent = 'Follow';
      }
    };

    if (
      targetUserProfile &&
      currentUser.displayName !== targetUserProfile.displayName
    ) {
      setFollowBtn();
    }
  }, [targetUserProfile]);

  return (
    <div className='profile-large'>
      <div className={`${customClass}`}>
        {currentUser && targetUserProfile && (
          <div id={`${customClass}-${targetUserProfile.id}`}>
            <div className='top-half' />
            <div className='bottom-half'>
              <div className='user-pic edit'>
                <div className='user-profile-img-container'>
                  <img
                    src={targetUserProfile.photoUrl}
                    alt={targetUserProfile.displayName}
                  />
                </div>
                {currentUser &&
                currentUser.displayName === targetUserProfile.displayName ? (
                  <button type='button'>Edit Profile</button>
                ) : (
                  <button
                    type='button'
                    onClick={handleFollow}
                    ref={followBtnRef}
                    className='btn-follow'
                  >
                    Follow
                  </button>
                )}
              </div>
              <div className={`${customClass}-display-name`}>
                {targetUserProfile.displayName}
              </div>
              <div className={`${customClass}-username grey`}>
                @{targetUserProfile.userName}
              </div>

              <div className={`${customClass}-bio`}>
                {targetUserProfile.bio}
              </div>

              <div className={`${customClass}-joined grey`}>
                Joined {formatJoinedDate()}
              </div>

              <div className={`${customClass}-stats grey`}>
                <span className={`${customClass}-followers`}>
                  <span className={`${customClass}-followers-number`}>{}</span>{' '}
                  Followers
                </span>
                <span className={`${customClass}-following`}>
                  <span className={`${customClass}-following-number`}>{}</span>{' '}
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
}

ProfileLarge.propTypes = {
  currentUser: PropTypes.shape({
    displayName: PropTypes.string,
    metadata: PropTypes.shape({
      createdAt: PropTypes.string,
    }),
  }),
  targetUserProfile: PropTypes.shape({
    id: PropTypes.string,
    photoUrl: PropTypes.string,
    displayName: PropTypes.string,
    userName: PropTypes.string,
    bio: PropTypes.string,
  }),
  userProfile: PropTypes.shape({}),
};

ProfileLarge.defaultProps = {
  currentUser: null,
  userProfile: null,
  targetUserProfile: null,
};

export default ProfileLarge;
