import { faClose, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import getProfilePicUrl from '../utils/user/getProfilePicUrl';

interface IProps {
  photoURL: string;
  selectedPhoto: File | null;
  setPhotoURL: React.Dispatch<React.SetStateAction<string>>;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<File | null>>;
}

const ChangeProfileIcon = ({
  photoURL,
  selectedPhoto,
  setPhotoURL,
  setSelectedPhoto,
}: IProps) => {
  const inputRef = useRef(null);

  const resetImg = () => {
    setPhotoURL(getProfilePicUrl());
    (inputRef.current! as HTMLInputElement).value = '';
    setSelectedPhoto(null);
  };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPhoto(e.target.files![0]);
    setPhotoURL(URL.createObjectURL(e.target.files![0]));
  };

  return (
    <div className='change-profile-icon'>
      <div className='img-container large-icon'>
        <img alt='profile icon' src={photoURL} className='img-overlay' />
      </div>
      {selectedPhoto && (
        <button type='button' className='btn-cancel-img' onClick={resetImg}>
          <FontAwesomeIcon icon={faClose} />
        </button>
      )}

      <label htmlFor='photoURL' className='img-file-upload' title='Add photo'>
        <FontAwesomeIcon icon={faImage} />
        <input
          ref={inputRef}
          type='file'
          name='photoURL'
          id='photoURL'
          onChange={handleImg}
          accept='image/jpeg'
        />
      </label>
    </div>
  );
};

export default ChangeProfileIcon;
