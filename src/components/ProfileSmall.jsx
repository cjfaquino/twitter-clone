import React from 'react';
import PropTypes from 'prop-types';

function ProfileSmall({ userProfile }) {
  const customClass = 'user-card-small';
  return (
    <div className='profile-small'>
      {userProfile && (
        <div className={`${customClass}`}>
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
            <div className={`${customClass}-user-name profile-link`}>
              @{userProfile.userName}
            </div>
          </div>

          <button type='button'>Follow</button>
        </div>
      )}
    </div>
  );
}

ProfileSmall.propTypes = {
  userProfile: PropTypes.oneOfType([
    PropTypes.shape({
      photoUrl: PropTypes.string,
      displayName: PropTypes.string,
      userName: PropTypes.string,
    }),
    null,
  ]).isRequired,
};

export default ProfileSmall;
