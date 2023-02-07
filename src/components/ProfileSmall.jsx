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

  const { photoURL, userName, displayName, id } = userProfile;

  return (
    <div className='profile-small'>
      {userProfile && (
        <div className={`${customClass}`} onClick={navToPage} aria-hidden>
          <div
            className={`${customClass}-img-container img-container profile-link`}
          >
            <img src={photoURL} alt='' className='profile-link' />
          </div>
          <div className={`${customClass}-contact`}>
            <div className={`${customClass}-display-name profile-link`}>
              {displayName}
            </div>
            <div
              className={`${customClass}-user-name profile-link grey username`}
            >
              @{userName}
            </div>
          </div>
          {!checkMatchingUser(id) && (
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

ProfileSmall.propTypes = {
  userProfile: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    userName: PropTypes.string,
    id: PropTypes.string,
  }),
};

ProfileSmall.defaultProps = {
  userProfile: null,
};

export default ProfileSmall;
