import { faClose, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import useInput from '../hooks/useInput';
import { UserProfile } from '../interfaces/UserProfile';
import updateProfile from '../utils/updateProfile';
import ChangeProfileIcon from './ChangeProfileIcon';

interface IProps {
  userProfile: UserProfile;
  toggleEditProfilePopup: React.MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  >;
}

const EditProfilePopup = ({ userProfile, toggleEditProfilePopup }: IProps) => {
  const [displayName, handleDisplayName] = useInput(userProfile.displayName!);
  const [bio, handleBio] = useInput(userProfile.bio || '');
  const [website, handleWebsite] = useInput(userProfile.website || '');
  const [location, handleLocation] = useInput(userProfile.location || '');
  const [selectedBackdrop, setSelectedBackdrop] = useState<File | null>(null);
  const [backdropURL, setBackdropURL] = useState(userProfile.backdropURL);

  const handleBackdrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBackdrop(e.target.files![0]);
    setBackdropURL(URL.createObjectURL(e.target.files![0]));
  };

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
      <div className='edit-profile'>
        <form onSubmit={handleSubmit}>
          <header className='edit-top'>
            <button
              type='button'
              className='btn-cancel-edit'
              onClick={toggleEditProfilePopup}
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h2>Edit profile</h2>
            <button type='submit'>Save</button>
          </header>

          <div className='edit-images'>
            <div className='edit-backdrop'>
              <img src={backdropURL} alt='backdrop' />
              <label htmlFor='backdropURL' className='img-file-upload'>
                <FontAwesomeIcon icon={faImage} />
                <input
                  onChange={handleBackdrop}
                  type='file'
                  name='backdropURL'
                  id='backdropURL'
                  accept='image/jpeg'
                />
              </label>
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
