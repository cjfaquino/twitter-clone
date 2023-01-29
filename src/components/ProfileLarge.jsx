import React from 'react';
import PropTypes from 'prop-types';

function ProfileLarge({ currentUser, userProfile }) {
  const formatJoinedDate = () => {
    if (!currentUser) return null;
    const joinedDate = new Date(Number(currentUser.metadata.createdAt));

    const options = {
      year: 'numeric',
      month: 'short',
    };

    return joinedDate.toLocaleDateString('en-us', options);
  };

  const customClass = 'user-card';

  return (
    <div className='profile-large'>
      <div className={`${customClass}`}>
        {userProfile && (
          <>
            <div className='top-half' />
            <div className='bottom-half'>
              <div className='user-pic edit'>
                <div className='user-profile-img-container'>
                  <img
                    src={userProfile.photoUrl}
                    alt={userProfile.displayName}
                  />
                </div>
                <button type='button'>Edit Profile</button>
              </div>
              <div className={`${customClass}-display-name`}>
                {userProfile.displayName}
              </div>
              <div className={`${customClass}-username grey`}>
                @{userProfile.userName}
              </div>

              <div className={`${customClass}-bio`}>{userProfile.bio}</div>

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
          </>
        )}
      </div>
      <div />
    </div>
  );
}

ProfileLarge.propTypes = {
  currentUser: PropTypes.shape({
    metadata: PropTypes.shape({
      createdAt: PropTypes.string,
    }),
  }),
  userProfile: PropTypes.shape({
    photoUrl: PropTypes.string,
    displayName: PropTypes.string,
    userName: PropTypes.string,
    bio: PropTypes.string,
  }),
};

ProfileLarge.defaultProps = {
  currentUser: null,
  userProfile: null,
};

export default ProfileLarge;
