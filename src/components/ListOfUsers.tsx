import React from 'react';
import PropTypes from 'prop-types';
import ProfileSmall from './ProfileSmall';
import ProfileMedium from './ProfileMedium';
import { UserProfile } from '../interfaces/UserProfile';

interface IProps {
  users: UserProfile[];
  compact?: boolean;
}

const ListOfUsers = ({ users, compact }: IProps) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {compact
      ? users.map((usr) => (
          <ProfileSmall key={`profile-small-${usr.id}`} userProfile={usr} />
        ))
      : users.map((usr) => (
          <ProfileMedium key={`profile-medium-${usr.id}`} userProfile={usr} />
        ))}
  </>
);

ListOfUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ListOfUsers;
