import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const WebsiteItem = ({ link }: { link: string | undefined }) =>
  link ? (
    <span className='website-item'>
      <FontAwesomeIcon icon={faLink} />
      <span className='website'>
        <a target='_blank' rel='noreferrer' href={link}>
          {link.replace(/^https?:\/\/(www\.)?/, '')}
        </a>
      </span>
    </span>
  ) : null;

export default WebsiteItem;
