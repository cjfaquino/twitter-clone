import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFollowStatus from '../hooks/useFollowStatus';
import { UserProfile } from '../interfaces/UserProfile';
import checkMatchingUser from '../utils/checkMatchingUser';
import FormattedTweetMessage from './FormattedTweetMessage';

interface IProps {
  userProfile: UserProfile;
}

const ProfileMedium = ({ userProfile }: IProps) => {
  const [followed, handleFollow] = useFollowStatus(userProfile);
  const navigate = useNavigate();
  const customClass = 'user-card-medium';

  const navToPage = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLElement;
    const targetName = element.className;
    if (targetName !== 'btn-follow') navigate(`/${userProfile.userName}`);
  };

  const { photoURL, displayName, userName, id, bio } = userProfile;

  const fakeBio = `Lorem ipsum dolor sit amet consectetur adipisicing elit. quidem repellendus eligendi a. Sequi quia ducimus at fugit non. Reprehenderit dolore amet ipsa aspernatur unde molestiae laborum, suscipit culpa, repudiandae esse praesentium voluptatibus!eligendi. In est magni enim aut, rerum rem, error sapiente #veritatis`;

  return (
    <div className='profile-medium'>
      {userProfile && (
        <div className={`${customClass}`} onClick={navToPage} aria-hidden>
          <div
            className={`${customClass}-img-container img-container profile-link`}
          >
            <img src={photoURL} alt='' className='profile-link' />
          </div>
          <div className={`${customClass}-body`}>
            <div className={`${customClass}-info`}>
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
            <div>
              {bio || (
                <FormattedTweetMessage
                  textArr={fakeBio.split(/\s/)}
                  customClass={customClass}
                  tweetID={id}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMedium;
