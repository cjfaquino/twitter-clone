import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFollowStatus from '../hooks/useFollowStatus';
import checkMatchingUser from '../utils/user/checkMatchingUser';
import { UserProfile } from '../interfaces/UserProfile';
import FormattedText from './FormattedText';
import fancyNumbers from '../utils/formatters/fancyNumbers';

interface IProps {
  userProfile: UserProfile;
}

const ProfilePopup = ({ userProfile }: IProps) => {
  const [followed, handleFollow] = useFollowStatus(userProfile);
  const navigate = useNavigate();
  const customClass = 'user-card-popup';

  const navToPage = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLElement;
    const targetName = element.className;
    if (!targetName.includes('btn-follow'))
      navigate(`/${userProfile.userName}`);
  };

  const { photoURL, userName, displayName, id, followers, following, bio } =
    userProfile;

  return (
    userProfile && (
      <div className={`${customClass}`} onClick={navToPage} aria-hidden>
        <section className='top-row'>
          <div
            className={`${customClass}-img-container img-container profile-link`}
          >
            <img src={photoURL} alt='' className='profile-link' />
          </div>
          {followed !== null && !checkMatchingUser(id) && (
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
        </section>

        <section>
          <div className='display-name profile-link'>{displayName}</div>
          <div className='profile-link grey username'>@{userName}</div>
        </section>

        <section className='formatted-text'>
          <FormattedText
            text={bio!}
            customClass={customClass}
            itemID={userProfile.id}
          />
        </section>

        <section className='stats'>
          <span className='following follow-link'>
            <Link to={`/${userName}/following`}>
              <span className='following-number'>
                {fancyNumbers(following, true)}
              </span>{' '}
              <span className='grey'>Following</span>
            </Link>
          </span>
          <span className='followers follow-link'>
            <Link to={`/${userName}/followers`}>
              <span className='followers-number'>
                {fancyNumbers(followers, true)}
              </span>{' '}
              <span className='grey'>Followers</span>
            </Link>
          </span>
        </section>
      </div>
    )
  );
};

export default ProfilePopup;
