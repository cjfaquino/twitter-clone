import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faLink,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { User } from 'firebase/auth';
import useFollowStatus from '../hooks/useFollowStatus';
import { TargetUser } from '../interfaces/TargetUser';
import useToggle from '../hooks/useToggle';
import EditProfilePopup from './EditProfilePopup';
import { UserProfile } from '../interfaces/UserProfile';
import FormattedText from './FormattedText';

interface IProps {
  currentUser: User;
  targetUser: TargetUser;
  userProfile: UserProfile;
}

const ProfileLarge = ({ currentUser, targetUser, userProfile }: IProps) => {
  const [followed, handleFollow] = useFollowStatus(targetUser.userProfile);
  const [showEditProfilePopup, toggleEditProfilePopup] = useToggle();

  const customClass = 'user-card';

  const formatJoinedDate = () => {
    const joinedDate = new Date(
      Number(targetUser.userProfile.metadata!.createdAt)
    );

    const options = {
      year: 'numeric',
      month: 'short',
    };

    return joinedDate.toLocaleDateString('en-us', options);
  };

  return (
    <>
      {showEditProfilePopup && (
        <EditProfilePopup
          userProfile={userProfile}
          toggleEditProfilePopup={toggleEditProfilePopup}
        />
      )}
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
                  currentUser.uid === targetUser.userProfile.id ? (
                    <button
                      type='button'
                      className='btn-edit-profile'
                      onClick={toggleEditProfilePopup}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    currentUser &&
                    followed !== null && (
                      <button
                        type='button'
                        onClick={handleFollow}
                        className={
                          followed ? 'btn-follow following' : 'btn-follow'
                        }
                      >
                        {followed ? (
                          <span className='following'>Following</span>
                        ) : (
                          <span>Follow</span>
                        )}
                      </button>
                    )
                  )}
                </div>
                <div className={`${customClass}-display-name`}>
                  {targetUser.userProfile.displayName}
                </div>
                <div className={`${customClass}-username grey`}>
                  @{targetUser.userProfile.userName}
                </div>
                <div className={`${customClass}-bio`}>
                  {targetUser.userProfile.bio && (
                    <FormattedText
                      textArr={targetUser.userProfile.bio!.split(/\s/)}
                      customClass={customClass}
                      itemID={targetUser.userProfile.id}
                    />
                  )}
                </div>
                <div className={`${customClass}-extra-info`}>
                  {targetUser.userProfile.location && (
                    <span>
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span className={`${customClass}-location grey`}>
                        {targetUser.userProfile.location}
                      </span>
                    </span>
                  )}
                  {targetUser.userProfile.website && (
                    <span>
                      <FontAwesomeIcon icon={faLink} />
                      <span className={`${customClass}-website`}>
                        {targetUser.userProfile.website}
                      </span>
                    </span>
                  )}
                  {targetUser.userProfile.metadata && (
                    <span>
                      <FontAwesomeIcon icon={faCalendarDays} />
                      <span className={`${customClass}-joined grey`}>
                        Joined {formatJoinedDate()}
                      </span>
                    </span>
                  )}
                </div>
                <div className={`${customClass}-stats grey`}>
                  <span className={`${customClass}-followers follow-link`}>
                    <Link to='followers' state={{ targetUser }}>
                      <span className={`${customClass}-followers-number`}>
                        {targetUser.userProfile.followers}
                      </span>{' '}
                      <span className='grey'>Followers</span>
                    </Link>
                  </span>
                  <span className={`${customClass}-following follow-link`}>
                    <Link to='following' state={{ targetUser }}>
                      <span className={`${customClass}-following-number`}>
                        {targetUser.userProfile.following}
                      </span>{' '}
                      <span className='grey'>Following</span>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileLarge;
