import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useFollowStatus from '../hooks/useFollowStatus';

const ProfileLarge = ({ currentUser, targetUser }) => {
  const [followed, handleFollow] = useFollowStatus(targetUser.userProfile);

  const customClass = 'user-card';

  const formatJoinedDate = () => {
    const joinedDate = new Date(
      Number(targetUser.userProfile.metadata.createdAt)
    );

    const options = {
      year: 'numeric',
      month: 'short',
    };

    return joinedDate.toLocaleDateString('en-us', options);
  };

  return (
    <div className='profile-large'>
      <div className={`${customClass}`}>
        {targetUser.doneLoading && (
          <div id={`${customClass}-${targetUser.userProfile.id}`}>
            <div className='top-half' />
            <div className='bottom-half'>
              <div className='user-pic edit'>
                <div className='user-profile-img-container'>
                  <img src={targetUser.userProfile.photoURL} alt='' />
                </div>
                {currentUser &&
                currentUser.displayName ===
                  targetUser.userProfile.displayName ? (
                  <button type='button'>Edit Profile</button>
                ) : (
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
              <div className={`${customClass}-display-name`}>
                {targetUser.userProfile.displayName}
              </div>
              <div className={`${customClass}-username grey`}>
                @{targetUser.userProfile.userName}
              </div>

              <div className={`${customClass}-bio`}>
                {targetUser.userProfile.bio}
              </div>

              {targetUser.userProfile.metadata && (
                <div className={`${customClass}-joined grey`}>
                  Joined {formatJoinedDate()}
                </div>
              )}

              <div className={`${customClass}-stats grey`}>
                <span className={`${customClass}-followers follow-link`}>
                  <Link to='followers'>
                    <span className={`${customClass}-followers-number`}>
                      {targetUser.followers.length}
                    </span>{' '}
                    <span className='grey'>Followers</span>
                  </Link>
                </span>
                <span className={`${customClass}-following follow-link`}>
                  <Link to='following'>
                    <span className={`${customClass}-following-number`}>
                      {targetUser.following.length}
                    </span>{' '}
                    <span className='grey'>Following</span>
                  </Link>
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
      metadata: PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
      }),
      id: PropTypes.string,
      photoURL: PropTypes.string,
      displayName: PropTypes.string,
      userName: PropTypes.string,
      bio: PropTypes.string,
    }),
    followers: PropTypes.arrayOf(PropTypes.shape({})),
    following: PropTypes.arrayOf(PropTypes.shape({})),
    doneLoading: PropTypes.bool,
  }),
};

ProfileLarge.defaultProps = {
  currentUser: null,
  targetUser: null,
};

export default ProfileLarge;
