import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import getProfilePicUrl from '../utils/getProfilePicUrl';

const ChangeProfileIcon = () => {
  const [photoURL, setPhotoURL] = useState(getProfilePicUrl());
  const [selectedImage, setSelectedImage] = useState<Blob | MediaSource | null>(
    null
  );

  const resetImg = () => {
    setPhotoURL(getProfilePicUrl());
    setSelectedImage(null);
  };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files[0]);
    setSelectedImage(e.target.files[0]);
    setPhotoURL(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <div className='img-container large-icon'>
        <img alt='not found' width='100px' src={photoURL} />
      </div>
      <button type='button' onClick={resetImg}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <input
        type='file'
        name='photoURL'
        id='photoURL'
        onChange={handleImg}
        accept='image/jpeg,image/png,image/webp'
      />
    </div>
  );
};

export default ChangeProfileIcon;
