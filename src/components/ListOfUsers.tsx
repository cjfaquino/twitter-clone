import React from 'react';
import ProfileSmall from './ProfileSmall';
import ProfileMedium from './ProfileMedium';
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

const ListOfUsers = ({
  users,
  compact,
  missingText,
}: IProps & typeof defaultProps) => {
  const empty = useDelay(500, users.length === 0, users);

  return (
    <div className='list'>
      {empty && <div className='missing'>{missingText}</div>}
      {compact
        ? !empty &&
          users.map((usr) => (
            <ProfileSmall key={`profile-small-${usr.id}`} userProfile={usr} />
          ))
        : !empty &&
          users.map((usr) => (
            <ProfileMedium key={`profile-medium-${usr.id}`} userProfile={usr} />
          ))}
    </div>
  );
};

ListOfUsers.defaultProps = defaultProps;

export default ListOfUsers;
