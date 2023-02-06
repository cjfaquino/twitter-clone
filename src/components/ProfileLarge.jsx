import React from 'react';
import PropTypes from 'prop-types';
import useFollowStatus from '../hooks/useFollowStatus';

const ProfileLarge = ({ currentUser, targetUser }) => {
  const [followed, handleFollow] = useFollowStatus(targetUser.userProfile);

  const customClass = 'user-card';

  const formatJoinedDate = () => {
    const joinedDate = new Date(Number(targetUser.userProfile.createdAt));

    const options = {
      year: 'numeric',
      month: 'short',
    };

    return joinedDate.toLocaleDateString('en-us', options);
  };

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
};

ProfileLarge.defaultProps = {
  currentUser: null,
  targetUser: null,
};

export default ProfileLarge;
