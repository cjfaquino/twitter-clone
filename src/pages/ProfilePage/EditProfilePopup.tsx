import { faClose, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import useInput from '../../hooks/useInput';
import { UserProfile } from '../../interfaces/UserProfile';
import getProfilePicUrl from '../../utils/user/getProfilePicUrl';
import updateProfile from '../../utils/user/updateProfile';
import uploadImage from '../../utils/uploadImage';
import ChangeProfileIcon from '../../components/ChangeProfileIcon';
import SubmitButton from '../../components/SubmitButton';
import InputDisplayName from '../../components/InputDisplayName';

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
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [backdropURL, setBackdropURL] = useState(userProfile.backdropURL || '');
  const [photoURL, setPhotoURL] = useState(
    userProfile.photoURL || getProfilePicUrl()
  );
  const [submitting, setSubmitting] = useState(false);

  const handleBackdrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBackdrop(e.target.files![0]);
    setBackdropURL(URL.createObjectURL(e.target.files![0]));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    let newPhotoURL = photoURL;
    let newBackdropURL = backdropURL;

    if (selectedPhoto) {
      newPhotoURL = await uploadImage(
        `users/${userProfile.id}/icon`,
        selectedPhoto
      );
    }
    if (selectedBackdrop) {
      newBackdropURL = await uploadImage(
        `users/${userProfile.id}/backdrop`,
        selectedBackdrop
      );
    }

    const result = await updateProfile({
      userProfile,
      displayName,
      bio,
      website,
      location,
      backdropURL: newBackdropURL,
      photoURL: newPhotoURL,
    });

    if (result) (toggleEditProfilePopup as Function)();
    else {
      // error
    }

    setSubmitting(false);
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
            <SubmitButton submitting={submitting} text='Save' width={100} />
          </header>

          <div className='edit-images'>
            <div className='img-backdrop'>
              <img src={backdropURL} alt='backdrop' className='img-overlay' />
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
            <ChangeProfileIcon
              photoURL={photoURL}
              selectedPhoto={selectedPhoto}
              setPhotoURL={setPhotoURL}
              setSelectedPhoto={setSelectedPhoto}
            />
          </div>

          <section className='edit-bottom'>
            <InputDisplayName
              displayName={displayName}
              handleDisplayName={handleDisplayName}
            />
            <label htmlFor='bio'>
              Bio
              <textarea
                id='bio'
                maxLength={160}
                value={bio}
                onChange={handleBio}
              />
            </label>
            <label htmlFor='location'>
              Location
              <input
                type='text'
                id='location'
                maxLength={30}
                value={location}
                onChange={handleLocation}
              />
            </label>
            <label htmlFor='website'>
              Website
              <input
                type='url'
                id='website'
                maxLength={100}
                value={website}
                onChange={handleWebsite}
              />
            </label>
          </section>
        </form>
      </div>
      <div id='popup-background' onClick={toggleEditProfilePopup} aria-hidden />
    </>
  );
};

export default EditProfilePopup;
