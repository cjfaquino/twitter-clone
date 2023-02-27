import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const JoinedDateItem = ({ createdAt }: { createdAt: string | undefined }) => {
  const formatJoinedDate = () => {
    const joinedDate = new Date(Number(createdAt));

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
    };

    return joinedDate.toLocaleDateString('en-us', options);
  };

  return createdAt ? (
    <span>
      <FontAwesomeIcon icon={faCalendarDays} />
      <span className='joined grey'>Joined {formatJoinedDate()}</span>
    </span>
  ) : null;
};

export default JoinedDateItem;
