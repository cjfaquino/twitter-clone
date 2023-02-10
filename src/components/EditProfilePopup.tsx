import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useInput from '../hooks/useInput';
import { UserProfile } from '../interfaces/UserProfile';
import updateProfile from '../utils/updateProfile';
import ChangeProfileIcon from './ChangeProfileIcon';

interface IProps {
  userProfile: UserProfile;
  toggleEditProfilePopup: React.MouseEventHandler<HTMLDivElement>;
}

const EditProfilePopup = ({ userProfile, toggleEditProfilePopup }: IProps) => {
  const [displayName, handleDisplayName] = useInput(userProfile.displayName!);
  const [bio, handleBio] = useInput(userProfile.bio || '');
  const [website, handleWebsite] = useInput(userProfile.website || '');
  const [location, handleLocation] = useInput(userProfile.location || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await updateProfile({
      userProfile,
      displayName,
      bio,
      website,
      location,
      backdropURL: '',
    });

    if (result) (toggleEditProfilePopup as Function)();
    else {
      // error
    }
  };

  return (
    <>
      <div className='edit-profile popup'>
        <form onSubmit={handleSubmit}>
          <header className='edit-top'>
            <button type='button' className='btn-cancel-edit'>
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h2>Edit profile</h2>
            <button type='submit'>Save</button>
          </header>

          <div className='edit-images'>
            <div className='edit-backdrop'>
              <img src='' alt='backdrop not found' />
              <input type='file' name='backdropURL' id='backdropURL' />
            </div>
            <ChangeProfileIcon />
          </div>

          <section className='edit-bottom'>
            <label htmlFor='displayName'>Display name</label>
            <input
              type='text'
              id='displayName'
              value={displayName}
              onChange={handleDisplayName}
            />
            <label htmlFor='bio'>Bio</label>
            <textarea
              id='bio'
              maxLength={160}
              value={bio}
              onChange={handleBio}
            />
            <label htmlFor='location'>Location</label>
            <input
              type='text'
              id='location'
              maxLength={30}
              value={location}
              onChange={handleLocation}
            />
            <label htmlFor='website'>Website</label>
            <input
              type='url'
              id='website'
              maxLength={100}
              value={website}
              onChange={handleWebsite}
            />
          </section>
        </form>
      </div>
      <div id='popup-background' onClick={toggleEditProfilePopup} aria-hidden />
    </>
  );
};

export default EditProfilePopup;
