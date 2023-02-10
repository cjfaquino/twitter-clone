import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import ThreeDots from './ThreeDots';
import checkMatchingUser from '../utils/checkMatchingUser';
import isUserSignedIn from '../utils/isUserSignedIn';
import useFollowStatus from '../hooks/useFollowStatus';
import { TargetUser } from '../interfaces/TargetUser';

interface IProps {
  targetUser: TargetUser;
  toggleOptionsPopup: React.MouseEventHandler<HTMLDivElement>;
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  showOptionsPopup: boolean;
}

const OptionsPopup = ({
  toggleOptionsPopup,
  showOptionsPopup,
  handleDelete,
  targetUser,
}: IProps) => {
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
                    {followed ? (
                      <>
                        <FontAwesomeIcon icon={faUserMinus} /> Unfollow
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faUserPlus} /> Follow
                      </>
                    )}
                    {` @${targetUser.userProfile.userName}`}
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
              <button
                type='button'
                onClick={() => navigate('/login')}
                className='btn-options-login'
              >
                Login
              </button>
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

export default OptionsPopup;
