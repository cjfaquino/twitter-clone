import { faClose, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import getProfilePicUrl from '../utils/getProfilePicUrl';

const ChangeProfileIcon = () => {
  const [photoURL, setPhotoURL] = useState(getProfilePicUrl());
  const [selectedImage, setSelectedImage] = useState<Blob | MediaSource | null>(
    null
  );
  const inputRef = useRef(null);

  const resetImg = () => {
    setPhotoURL(getProfilePicUrl());
    (inputRef.current! as HTMLInputElement).value = '';
    setSelectedImage(null);
  };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(e.target.files![0]);
    setPhotoURL(URL.createObjectURL(e.target.files![0]));
  };

  return (
    <div className='change-profile-icon'>
      <div className='img-container large-icon'>
        <img alt='not found' width='100px' src={photoURL} />
      </div>
      {selectedImage && (
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
          accept='image/jpeg, image/png'
        />
      </label>
    </div>
  );
};

export default ChangeProfileIcon;
