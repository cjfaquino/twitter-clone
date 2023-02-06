import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ThreeDots from './ThreeDots';
import checkMatchingUser from '../utils/checkMatchingUser';
import isUserSignedIn from '../utils/isUserSignedIn';
import useFollowStatus from '../hooks/useFollowStatus';

const OptionsPopup = ({
  toggleOptionsPopup,
  showOptionsPopup,
  handleDelete,
  targetUser,
}) => {
  const [followed, handleFollow] = useFollowStatus(targetUser.userProfile);
  const navigate = useNavigate();

  return (
    <div className='dots-container'>
      <ThreeDots onClick={toggleOptionsPopup} />
      {showOptionsPopup && (
        <>
          <div className='options-popup popup'>
            {isUserSignedIn() ? (
              <>
                {!checkMatchingUser(targetUser.userProfile.id) && (
                  <button
                    type='button'
                    className='btn-options-follow'
                    onClick={handleFollow}
                  >
                    {followed ? 'Unfollow' : 'Follow'}
                  </button>
                )}

                {checkMatchingUser(targetUser.userProfile.id) && (
                  <button
                    className='btn-delete-tweet'
                    type='button'
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
              </>
            ) : (
              {
                /* not signed in */
              }(
                <button
                  type='button'
                  onClick={() => navigate('/login')}
                  className='btn-options-login'
                >
                  Login
                </button>
              )
            )}
          </div>
          <div
            className='options-background'
            onClick={toggleOptionsPopup}
            aria-hidden='true'
          />
        </>
      )}
    </div>
  );
};

OptionsPopup.propTypes = {
  toggleOptionsPopup: PropTypes.func.isRequired,
  showOptionsPopup: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  targetUser: PropTypes.shape({
    userProfile: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

OptionsPopup.defaultProps = {
  targetUser: null,
};

export default OptionsPopup;
