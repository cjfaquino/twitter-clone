import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'firebase/auth';
import useFollowStatus from '../../hooks/useFollowStatus';
import { TargetUser } from '../../interfaces/TargetUser';
import useToggle from '../../hooks/useToggle';
import EditProfilePopup from './EditProfilePopup';
import { UserProfile } from '../../interfaces/UserProfile';
import FormattedText from '../../components/FormattedText';
import WebsiteItem from './WebsiteItem';
import LocationItem from './LocationItem';
import JoinedDateItem from './JoinedDateItem';

interface IProps {
  currentUser: User | null;
  targetUser: TargetUser;
  userProfile: UserProfile;
}

const ProfileLarge = ({ currentUser, targetUser, userProfile }: IProps) => {
  const [followed, handleFollow] = useFollowStatus(targetUser.userProfile);
  const [showEditProfilePopup, toggleEditProfilePopup] = useToggle();

  const customClass = 'profile';

  return (
    <>
      {showEditProfilePopup && (
        <EditProfilePopup
          userProfile={userProfile}
          toggleEditProfilePopup={toggleEditProfilePopup}
        />
      )}
      <section className='profile-large'>
        {targetUser.doneLoading && (
          <div id={`${customClass}-${targetUser.userProfile.id}`}>
            <section className='top-half img-backdrop'>
              {targetUser.userProfile.backdropURL && (
                <img src={targetUser.userProfile.backdropURL} alt='' />
              )}
            </section>

            <section className='bottom-half'>
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

              <div className='display-name'>
                {targetUser.userProfile.displayName}
              </div>

              <div className='username grey'>
                @{targetUser.userProfile.userName}
              </div>

              <FormattedText
                text={targetUser.userProfile.bio}
                customClass={customClass}
                itemID={targetUser.userProfile.id}
              />

              <div className={`${customClass}-extra-info`}>
                <LocationItem location={targetUser.userProfile.location} />

                <WebsiteItem link={targetUser.userProfile.website} />

                <JoinedDateItem
                  createdAt={targetUser.userProfile.metadata!.createdAt}
                />
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
            </section>
          </div>
        )}
      </section>
    </>
  );
};

export default ProfileLarge;
