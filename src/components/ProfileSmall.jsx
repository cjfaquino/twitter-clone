import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useFollowStatus from '../hooks/useFollowStatus';
import checkMatchingUser from '../utils/checkMatchingUser';

const ProfileSmall = ({ userProfile }) => {
  const [followed, handleFollow] = useFollowStatus(userProfile);
  const navigate = useNavigate();
  const customClass = 'user-card-small';

  const navToPage = (e) => {
    const targetName = e.target.className;
    if (targetName !== 'btn-follow') navigate(`/${userProfile.userName}`);
  };

  return (
    <div className='profile-small'>
      {userProfile && (
        <div className={`${customClass}`} onClick={navToPage} aria-hidden>
          <div
            className={`${customClass}-img-container img-container profile-link`}
          >
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
          {!checkMatchingUser(userProfile.id) && (
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
