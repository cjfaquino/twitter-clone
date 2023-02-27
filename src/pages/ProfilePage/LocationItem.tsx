import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const LocationItem = ({ location }: { location: string | undefined }) =>
  location ? (
    <span className='location-item'>
      <FontAwesomeIcon icon={faLocationDot} />
      <span className='location grey'>{location}</span>
    </span>
  ) : null;

export default LocationItem;
