import React from 'react';
import ProfileCard from './ProfileCard';
import { UserProfile } from '../interfaces/UserProfile';
import useDelay from '../hooks/useDelay';

interface IProps {
  users: UserProfile[];
  compact?: boolean;
  missingText?: string;
}

const defaultProps = {
  compact: false,
  missingText: "There's no users here",
};

const ListOfUsers = ({ users, compact, missingText }: IProps) => {
  const empty = useDelay(500, users.length === 0, users);

  return (
    <div className='list'>
      {empty ? (
        <div className='missing'>{missingText}</div>
      ) : (
        users.map((usr) => (
          <ProfileCard
            key={`profile-medium-${usr.id}`}
            userProfile={usr}
            noBio={compact}
          />
        ))
      )}
    </div>
  );
};

ListOfUsers.defaultProps = defaultProps;

export default ListOfUsers;
